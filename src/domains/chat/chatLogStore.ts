import {
  UserAssetContextValue,
  createUserAssetContextValue,
} from "./UserAssetContext";
import { ChatMessage } from "./ChatMessage";

const storeKey = "chat-gpt-api-practice/chatHistory";

export function loadHistoryLog(): UserAssetContextValue {
  // SSR
  if (typeof window === "undefined") {
    return createUserAssetContextValue();
  }

  const json = localStorage.getItem(storeKey);
  const raw = json ? JSON.parse(json) : {};
  return createUserAssetContextValue(raw);
}

export function saveHistoryLog(value: UserAssetContextValue): void {
  localStorage.setItem(storeKey, JSON.stringify(value));
}
