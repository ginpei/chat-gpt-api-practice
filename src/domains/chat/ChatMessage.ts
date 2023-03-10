import { generateRandomId } from "../id/id";

export interface ChatMessage {
  body: string;
  date: number;
  id: string;
  name: "you" | "ai" | "";
  type: "chat" | "image" | "";
}

export function createChatMessage(init: Partial<ChatMessage>): ChatMessage {
  return {
    body: init?.body ?? "",
    date: init?.date ?? NaN,
    id: init?.id ?? "",
    name: init?.name ?? "",
    type: init?.type ?? "",
  };
}

export function buildChatMessage(
  init: Omit<ChatMessage, "id" | "date">
): ChatMessage {
  return {
    body: init.body,
    id: generateRandomId(),
    date: Date.now(),
    name: init.name,
    type: init.type,
  };
}
