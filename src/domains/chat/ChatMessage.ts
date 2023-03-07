import { generateRandomId } from "../id/id";

export interface ChatMessage {
  body: string;
  id: string;
  date: number;
  name: "you" | "ai" | "";
}

export function createChatMessage(init: Partial<ChatMessage>): ChatMessage {
  return {
    body: init?.body ?? "",
    id: init?.id ?? "",
    date: init?.date ?? NaN,
    name: init?.name ?? "",
  };
}

export function buildChatMessage(
  init: Pick<ChatMessage, "body" | "name">
): ChatMessage {
  return createChatMessage({
    body: init.body,
    id: generateRandomId(),
    date: Date.now(),
    name: init.name,
  });
}
