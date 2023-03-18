import { FormEventHandler, useCallback, useRef, useState } from "react";
import { NiceButton } from "../../../domains/button/NiceButton";
import { PrimaryButton } from "../../../domains/button/PrimaryButton";
import { useError } from "../../../domains/error/errorHooks";
import { toError } from "../../../domains/error/errorManipulators";
import { NiceText } from "../../../domains/input/NiceText";
import { KeyAssign } from "../../../domains/key/KeyAssign";
import { useOnKey } from "../../../domains/key/keyHooks";
import { Container } from "../../../domains/layout/Container";
import { VStack } from "../../../domains/layout/VStack";
import { DragPositionHandler } from "../../../domains/resize/Dragger";
import { VResizeBar } from "../../../domains/resize/VResizeBar";
import { waitUntil } from "../../../domains/time/waitFunctions";
import { useUserAssetsContext } from "../../../domains/userAssets/UserAssetsContext";
import { useUserSettings } from "../../../domains/userSettings/UserSettingsContext";
import {
  useSubmitChatMessage,
  useSubmitImageRequest,
} from "../chatRequestManagers";
import { SendOptionCloseHandler, SendOptionPopup } from "./SendOptionPopup";
import { ToolsDialog } from "./ToolsDialog";

export interface ChatControlBlockProps {}

export function ChatControlBlock({}: ChatControlBlockProps): JSX.Element {
  const [userSettings] = useUserSettings();
  const [userAssets, setUserAssets] = useUserAssetsContext();
  const [sendError, setSendError] = useError();
  const [requestMessage, setRequestMessage] = useState(
    userAssets.messages.length > 0 ? "" : "Say something funny"
  );
  const [processingChat, setProcessingChat] = useState(false);
  const [toolsDialogOpen, setToolsDialogOpen] = useState(
    userSettings.apiKey === ""
  );
  const refText = useRef<HTMLTextAreaElement>(null);
  const refSendOptionButton = useRef<HTMLButtonElement>(null);
  const [sendOptionVisible, setSendOptionVisible] = useState(false);
  const [textBoxHeightPx, setTextBoxHeightPx] = useState(66);
  const [textBoxHeightTransitionPx, setTextBoxHeightTransitionPx] = useState(0);
  const submitChatMessage = useSubmitChatMessage();
  const submitImageRequest = useSubmitImageRequest();

  useOnKey("Ctrl+Shift+Enter", refText.current, () => {
    setSendOptionVisible(true);
  });

  useOnKey("Ctrl+Enter", refText.current, () => {
    submitChatMessageForm();
  });

  const useSubmitForm = useCallback(
    (exec: () => Promise<void>) => {
      return async () => {
        setProcessingChat(true);
        setSendError(null);
        try {
          await exec();

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
    },
    [setSendError]
  );

  const submitChatMessageForm = useSubmitForm(() =>
    submitChatMessage(requestMessage)
  );

  const submitImageRequestForm = useSubmitForm(() =>
    submitImageRequest(requestMessage)
  );

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
    submitChatMessageForm();
  };

  const onSendOptionClose: SendOptionCloseHandler = (type) => {
    setSendOptionVisible(false);
    if (type === "text") {
      submitChatMessageForm();
    } else if (type === "image") {
      submitImageRequestForm();
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
    <div className="ChatControlBlock border-t pb-4 border-t-gray-200 bg-gray-100">
      <VResizeBar onDone={onResizeBarDone} onMove={onResizeBarMove} />
      <Container>
        <VStack gap="gap-2">
          {!userSettings.apiKey && <p className="text-red-700">Set API key</p>}
          {sendError && <p className="text-red-700">{sendError.message}</p>}
          <form
            className="ChatForm flex flex-col gap-1"
            onSubmit={onFormSubmit}
          >
            <NiceText
              accessKey="I"
              className="resize-none"
              disabled={processingChat}
              onChange={(v) => setRequestMessage(v.currentTarget.value)}
              placeholder={`Ask anything here! (Alt+I)${"\n"}e.g. What is the HTML?`}
              ref={refText}
              style={{
                height: `${textBoxHeightPx + textBoxHeightTransitionPx}px`,
              }}
              value={requestMessage}
            />
            <div className="flex flex-row-reverse gap-1 justify-between">
              <div className="flex gap-1">
                <PrimaryButton disabled={processingChat} type="submit">
                  📨 Send <KeyAssign theme="primary">(Ctrl+Enter)</KeyAssign>
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
      <SendOptionPopup onClose={onSendOptionClose} open={sendOptionVisible} />
      <ToolsDialog onClose={onToolsDialogClose} open={toolsDialogOpen} />
    </div>
  );
}
