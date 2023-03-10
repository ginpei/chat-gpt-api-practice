import { FormEventHandler, useRef, useState } from "react";
import { NiceButton } from "../../domains/button/NiceButton";
import { PrimaryButton } from "../../domains/button/PrimaryButton";
import { useChatHistoryContext } from "../../domains/chat/ChatHistoryContext";
import { saveChatLog } from "../../domains/chat/chatLogStore";
import { buildChatMessage } from "../../domains/chat/ChatMessage";
import { buildPrompt } from "../../domains/chat/chatMessageManipulators";
import { useError } from "../../domains/error/errorHooks";
import { toError } from "../../domains/error/errorManipulators";
import { NiceText } from "../../domains/input/NiceText";
import { VStack } from "../../domains/layout/VStack";
import { useChatGptApiContext } from "../../domains/openai/chatGptApiContext";
import { sendChatRequest } from "../../domains/openai/chatRequestManipulators";
import { waitUntil } from "../../domains/time/waitFunctions";
import { useOnCtrlEnter } from "./shortcutHooks";
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
  const refText = useRef<HTMLTextAreaElement>(null);

  useOnCtrlEnter(refText.current, () => {
    onSubmit();
  });

  const onFormSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    onSubmit();
  };

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
      waitUntil(() => !refText.current?.disabled).then(() =>
        refText.current?.focus()
      );
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
        <form className="ChatForm flex flex-col gap-1" onSubmit={onFormSubmit}>
          <NiceText
            className="flex-grow"
            disabled={processingChat}
            onChange={(v) => setRequestMessage(v.currentTarget.value)}
            placeholder="What is the HTML?"
            ref={refText}
            value={requestMessage}
          />
          <div className="flex flex-row-reverse gap-1 justify-between">
            <PrimaryButton disabled={processingChat} type="submit">
              📨 Send{" "}
              <small className="text-xs text-gray-300">(Ctrl+Enter)</small>
            </PrimaryButton>
            <NiceButton onClick={onToolsClick} type="button">
              🛠️ Tools...
            </NiceButton>
          </div>
        </form>
      </VStack>
      <ToolsDialog onClose={onSettingsDialogClose} open={settingsOpen} />
    </div>
  );
}
