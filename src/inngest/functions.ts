import { inngest } from "./client";
import { openai, gemini, createAgent, createNetwork, createState, Message, createTool, Tool } from "@inngest/agent-kit";
import { lastAgentMessageContent } from "./utils";
import Sandbox from "@e2b/code-interpreter";
import { getSandbox, SANDBOX_TIMEOUT } from "@/utils/e2b";
import { prisma } from "@/lib/db";
import z from "zod";
import { PROMPT } from "./prompt";

interface AgentState {
    summary: string;
    files: { [path: string]: string };
}

export const agentFunction = inngest.createFunction(
    { id: "ai-agent" },
    { event: "dev/ai.agent" },
    async ({ event, step }) => {
        // Create E2B Sandbox
        const sandboxId = await step.run("get-sandbox-id", async () => {
            const sandbox = await Sandbox.create("nextjs-app-test");
            await sandbox.setTimeout(SANDBOX_TIMEOUT);
            return sandbox.sandboxId;
        });

        // Get message history
        const history = await step.run("get-history", async () => {
            const array: Message[] = [];

            const messages = await prisma.message.findMany({
                where: {
                    projectId: event.data.projectId
                },
                orderBy: {
                    createdAt: "asc",
                },
            });

            for (const message of messages) {
                array.push({
                    type: "text",
                    role: message.role === "AGENT" ? "assistant" : "user",
                    content: message.content,
                });
            }

            return array;
        });

        // Create agent state
        const state = createState<AgentState>({
            summary: "",
            files: {},
        }, {
            messages: history,
        });

        // Create agent
        const agent = createAgent<AgentState>({
            name: "agent",
            description: "A senior coding agent.",
            system: PROMPT,
            model: openai({
                model: "gpt-4.1",
                defaultParameters: {
                    temperature: 0.1,
                }
            }),
            tools: [
                createTool({
                    name: "terminal",
                    description: "Use the terminal to run commands.",
                    parameters: z.object({
                        command: z.string(),
                    }),
                    handler: async ({ command }, { step }) => {
                        return await step?.run("terminal", async () => {
                            const buffers = { stdout: "", stderr: "" };

                            try {
                                const sandbox = await getSandbox(sandboxId);
                                const result = await sandbox.commands.run(command, {
                                    onStdout: (data: string) => {
                                        buffers.stdout += data;
                                    },
                                    onStderr(data: string) {
                                        buffers.stderr += data;
                                    },
                                });

                                return result.stdout;
                            } catch (err) {
                                console.error(
                                    `Error: ${err}`
                                );
                                return `Error: ${err}`;
                            }
                        });
                    },
                }),
                createTool({
                    name: "createOrUpdateFiles",
                    description: "Create or update files in the sandbox.",
                    parameters: z.object({
                        files: z.array(
                            z.object({
                                path: z.string(),
                                content: z.string(),
                            }),
                        ),
                    }),
                    handler: async ({ files }, { step, network }: Tool.Options<AgentState>) => {
                        const newFiles = await step?.run("createOrUpdateFiles", async () => {
                            try {
                                const updated = network.state.data.files || {};
                                const sandbox = await getSandbox(sandboxId);

                                for (const file of files) {
                                    await sandbox.files.write(file.path, file.content);
                                    updated[file.path] = file.content;
                                }

                                return updated;
                            } catch (err) {
                                return `Error: ${err}`;
                            }
                        });

                        if (typeof newFiles === "object") {
                            network.state.data.files = newFiles;
                        }
                    },
                }),
                createTool({
                    name: "readFiles",
                    description: "Read files in the sandbox.",
                    parameters: z.object({
                        files: z.array(z.string()),
                    }),
                    handler: async ({ files }, { step }) => {
                        return await step?.run("readFiles", async () => {
                            try {
                                const sandbox = await getSandbox(sandboxId);
                                const contents = [];
                                for (const file of files) {
                                    const content = await sandbox.files.read(file);
                                    contents.push({ path: file, content });
                                }
                                return JSON.stringify(contents);
                            } catch (err) {
                                return `Error: ${err}`;
                            }
                        });
                    },
                }),
            ],
            lifecycle: {
                onResponse: async ({ result, network }) => {
                    const lastAgentMessage = lastAgentMessageContent(result);

                    if (lastAgentMessage && network) {
                        if (lastAgentMessage.includes("<END_BACKGROUND_TASK>")) {
                            network.state.data.summary = lastAgentMessage;
                        }
                    }

                    return result;
                },
            },
        });

        // Create agent network
        const network = createNetwork<AgentState>({
            name: "agent-network",
            agents: [agent],
            defaultState: state,
            maxIter: 15,
            router: async ({ network }) => {
                const summary = network.state.data.summary;

                if (summary) {
                    return;
                }

                return agent;
            }
        });

        // Run agent network
        const result = await network.run(event.data.value);

        // Generate short summary
        const responseGenerator = createAgent({
            name: "response-generator",
            description: "A response generator.",
            system: `Write a short description in a couple of sentences and return the text. Ignore the <END_BACKGROUND_TASK> wrappers.`,
            model: gemini({model: "gemini-2.0-flash"}),
        });

        const { output: response } = await responseGenerator.run(result.state.data.summary);

        const generateResponse = () => {
            const output = response[0];

            if (output.type !== "text") {
                return "Here you go!";
            }

            return output.content;
        }

        const error =
            !result.state.data.summary ||
            Object.keys(result.state.data.files || {}).length === 0

        if (error) {
            console.log(result.state.data.summary);
        }

        // Get E2B Sandbox URL
        const sandboxUrl = await step.run("get-sandbox-url", async () => {
            const sandbox = await getSandbox(sandboxId);
            const host = sandbox.getHost(3000);
            return `https://${host}`;
        });

        await step.run('save-project', async () => {
            if (error) {
                return await prisma.message.create({
                    data: {
                        content: "Something went wrong. Please try again.",
                        role: "AGENT",
                        type: "ERROR",
                        projectId: event.data.projectId,
                    },
                });
            }

            return await prisma.message.create({
                data: {
                    content: generateResponse(),
                    role: "AGENT",
                    type: "RESULT",
                    projectId: event.data.projectId,
                    sandbox: {
                        create: {
                            sandboxUrl: sandboxUrl,
                            title: "Sandbox",
                            files: result.state.data.files,
                        }
                    }
                }
            });
        })

        return {
            url: sandboxUrl,
            title: "Sandbox",
            files: result.state.data.files,
            summary: result.state.data.summary,
        };
    },
);