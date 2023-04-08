import { useEffect, useRef, useState } from "react";
import { KeyAssign } from "../../../domains/key/KeyAssign";
import { useOnKey } from "../../../domains/key/keyHooks";
import { ImageNote, Note } from "../../../domains/note/Note";
import { UserAssets } from "../../../domains/userAssets/UserAssets";
import { useUserAssetsContext } from "../../../domains/userAssets/UserAssetsContext";
import { saveUserAssets } from "../../../domains/userAssets/userAssetsStore";
import { useClearChatHistoryAction } from "../chatHistoryManipulators";
import {
  useSetCurNoteId,
  useStartNewChatNote,
  useStartNewImageNote,
} from "../notes/noteHooks";
import { DiscreetButton } from "./DiscreetButton";
import { NewFilePopup, NewFilePopupCloseHandler } from "./NewFilePopup";
import { OpenFileCloseHandler, OpenFilePopup } from "./OpenFilePopup";

export interface NoteControlPanelProps {
  clearDisabled: boolean;
  clearHistory: () => void;
}

export function NoteControlPanel({
  clearDisabled,
  clearHistory,
}: NoteControlPanelProps): JSX.Element {
  const [userAssets, setUserAssets] = useUserAssetsContext();
  const clearHistoryClick = useClearChatHistoryAction();
  const refMessageList = useRef<HTMLDivElement>(null);
  const [openFilePopupVisible, setOpenFilePopupVisible] = useState(false);
  const [newFilePopupVisible, setNewFilePopupVisible] = useState(false);
  const setCurNoteId = useSetCurNoteId();
  const startNewChatNote = useStartNewChatNote();
  const startNewImageNote = useStartNewImageNote();

  useOnKey("Ctrl+L", document.body, () => {
    if (clearDisabled) {
      return;
    }

    const ok = window.confirm(
      "Are you sure you want to remove history on this note?"
    );
    if (!ok) {
      return;
    }

    clearHistory();
  });

  useOnKey("Ctrl+O", document.body, () => {
    setOpenFilePopupVisible(true);
  });

  useOnKey("Alt+N", document.body, () => {
    setNewFilePopupVisible(true);
  });

  useEffect(() => {
    const children = refMessageList.current?.children;
    if (!children || clearDisabled) {
      return;
    }

    const elLastItem = children[children.length - 1];
    if (!(elLastItem instanceof HTMLElement)) {
      return;
    }

    elLastItem.scrollIntoView({ block: "nearest" });
  }, [clearDisabled]);

  const onNewFileSelect: NewFilePopupCloseHandler = (type) => {
    setNewFilePopupVisible(false);

    if (type === undefined) {
      return;
    }

    if (type === "chat") {
      startNewChatNote();
    } else if (type === "image") {
      startNewImageNote();
    } else {
      throw new Error(`Unknown note type: "${type}"`);
    }
  };

  const onFileSelect: OpenFileCloseHandler = (note: Note | undefined) => {
    setOpenFilePopupVisible(false);
    if (note === undefined) {
      return;
    }

    setCurNoteId(note.id);
  };

  const onNoteRemove = (note: Note) => {
    const ok = window.confirm("Are you sure you want to remove that note?");
    if (!ok) {
      return;
    }

    const newAssets: UserAssets = {
      ...userAssets,
      notes: userAssets.notes.filter((v) => v.id !== note.id),
    };
    saveUserAssets(newAssets);
    setUserAssets(newAssets);
  };

  return (
    <div className="NoteControlPanel grid gap-4">
      <DiscreetButton
        disabled={clearDisabled}
        onClick={clearHistoryClick}
        type="button"
      >
        🗑️ Clear history... <KeyAssign>(Ctrl+L)</KeyAssign>
      </DiscreetButton>
      <DiscreetButton
        onClick={() => setNewFilePopupVisible(true)}
        type="button"
      >
        📚 New note... <KeyAssign>(Alt+N)</KeyAssign>
      </DiscreetButton>
      <DiscreetButton
        onClick={() => setOpenFilePopupVisible(true)}
        type="button"
      >
        📁 Open... <KeyAssign>(Ctrl+O)</KeyAssign>
      </DiscreetButton>
      <NewFilePopup onClose={onNewFileSelect} open={newFilePopupVisible} />
      <OpenFilePopup
        notes={userAssets.notes}
        onClose={onFileSelect}
        onNoteRemove={onNoteRemove}
        open={openFilePopupVisible}
      />
    </div>
  );
}
