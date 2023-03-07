import { useState } from "react";
import { NiceButton } from "../../domains/button/NiceButton";
import {
  buildChatMessage,
  ChatMessage,
  createChatMessage,
} from "../../domains/chat/ChatMessage";
import { useChatGptApiKey } from "../../domains/openai/chatGptApiKeyHooks";
import { useError } from "../../domains/error/errorHooks";
import { toError } from "../../domains/error/errorManipulators";
import { generateRandomId } from "../../domains/id/id";
import { VStack } from "../../domains/layout/VStack";
import { sendChatRequest } from "../../domains/openai/chatRequestManipulators";
import { ChatItem } from "./ChatItem";

export interface ChatSectionProps {}

export function ChatSection(): JSX.Element {
  const apiKey = useChatGptApiKey();
  const [sendError, setSendError] = useError();
  const [requestMessage, setRequestMessage] = useState("Say something funny");
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);

  const onSendClick = async () => {
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
      setChatLog((v) => [...v, aiMessage]);
    } catch (error) {
      console.error(error);
      setSendError(toError(error));
    }
  };

  return (
    <div className="ChatSection">
      <h1>ChatSection</h1>
      {sendError && <p className="text-red-700">{sendError.message}</p>}
      <p>
        <input
          className="border"
          onChange={(v) => setRequestMessage(v.currentTarget.value)}
          type="text"
          value={requestMessage}
        />
        <NiceButton onClick={onSendClick}>Send</NiceButton>
      </p>
      <VStack>
        {chatLog.map((message) => (
          <ChatItem key={message.id} message={message} />
        ))}
      </VStack>
    </div>
  );
}
