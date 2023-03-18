import { createUserAssets, UserAssets } from "./UserAssets";

const storeKey = "chat-gpt-api-practice/chatHistory";

export function loadUserAssets(): UserAssets {
  // SSR
  if (typeof window === "undefined") {
    return createUserAssets();
  }

  const json = localStorage.getItem(storeKey);
  const raw = json ? JSON.parse(json) : {};
  return createUserAssets(raw);
}

export function saveUserAssets(value: UserAssets): void {
  localStorage.setItem(storeKey, JSON.stringify(value));
}
