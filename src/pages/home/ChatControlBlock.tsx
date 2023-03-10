import { useState } from "react";
import { useChatHistoryContext } from "../../domains/chat/ChatHistoryContext";
import { saveChatLog } from "../../domains/chat/chatLogStore";
import { buildChatMessage } from "../../domains/chat/ChatMessage";
import { buildPrompt } from "../../domains/chat/chatMessageManipulators";
import { useError } from "../../domains/error/errorHooks";
import { toError } from "../../domains/error/errorManipulators";
import { VStack } from "../../domains/layout/VStack";
import { useChatGptApiContext } from "../../domains/openai/chatGptApiContext";
import { sendChatRequest } from "../../domains/openai/chatRequestManipulators";
import { ChatForm } from "./ChatForm";
import { ToolsDialog } from "./ToolsDialog";

export interface ChatControlBlockProps {}

export function ChatControlBlock({}: ChatControlBlockProps): JSX.Element {
  const [apiContext] = useChatGptApiContext();
  const [history, setHistory] = useChatHistoryContext();
  const [sendError, setSendError] = useError();
  const [requestMessage, setRequestMessage] = useState(
    history.messages.length > 0 ? "" : "Say something funny"
  );
  const [processingChat, setProcessingChat] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const onSubmit = async () => {
    setProcessingChat(true);
    setSendError(null);
    try {
      const userMessage = buildChatMessage({
        body: requestMessage,
        name: "you",
      });
      const messageWithUserUpdate = [...history.messages, userMessage];
      setHistory({ ...history, messages: messageWithUserUpdate });

      const prompt = buildPrompt(messageWithUserUpdate);

      const result = await sendChatRequest({
        apiKey: apiContext.apiKey,
        prompt,
      });

      // TODO
      console.log("# result", result);

      const aiMessage = buildChatMessage({
        body: result.data.choices[0].text?.trim() ?? "?",
        name: "ai",
      });
      setHistory((prevHistory) => {
        const newMessages = [...prevHistory.messages, aiMessage];
        saveChatLog(newMessages);
        return { ...prevHistory, messages: newMessages };
      });
      setRequestMessage("");
    } catch (error) {
      console.error(error);
      setSendError(toError(error));
    } finally {
      setProcessingChat(false);
    }
  };

  const onToolsClick = () => {
    setSettingsOpen(true);
  };

  const onSettingsDialogClose = () => {
    setSettingsOpen(false);
  };

  return (
    <div className="ChatControlBlock bg-gray-100 p-4">
      <VStack gap="gap-2">
        {!apiContext.apiKey && <p className="text-red-700">Set API key</p>}
        {sendError && <p className="text-red-700">{sendError.message}</p>}
        <ChatForm
          disabled={processingChat}
          input={requestMessage}
          onInputChange={setRequestMessage}
          onSubmit={onSubmit}
          onToolsClick={onToolsClick}
        />
      </VStack>
      <ToolsDialog onClose={onSettingsDialogClose} open={settingsOpen} />
    </div>
  );
}
