import { useCallback } from "react";
import {
  UserAssetContextValue,
  useUserAssetContext,
} from "../../domains/chat/UserAssetContext";
import { saveHistoryLog } from "../../domains/chat/chatLogStore";
import { buildChatMessage } from "../../domains/chat/ChatMessage";
import { buildPromptText } from "../../domains/chat/chatMessageManipulators";
import {
  sendChatRequest,
  sendImageRequest,
} from "../../domains/openai/chatRequestManipulators";
import { useUserSettings } from "../../domains/userSettings/UserSettingsContext";

/**
 * Be aware this also updates data contained in the context and the storage
 * besides sending the request, which means this is not "pure" functionality.
 */
export function useSubmitChatMessage(): (messageBody: string) => Promise<void> {
  const [userSettings] = useUserSettings();
  const [userAsset, setUserAsset] = useUserAssetContext();

  return useCallback(
    async (messageBody) => {
      const userMessage = buildChatMessage({
        body: messageBody,
        name: "you",
        type: "chat",
      });
      const messageWithUserUpdate = [...userAsset.messages, userMessage];
      setUserAsset({ ...userAsset, messages: messageWithUserUpdate });

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
      setUserAsset((prevHistory) => {
        const newHistory: UserAssetContextValue = {
          ...prevHistory,
          messages: [...prevHistory.messages, aiMessage],
          completionTokenUsage: result.data.usage?.total_tokens ?? NaN,
        };
        saveHistoryLog(newHistory);
        return newHistory;
      });
    },
    [userSettings.apiKey, userAsset, setUserAsset]
  );
}

export function useSubmitImageRequest(): (
  messageBody: string
) => Promise<void> {
  const [userSettings] = useUserSettings();
  const [userAsset, setUserAsset] = useUserAssetContext();

  return useCallback(
    async (messageBody) => {
      const userMessage = buildChatMessage({
        body: messageBody,
        name: "you",
        type: "image",
      });
      const messageWithUserUpdate = [...userAsset.messages, userMessage];
      setUserAsset({ ...userAsset, messages: messageWithUserUpdate });

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
      setUserAsset((prevHistory) => {
        const newHistory: UserAssetContextValue = {
          ...prevHistory,
          messages: [...prevHistory.messages, aiMessage],
        };
        saveHistoryLog(newHistory);
        return newHistory;
      });
    },
    [userSettings.apiKey, userAsset, setUserAsset]
  );
}
