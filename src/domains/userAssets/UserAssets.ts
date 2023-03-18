import { ChatMessage } from "../chat/ChatMessage";
import { Note } from "../note/Note";

export interface UserAssets {
  messages: ChatMessage[];
  completionTokenUsage: number;
  notes: Note[];
}

export function createUserAssets(init?: Partial<UserAssets>): UserAssets {
  return {
    messages: init?.messages ?? [],
    completionTokenUsage: init?.completionTokenUsage ?? 0,
    notes: init?.notes ?? [],
  };
}
