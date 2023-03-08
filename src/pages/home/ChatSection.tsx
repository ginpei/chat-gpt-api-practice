import { useState } from "react";
import { loadChatLog, saveChatLog } from "../../domains/chat/chatLogStore";
import { buildChatMessage } from "../../domains/chat/ChatMessage";
import { useError } from "../../domains/error/errorHooks";
import { toError } from "../../domains/error/errorManipulators";
import { VStack } from "../../domains/layout/VStack";
import { useChatGptApiContext } from "../../domains/openai/chatGptApiContext";
import { sendChatRequest } from "../../domains/openai/chatRequestManipulators";
import { ChatForm } from "./ChatForm";
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
      setChatLog((v) => [...v, userMessage]);

      const result = await sendChatRequest({
        apiKey: apiContext.apiKey,
        prompt: requestMessage,
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

  return (
    <div className="ChatSection">
      <h1>ChatSection</h1>
      {sendError && <p className="text-red-700">{sendError.message}</p>}
      <div className="sticky top-0">
        <ChatForm
          disabled={processingChat}
          input={requestMessage}
          onInputChange={setRequestMessage}
          onSubmit={onSubmit}
        />
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
