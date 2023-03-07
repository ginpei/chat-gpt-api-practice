import { useState } from "react";
import { NiceButton } from "../../domains/button/NiceButton";
import { loadChatLog, saveChatLog } from "../../domains/chat/chatLogStore";
import { buildChatMessage, ChatMessage } from "../../domains/chat/ChatMessage";
import { useError } from "../../domains/error/errorHooks";
import { toError } from "../../domains/error/errorManipulators";
import { VStack } from "../../domains/layout/VStack";
import { useChatGptApiKey } from "../../domains/openai/chatGptApiKeyHooks";
import { sendChatRequest } from "../../domains/openai/chatRequestManipulators";
import { ChatForm } from "./ChatForm";
import { ChatItem } from "./ChatItem";

export interface ChatSectionProps {}

export function ChatSection(): JSX.Element {
  const apiKey = useChatGptApiKey();
  const [sendError, setSendError] = useError();
  const [requestMessage, setRequestMessage] = useState("Say something funny");
  const [chatLog, setChatLog] = useState(loadChatLog());

  const onSubmit = async () => {
    setSendError(null);
    try {
      const userMessage = buildChatMessage({
        body: requestMessage,
        name: "you",
      });
      setChatLog((v) => [...v, userMessage]);

      const result = await sendChatRequest({ apiKey, prompt: requestMessage });

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
    } catch (error) {
      console.error(error);
      setSendError(toError(error));
    }
  };

  return (
    <div className="ChatSection">
      <h1>ChatSection</h1>
      {sendError && <p className="text-red-700">{sendError.message}</p>}
      <ChatForm
        input={requestMessage}
        onInputChange={setRequestMessage}
        onSubmit={onSubmit}
      />
      <VStack>
        {chatLog.map((message) => (
          <ChatItem key={message.id} message={message} />
        ))}
      </VStack>
    </div>
  );
}
