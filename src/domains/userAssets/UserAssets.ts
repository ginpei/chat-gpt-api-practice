import { ChatMessage } from "../chat/ChatMessage";

export interface UserAssets {
  messages: ChatMessage[];
  completionTokenUsage: number;
}

export function createUserAssets(init?: Partial<UserAssets>): UserAssets {
  return {
    messages: init?.messages ?? [],
    completionTokenUsage: init?.completionTokenUsage ?? 0,
  };
}
