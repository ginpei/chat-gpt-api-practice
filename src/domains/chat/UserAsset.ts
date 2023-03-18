import { ChatMessage } from "./ChatMessage";

export interface UserAsset {
  messages: ChatMessage[];
  completionTokenUsage: number;
}

export function createUserAsset(init?: Partial<UserAsset>): UserAsset {
  return {
    messages: init?.messages ?? [],
    completionTokenUsage: init?.completionTokenUsage ?? 0,
  };
}
