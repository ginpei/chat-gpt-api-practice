import { FormEventHandler, useRef, useState } from "react";
import { NiceButton } from "../../domains/button/NiceButton";
import { PrimaryButton } from "../../domains/button/PrimaryButton";
import { useChatHistoryContext } from "../../domains/chat/ChatHistoryContext";
import { saveChatLog } from "../../domains/chat/chatLogStore";
import { buildChatMessage } from "../../domains/chat/ChatMessage";
import { buildPromptText } from "../../domains/chat/chatMessageManipulators";
import { useError } from "../../domains/error/errorHooks";
import { toError } from "../../domains/error/errorManipulators";
import { NiceText } from "../../domains/input/NiceText";
import { VStack } from "../../domains/layout/VStack";
import { useChatGptApiContext } from "../../domains/openai/chatGptApiContext";
import { sendChatRequest } from "../../domains/openai/chatRequestManipulators";
import { waitUntil } from "../../domains/time/waitFunctions";
import { SendOptionCloseHandler, SendOptionPopup } from "./SendOptionPopup";
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
  const [toolsDialogOpen, setToolsDialogOpen] = useState(false);
  const refText = useRef<HTMLTextAreaElement>(null);
  const refSendOptionButton = useRef<HTMLButtonElement>(null);
  const [sendOptionVisible, setSendOptionVisible] = useState(false);

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
      });
      setHistory((prevHistory) => {
        const newMessages = [...prevHistory.messages, aiMessage];
        saveChatLog(newMessages);
        return {
          ...prevHistory,
          messages: newMessages,
          tokenUsage: result.data.usage?.total_tokens ?? NaN,
        };
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

  const onSendOptionClose: SendOptionCloseHandler = (type) => {
    setSendOptionVisible(false);
    if (type === "text") {
      onSubmit();
    } else if (type === undefined) {
      // do nothing
    }
  };

  const onToolsClick = () => {
    setToolsDialogOpen(true);
  };

  const onToolsDialogClose = () => {
    setToolsDialogOpen(false);
  };

  return (
    <div className="ChatControlBlock border-t p-4 border-t-gray-200 bg-gray-100">
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
            <div className="flex gap-1">
              <PrimaryButton disabled={processingChat} type="submit">
                📨 Send{" "}
                <small className="text-xs text-gray-300">(Ctrl+Enter)</small>
              </PrimaryButton>
              <PrimaryButton
                disabled={processingChat}
                onClick={() => setSendOptionVisible(true)}
                ref={refSendOptionButton}
                type="button"
              >
                ︙
              </PrimaryButton>
            </div>
            <NiceButton onClick={onToolsClick} type="button">
              🛠️ Tools...
            </NiceButton>
          </div>
        </form>
      </VStack>
      <SendOptionPopup
        hoverOn={refSendOptionButton}
        onClose={onSendOptionClose}
        open={sendOptionVisible}
      />
      <ToolsDialog onClose={onToolsDialogClose} open={toolsDialogOpen} />
    </div>
  );
}
