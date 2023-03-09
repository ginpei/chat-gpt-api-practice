import { useState } from "react";
import { NiceButton } from "../../domains/button/NiceButton";
import { loadChatLog, saveChatLog } from "../../domains/chat/chatLogStore";
import { buildChatMessage } from "../../domains/chat/ChatMessage";
import { useError } from "../../domains/error/errorHooks";
import { toError } from "../../domains/error/errorManipulators";
import { VStack } from "../../domains/layout/VStack";
import { useChatGptApiContext } from "../../domains/openai/chatGptApiContext";
import { sendChatRequest } from "../../domains/openai/chatRequestManipulators";
import { ChatForm } from "./ChatForm";
import { ChatGptApiKeyForm } from "./ChatGptApiKeyForm";
import { ChatItem } from "./ChatItem";

export interface ChatSectionProps {}

export function ChatSection(): JSX.Element {
  const [apiContext] = useChatGptApiContext();
  const [sendError, setSendError] = useError();
  const [requestMessage, setRequestMessage] = useState("Say something funny");
  const [chatLog, setChatLog] = useState(loadChatLog());
  const [processingChat, setProcessingChat] = useState(false);

  const onSubmit = async () => {
    setProcessingChat(true);
    setSendError(null);
    try {
      const userMessage = buildChatMessage({
        body: requestMessage,
        name: "you",
      });
      const messageWithUserUpdate = [...chatLog, userMessage];
      setChatLog(messageWithUserUpdate);

      const prompt = messageWithUserUpdate
        .map((message) => {
          if (message.name === "ai") {
            return `AI: ${message.body}`;
          }
          if (message.name === "you") {
            return `Human: ${message.body}`;
          }
          return "";
        })
        .join("\n");

      const result = await sendChatRequest({
        apiKey: apiContext.apiKey,
        prompt,
      });

      // TODO
      console.log("# result", result);

      const aiMessage = buildChatMessage({
        body: result.response[0].text ?? "?",
        name: "ai",
      });
      setChatLog((v) => {
        const newChatLog = [...v, aiMessage];
        saveChatLog(newChatLog);
        return newChatLog;
      });
      setRequestMessage("");
    } catch (error) {
      console.error(error);
      setSendError(toError(error));
    } finally {
      setProcessingChat(false);
    }
  };

  const onClearHistoryClick = () => {
    const ok = window.confirm("Are you sure you want to remove all chat log?");
    if (!ok) {
      return;
    }
    saveChatLog([]);
    setChatLog([]);
  };

  return (
    <div className="ChatSection">
      {sendError && <p className="text-red-700">{sendError.message}</p>}
      <div className="sticky top-0 bg-gray-100 p-2">
        <VStack gap="gap-2">
          <ChatForm
            disabled={processingChat}
            input={requestMessage}
            onInputChange={setRequestMessage}
            onSubmit={onSubmit}
          />
          <details open={apiContext.apiKey === "" ? true : undefined}>
            <summary>Tools</summary>
            <div className="flex gap-2">
              <ChatGptApiKeyForm />
              <NiceButton onClick={onClearHistoryClick}>
                🗑️ Clear history...
              </NiceButton>
            </div>
          </details>
        </VStack>
      </div>
      <VStack>
        {chatLog.map((message) => (
          <ChatItem key={message.id} message={message} />
        ))}
      </VStack>
      <div aria-hidden className="min-h-[5em]"></div>
    </div>
  );
}
