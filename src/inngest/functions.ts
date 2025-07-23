import { inngest } from "./client";
import { openai, createAgent, createNetwork } from "@inngest/agent-kit";
import { lastAgentMessageContent } from "./utils";
import Sandbox from "@e2b/code-interpreter";
import { getSandbox, SANDBOX_TIMEOUT } from "@/utils/e2b";

interface AgentState {
    summary: string;
    files: { [path: string]: string };
}

export const agentFunction = inngest.createFunction(
    { id: "ai-agent" },
    { event: "test/ai.agent" },
    async ({ event, step }) => {
        // Create E2B Sandbox
        const sandboxId = await step.run("get-sandbox-id", async () => {
            const sandbox = await Sandbox.create("nextjs-app-test");
            await sandbox.setTimeout(SANDBOX_TIMEOUT);
            return sandbox.sandboxId;
        });

        // Create agent
        const agent = createAgent<AgentState>({
            name: "agent",
            description: "A senior coding agent.",
            system: "Print out !!END_BACKGROUND_JOB!! and nothing else.",
            model: openai({
                model: "gpt-4.1",
                defaultParameters: {
                    temperature: 0.1,
                }
            }),
            tools: [],
            lifecycle: {
                onResponse: async ({ result, network }) => {
                    const lastAgentMessage = lastAgentMessageContent(result);

                    if (lastAgentMessage && network) {
                        if (lastAgentMessage.includes("!!END_BACKGROUND_JOB!!")) {
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

        const error =
            !result.state.data.summary ||
            Object.keys(result.state.data.files || {}).length === 0

        if (error) {
            console.log(error);
        }

        // Get E2B Sandbox URL
        const sandboxUrl = await step.run("get-sandbox-url", async () => {
            const sandbox = await getSandbox(sandboxId);
            const host = sandbox.getHost(3000);
            return `https://${host}`;
        });

        return {
            url: sandboxUrl,
            title: "Sandbox",
            files: result.state.data.files,
            summary: result.state.data.summary,
        };
    },
);