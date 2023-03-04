import { useState } from "react";
import {
  loadChatGptApiKeyKey,
  saveChatGptApiKeyKey,
} from "./chatGptApiKeyStore";

export function useChatGptApiKey(): [string, (key: string) => void] {
  const [key, setKey] = useState<string>(loadChatGptApiKeyKey());

  function saveKey(key: string): void {
    saveChatGptApiKeyKey(key);
    setKey(key);
  }

  return [key, saveKey];
}
