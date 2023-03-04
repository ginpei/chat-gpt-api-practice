const storeKey = "chat-gpt-api-practice/apiKey";

export function loadChatGptApiKeyKey(): string {
  return localStorage.getItem(storeKey) ?? "";
}

export function saveChatGptApiKeyKey(value: string): void {
  localStorage.setItem(storeKey, value);
}
