const storeKey = "chat-gpt-api-practice/apiKey";

export function loadChatGptApiKeyKey(): string {
  // SSR
  if (typeof window === "undefined") {
    return "";
  }

  return localStorage.getItem(storeKey) ?? "";
}

export function saveChatGptApiKeyKey(value: string): void {
  localStorage.setItem(storeKey, value);
}
