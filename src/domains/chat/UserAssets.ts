import { ChatMessage } from "./ChatMessage";

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
