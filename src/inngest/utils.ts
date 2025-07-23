import { AgentResult, TextMessage } from "@inngest/agent-kit";

export function lastAgentMessageContent(result: AgentResult) {
    const lastAgentMessageIndex = result.output.findLastIndex(
        (message) => message.role === "assistant",
    );

    const message = result.output[lastAgentMessageIndex] as | TextMessage | undefined;

    if (!message?.content) return undefined;

    if (typeof message.content === "string") {
        return message.content;
    }

    return message.content.map((c) => c.text).join("");
}