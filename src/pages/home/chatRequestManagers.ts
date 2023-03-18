import { useCallback } from "react";
import { buildChatMessage } from "../../domains/chat/ChatMessage";
import { buildPromptText } from "../../domains/chat/chatMessageManipulators";
import {
  sendChatRequest,
  sendImageRequest,
} from "../../domains/openai/chatRequestManipulators";
import { UserAssets } from "../../domains/userAssets/UserAssets";
import {
  UserAssetsContextValueSetter,
  useUserAssetsContext,
} from "../../domains/userAssets/UserAssetsContext";
import { saveUserAssets } from "../../domains/userAssets/userAssetsStore";
import { useUserSettings } from "../../domains/userSettings/UserSettingsContext";

export const ContinueChatMessage = Symbol("continueChatMessage");

/**
 * Be aware this also updates data contained in the context and the storage
 * besides sending the request, which means this is not "pure" functionality.
 */
export function useSubmitChatMessage(): (
  messageBody: string | typeof ContinueChatMessage
) => Promise<void> {
  const [userSettings] = useUserSettings();
  const [userAssets, setUserAssets] = useUserAssetsContext();

  return useCallback(
    async (messageBody) => {
      const prompt = getPrompt(messageBody, userAssets, setUserAssets);

      const result = await sendChatRequest({
        apiKey: userSettings.apiKey,
        prompt,
      });

      // TODO
      console.log("# result", result);

      const choice = result.data.choices[0];
      const aiMessage = buildChatMessage({
        body: choice.text?.trim() ?? "?",
        complete: choice.finish_reason === "stop",
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

function getPrompt(
  messageBody: string | typeof ContinueChatMessage,
  userAssets: UserAssets,
  setUserAssets: UserAssetsContextValueSetter
) {
  if (messageBody === ContinueChatMessage) {
    return buildPromptText(userAssets.messages);
  }

  const userMessage = buildChatMessage({
    body: messageBody,
    complete: true,
    name: "you",
    type: "chat",
  });
  const messageWithUserUpdate = [...userAssets.messages, userMessage];
  setUserAssets({ ...userAssets, messages: messageWithUserUpdate });

  return buildPromptText(messageWithUserUpdate) + "\nAI:";
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
        complete: true,
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
        complete: true,
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
