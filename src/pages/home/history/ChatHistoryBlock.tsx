import { ReactNode, useEffect, useRef, useState } from "react";
import { generateRandomId } from "../../../domains/id/id";
import { KeyAssign } from "../../../domains/key/KeyAssign";
import { useOnKey } from "../../../domains/key/keyHooks";
import { Container } from "../../../domains/layout/Container";
import { createChatNote, Note } from "../../../domains/note/Note";
import { UserAssets } from "../../../domains/userAssets/UserAssets";
import { useUserAssetsContext } from "../../../domains/userAssets/UserAssetsContext";
import { useCurNote } from "../../../domains/userAssets/UserAssetsContextHooks";
import { saveUserAssets } from "../../../domains/userAssets/userAssetsStore";
import { useUserSettings } from "../../../domains/userSettings/UserSettingsContext";
import { useClearChatHistoryAction } from "../chatHistoryManipulators";
import {
  ContinueChatMessage,
  useSubmitChatMessage,
} from "../chatRequestManagers";
import { ChatItem } from "./ChatItem";
import { DiscreetButton } from "./DiscreetButton";
import { NewFilePopup, NewFilePopupCloseHandler } from "./NewFilePopup";
import { SelectFileCloseHandler, SelectFilePopup } from "./SelectFilePopup";

export interface ChatHistoryBlockProps {}

export function ChatHistoryBlock({}: ChatHistoryBlockProps): JSX.Element {
  const [userSettings] = useUserSettings();
  const [userAssets, setUserAssets] = useUserAssetsContext();
  const clearHistoryClick = useClearChatHistoryAction();
  const refMessageList = useRef<HTMLDivElement>(null);
  const [selectFileVisible, setSelectFileVisible] = useState(false);
  const submitChatMessage = useSubmitChatMessage();
  const [processingContinueChatMessage, setProcessingContinueChatMessage] =
    useState(false);
  const note = useCurNote();
  const [newFilePopupVisible, setNewFilePopupVisible] = useState(false);

  useOnKey("Ctrl+O", document.body, () => {
    setSelectFileVisible(true);
  });

  useOnKey("Alt+N", document.body, () => {
    setNewFilePopupVisible(true);
  });

  useEffect(() => {
    const children = refMessageList.current?.children;
    if (!children || userAssets.messages.length < 1) {
      return;
    }

    const elLastItem = children[children.length - 1];
    if (!(elLastItem instanceof HTMLElement)) {
      return;
    }

    elLastItem.scrollIntoView({ block: "nearest" });
  }, [userAssets.messages.length]);

  const onContinueClick = async () => {
    setProcessingContinueChatMessage(true);
    try {
      await submitChatMessage(ContinueChatMessage);
    } finally {
      setProcessingContinueChatMessage(false);
    }
  };

  const onNewFileSelect: NewFilePopupCloseHandler = (type) => {
    setNewFilePopupVisible(false);

    if (type === undefined) {
      return;
    }

    const newNote = createChatNote({ id: generateRandomId() });
    const newAssets: UserAssets = {
      ...userAssets,
      curNoteId: newNote.id,
      notes: userAssets.notes.concat(newNote),
    };
    saveUserAssets(newAssets);
    setUserAssets(newAssets);
  };

  const onFileSelect: SelectFileCloseHandler = (note: Note | undefined) => {
    if (note) {
      console.log("# note", note);
    }
    setSelectFileVisible(false);
  };

  return (
    <div className="ChatHistoryBlock flex-grow overflow-auto bg-stone-50">
      <div ref={refMessageList}>
        {userAssets.messages.map((message) => (
          <ChatItem
            key={message.id}
            message={message}
            renderMarkdown={userSettings.renderMarkdown}
          />
        ))}
      </div>
      {!userAssets.messages.at(-1)?.complete &&
        !processingContinueChatMessage && (
          <div className="grid">
            <ContinueButton onClick={onContinueClick}>
              Tap to get continued
            </ContinueButton>
          </div>
        )}
      <Container>
        <div className="py-2 text-end text-sm text-gray-300">
          Chat token usage: {userAssets.completionTokenUsage}
        </div>
      </Container>
      <div>
        <div>Cur note: {note.id}</div>
        <div>
          {note.type === "chat" &&
            note.body.messages.map((message) => (
              <ChatItem
                key={message.id}
                message={message}
                renderMarkdown={userSettings.renderMarkdown}
              />
            ))}
        </div>
      </div>
      <div aria-hidden className="min-h-[5em]"></div>
      <Container>
        <div className="grid gap-4">
          <DiscreetButton
            disabled={userAssets.messages.length < 1}
            onClick={clearHistoryClick}
            type="button"
          >
            🗑️ Clear history... <KeyAssign>(Ctrl+L)</KeyAssign>
          </DiscreetButton>
          <DiscreetButton
            disabled={userAssets.messages.length < 1}
            onClick={() => setNewFilePopupVisible(true)}
            type="button"
          >
            📚 New note... <KeyAssign>(Alt+N)</KeyAssign>
          </DiscreetButton>
          <DiscreetButton
            onClick={() => setSelectFileVisible(true)}
            type="button"
          >
            📁 Open... <KeyAssign>(Ctrl+O)</KeyAssign>
          </DiscreetButton>
        </div>
      </Container>
      <div aria-hidden className="min-h-[5em]"></div>
      <NewFilePopup onClose={onNewFileSelect} open={newFilePopupVisible} />
      <SelectFilePopup
        notes={userAssets.notes}
        onClose={onFileSelect}
        open={selectFileVisible}
      />
    </div>
  );
}
function ContinueButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}): JSX.Element {
  return (
    <button className="p-4 bg-gray-200 active:bg-gray-300" onClick={onClick}>
      {children}
    </button>
  );
}
