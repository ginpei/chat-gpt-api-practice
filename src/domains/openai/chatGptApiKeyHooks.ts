import { useState } from "react";
import {
  loadChatGptApiKeyKey,
  saveChatGptApiKeyKey,
} from "./chatGptApiKeyStore";

export function useChatGptApiKeyState(): [string, (key: string) => void] {
  // TODO replace with context
  const [key, setKey] = useState<string>(loadChatGptApiKeyKey());

  function saveKey(key: string): void {
    saveChatGptApiKeyKey(key);
    setKey(key);
  }

  return [key, saveKey];
}

export function useChatGptApiKey(): string {
  const [apiKey] = useChatGptApiKeyState();
  return apiKey;
}
