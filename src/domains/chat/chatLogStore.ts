import { createUserAsset, UserAsset } from "./UserAsset";

const storeKey = "chat-gpt-api-practice/chatHistory";

export function loadHistoryLog(): UserAsset {
  // SSR
  if (typeof window === "undefined") {
    return createUserAsset();
  }

  const json = localStorage.getItem(storeKey);
  const raw = json ? JSON.parse(json) : {};
  return createUserAsset(raw);
}

export function saveHistoryLog(value: UserAsset): void {
  localStorage.setItem(storeKey, JSON.stringify(value));
}
