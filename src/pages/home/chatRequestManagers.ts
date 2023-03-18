import { useCallback } from "react";
import { useUserAssetsContext } from "../../domains/chat/UserAssetsContext";
import { saveUserAssets } from "../../domains/chat/userAssetsStore";
import { buildChatMessage } from "../../domains/chat/ChatMessage";
import { buildPromptText } from "../../domains/chat/chatMessageManipulators";
import {
  sendChatRequest,
  sendImageRequest,
} from "../../domains/openai/chatRequestManipulators";
import { useUserSettings } from "../../domains/userSettings/UserSettingsContext";
import { UserAssets } from "../../domains/chat/UserAssets";

/**
 * Be aware this also updates data contained in the context and the storage
 * besides sending the request, which means this is not "pure" functionality.
 */
export function useSubmitChatMessage(): (messageBody: string) => Promise<void> {
  const [userSettings] = useUserSettings();
  const [userAssets, setUserAssets] = useUserAssetsContext();

  return useCallback(
    async (messageBody) => {
      const userMessage = buildChatMessage({
        body: messageBody,
        name: "you",
        type: "chat",
      });
      const messageWithUserUpdate = [...userAssets.messages, userMessage];
      setUserAssets({ ...userAssets, messages: messageWithUserUpdate });

      const prompt = buildPromptText(messageWithUserUpdate) + "\nAI:";

      const result = await sendChatRequest({
        apiKey: userSettings.apiKey,
        prompt,
      });

      // TODO
      console.log("# result", result);

      const aiMessage = buildChatMessage({
        body: result.data.choices[0].text?.trim() ?? "?",
        name: "ai",
        type: "chat",
      });
      setUserAssets((prevHistory) => {
        const assets: UserAssets = {
          ...prevHistory,
          messages: [...prevHistory.messages, aiMessage],
          completionTokenUsage: result.data.usage?.total_tokens ?? NaN,
        };
        saveUserAssets(assets);
        return assets;
      });
    },
    [userSettings.apiKey, userAssets, setUserAssets]
  );
}

export function useSubmitImageRequest(): (
  messageBody: string
) => Promise<void> {
  const [userSettings] = useUserSettings();
  const [userAssets, setUserAssets] = useUserAssetsContext();

  return useCallback(
    async (messageBody) => {
      const userMessage = buildChatMessage({
        body: messageBody,
        name: "you",
        type: "image",
      });
      const messageWithUserUpdate = [...userAssets.messages, userMessage];
      setUserAssets({ ...userAssets, messages: messageWithUserUpdate });

      const result = await sendImageRequest({
        apiKey: userSettings.apiKey,
        prompt: messageBody,
      });

      // TODO
      console.log("# result", result);

      const aiMessage = buildChatMessage({
        body: result.data.data[0].url ?? "",
        name: "ai",
        type: "image",
      });
      setUserAssets((prevHistory) => {
        const assets: UserAssets = {
          ...prevHistory,
          messages: [...prevHistory.messages, aiMessage],
        };
        saveUserAssets(assets);
        return assets;
      });
    },
    [userSettings.apiKey, userAssets, setUserAssets]
  );
}
