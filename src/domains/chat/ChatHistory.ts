import { ChatMessage } from "./ChatMessage";

export interface ChatHistory {
  completionTokenUsage: number;
  messages: ChatMessage[];
}

export function createChatHistory(init?: Partial<ChatHistory>): ChatHistory {
  return {
    completionTokenUsage: init?.completionTokenUsage ?? 0,
    messages: init?.messages ?? [],
  };
}
