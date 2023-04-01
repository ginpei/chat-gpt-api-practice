import { generateRandomId } from "../id/id";

export interface ChatMessage {
  body: string;
  complete: boolean;
  date: number;
  id: string;
  name: "you" | "ai" | "";
}

export function createChatMessage(init: Partial<ChatMessage>): ChatMessage {
  return {
    body: init?.body ?? "",
    complete: true,
    date: init?.date ?? NaN,
    id: init?.id ?? "",
    name: init?.name ?? "",
  };
}

export function buildChatMessage(
  init: Omit<ChatMessage, "id" | "date">
): ChatMessage {
  return {
    body: init.body,
    complete: init.complete,
    id: generateRandomId(),
    date: Date.now(),
    name: init.name,
  };
}
