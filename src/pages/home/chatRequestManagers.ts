import { useCallback } from "react";
import {
  ChatHistoryContextValue,
  useChatHistoryContext,
} from "../../domains/chat/ChatHistoryContext";
import { saveHistoryLog } from "../../domains/chat/chatLogStore";
import { buildChatMessage } from "../../domains/chat/ChatMessage";
import { buildPromptText } from "../../domains/chat/chatMessageManipulators";
import { useChatGptApiContext } from "../../domains/openai/chatGptApiContext";
import {
  sendChatRequest,
  sendImageRequest,
} from "../../domains/openai/chatRequestManipulators";

/**
 * Be aware this also updates data contained in the context and the storage
 * besides sending the request, which means this is not "pure" functionality.
 */
export function useSubmitChatMessage(): (messageBody: string) => Promise<void> {
  const [apiContext] = useChatGptApiContext();
  const [history, setHistory] = useChatHistoryContext();

  return useCallback(
    async (messageBody) => {
      const userMessage = buildChatMessage({
        body: messageBody,
        name: "you",
        type: "chat",
      });
      const messageWithUserUpdate = [...history.messages, userMessage];
      setHistory({ ...history, messages: messageWithUserUpdate });

      const prompt = buildPromptText(messageWithUserUpdate) + "\nAI:";

      const result = await sendChatRequest({
        apiKey: apiContext.apiKey,
        prompt,
      });

      // TODO
      console.log("# result", result);

      const aiMessage = buildChatMessage({
        body: result.data.choices[0].text?.trim() ?? "?",
        name: "ai",
        type: "chat",
      });
      setHistory((prevHistory) => {
        const newHistory: ChatHistoryContextValue = {
          ...prevHistory,
          messages: [...prevHistory.messages, aiMessage],
          completionTokenUsage: result.data.usage?.total_tokens ?? NaN,
        };
        saveHistoryLog(newHistory);
        return newHistory;
      });
    },
    [apiContext.apiKey, history, setHistory]
  );
}

export function useSubmitImageRequest(): (
  messageBody: string
) => Promise<void> {
  const [apiContext] = useChatGptApiContext();
  const [history, setHistory] = useChatHistoryContext();

  return useCallback(
    async (messageBody) => {
      const userMessage = buildChatMessage({
        body: messageBody,
        name: "you",
        type: "image",
      });
      const messageWithUserUpdate = [...history.messages, userMessage];
      setHistory({ ...history, messages: messageWithUserUpdate });

      const result = await sendImageRequest({
        apiKey: apiContext.apiKey,
        prompt: messageBody,
      });

      // TODO
      console.log("# result", result);

      const aiMessage = buildChatMessage({
        body: result.data.data[0].url ?? "",
        name: "ai",
        type: "image",
      });
      setHistory((prevHistory) => {
        const newHistory: ChatHistoryContextValue = {
          ...prevHistory,
          messages: [...prevHistory.messages, aiMessage],
        };
        saveHistoryLog(newHistory);
        return newHistory;
      });
    },
    [apiContext.apiKey, history, setHistory]
  );
}
