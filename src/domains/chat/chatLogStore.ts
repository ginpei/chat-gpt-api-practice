import {
  ChatHistoryContextValue,
  createChatHistoryContextValue,
} from "./ChatHistoryContext";
import { ChatMessage } from "./ChatMessage";

const storeKey = "chat-gpt-api-practice/chatHistory";

export function loadHistoryLog(): ChatHistoryContextValue {
  // SSR
  if (typeof window === "undefined") {
    return createChatHistoryContextValue();
  }

  const json = localStorage.getItem(storeKey);
  const raw = json ? JSON.parse(json) : {};
  return createChatHistoryContextValue(raw);
}

export function saveHistoryLog(value: ChatHistoryContextValue): void {
  localStorage.setItem(storeKey, JSON.stringify(value));
}
