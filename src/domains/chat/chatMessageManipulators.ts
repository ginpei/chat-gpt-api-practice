import { ChatMessage } from "./ChatMessage";

export function buildPrompt(messageWithUserUpdate: ChatMessage[]): string {
  return (
    messageWithUserUpdate
      .map((message) => {
        if (message.name === "ai") {
          return `AI: ${message.body}`;
        }
        if (message.name === "you") {
          return `Human: ${message.body}`;
        }
        return "";
      })
      .join("\n") + "\nAI:"
  );
}
