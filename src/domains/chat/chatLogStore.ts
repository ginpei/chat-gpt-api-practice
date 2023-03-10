import { ChatMessage } from "./ChatMessage";

const storeKey = "chat-gpt-api-practice/chatLog";

export function loadChatLog(): ChatMessage[] {
  // SSR
  if (typeof window === "undefined") {
    return [];
  }

  const json = localStorage.getItem(storeKey);
  return json ? JSON.parse(json) : [];
}

export function saveChatLog(value: ChatMessage[]): void {
  localStorage.setItem(storeKey, JSON.stringify(value));
}
