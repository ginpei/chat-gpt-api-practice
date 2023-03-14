import { FormEventHandler, useRef, useState } from "react";
import { NiceButton } from "../../domains/button/NiceButton";
import { PrimaryButton } from "../../domains/button/PrimaryButton";
import {
  ChatHistoryContextValue,
  useChatHistoryContext,
} from "../../domains/chat/ChatHistoryContext";
import { saveHistoryLog } from "../../domains/chat/chatLogStore";
import { buildChatMessage } from "../../domains/chat/ChatMessage";
import { buildPromptText } from "../../domains/chat/chatMessageManipulators";
import { useError } from "../../domains/error/errorHooks";
import { toError } from "../../domains/error/errorManipulators";
import { NiceText } from "../../domains/input/NiceText";
import { Container } from "../../domains/layout/Container";
import { VStack } from "../../domains/layout/VStack";
import { useChatGptApiContext } from "../../domains/openai/chatGptApiContext";
import {
  sendChatRequest,
  sendImageRequest,
} from "../../domains/openai/chatRequestManipulators";
import { DragPositionHandler } from "../../domains/resize/Dragger";
import { VResizeBar } from "../../domains/resize/VResizeBar";
import { waitUntil } from "../../domains/time/waitFunctions";
import { SendOptionCloseHandler, SendOptionPopup } from "./SendOptionPopup";
import { useOnKey } from "./shortcutHooks";
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
  const [toolsDialogOpen, setToolsDialogOpen] = useState(
    apiContext.apiKey === ""
  );
  const refText = useRef<HTMLTextAreaElement>(null);
  const refSendOptionButton = useRef<HTMLButtonElement>(null);
  const [sendOptionVisible, setSendOptionVisible] = useState(false);
  const [textBoxHeightPx, setTextBoxHeightPx] = useState(66);
  const [textBoxHeightTransitionPx, setTextBoxHeightTransitionPx] = useState(0);

  useOnKey("Shift+Enter", refText.current, () => {
    setSendOptionVisible(true);
  });

  useOnKey("Ctrl+Enter", refText.current, () => {
    submit();
  });

  const onResizeBarMove: DragPositionHandler = (pos) => {
    const minHeight = 42;
    const dy = -pos.dy;
    const px = Math.max(minHeight - textBoxHeightPx, dy);
    setTextBoxHeightTransitionPx(px);
  };

  const onResizeBarDone: DragPositionHandler = () => {
    setTextBoxHeightPx(textBoxHeightPx + textBoxHeightTransitionPx);
    setTextBoxHeightTransitionPx(0);
  };

  const onFormSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    submit();
  };

  const onSendOptionClose: SendOptionCloseHandler = (type) => {
    setSendOptionVisible(false);
    if (type === "text") {
      submit();
    } else if (type === "image") {
      submitImageRequest();
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

  const submit = async () => {
    setProcessingChat(true);
    setSendError(null);
    try {
      const userMessage = buildChatMessage({
        body: requestMessage,
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

  const submitImageRequest = async () => {
    setProcessingChat(true);
    setSendError(null);
    try {
      const userMessage = buildChatMessage({
        body: requestMessage,
        name: "you",
        type: "image",
      });
      const messageWithUserUpdate = [...history.messages, userMessage];
      setHistory({ ...history, messages: messageWithUserUpdate });

      const result = await sendImageRequest({
        apiKey: apiContext.apiKey,
        prompt: requestMessage,
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

  return (
    <div className="ChatControlBlock border-t pb-4 border-t-gray-200 bg-gray-100">
      <Container>
        <VStack gap="gap-2">
          <VResizeBar onDone={onResizeBarDone} onMove={onResizeBarMove} />
          {!apiContext.apiKey && <p className="text-red-700">Set API key</p>}
          {sendError && <p className="text-red-700">{sendError.message}</p>}
          <form
            className="ChatForm flex flex-col gap-1"
            onSubmit={onFormSubmit}
          >
            <NiceText
              className="resize-none"
              disabled={processingChat}
              onChange={(v) => setRequestMessage(v.currentTarget.value)}
              placeholder="What is the HTML?"
              ref={refText}
              style={{
                height: `${textBoxHeightPx + textBoxHeightTransitionPx}px`,
              }}
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
      </Container>
      <SendOptionPopup
        hoverOn={refSendOptionButton}
        onClose={onSendOptionClose}
        open={sendOptionVisible}
      />
      <ToolsDialog onClose={onToolsDialogClose} open={toolsDialogOpen} />
    </div>
  );
}
