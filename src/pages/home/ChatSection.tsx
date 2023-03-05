import { NiceButton } from "../../domains/button/NiceButton";
import { useChatGptApiKey } from "../../domains/chatGptApiKey/chatGptApiKeyHooks";
import { useError } from "../../domains/error/errorHooks";
import { toError } from "../../domains/error/errorManipulators";
import { sendChatRequest } from "../../domains/openai/chatRequestManipulators";

export interface ChatSectionProps {}

export function ChatSection(): JSX.Element {
  const apiKey = useChatGptApiKey();
  const [sendError, setSendError] = useError();

  const prompt = "Say something funny";

  const onSendClick = async () => {
    setSendError(null);
    try {
      await sendChatRequest({ apiKey, prompt });
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
        <NiceButton onClick={onSendClick}>Send</NiceButton>
      </p>
    </div>
  );
}
