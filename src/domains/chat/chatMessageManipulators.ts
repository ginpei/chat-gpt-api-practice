import { ChatMessage } from "./ChatMessage";

export function buildPromptText(messages: ChatMessage[]): string {
  return messages
    .map((message) => {
      if (message.name === "ai") {
        return `AI: ${message.body}`;
      }
      if (message.name === "you") {
        return `Human: ${message.body}`;
      }
      return "";
    })
    .join("\n");
}
