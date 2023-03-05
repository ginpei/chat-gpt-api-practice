import { useState } from "react";
import { NiceButton } from "../../domains/button/NiceButton";
import { useChatGptApiKey } from "../../domains/chatGptApiKey/chatGptApiKeyHooks";
import { useError } from "../../domains/error/errorHooks";
import { toError } from "../../domains/error/errorManipulators";
import { sendChatRequest } from "../../domains/openai/chatRequestManipulators";

export interface ChatSectionProps {}

export function ChatSection(): JSX.Element {
  const apiKey = useChatGptApiKey();
  const [sendError, setSendError] = useError();
  const [requestMessage, setRequestMessage] = useState("Say something funny");
  const [responseMessage, setResponseMessage] = useState("");

  const onSendClick = async () => {
    setSendError(null);
    try {
      const result = await sendChatRequest({ apiKey, prompt: requestMessage });
      setResponseMessage(result.message);
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
      <p>{responseMessage}</p>
    </div>
  );
}
