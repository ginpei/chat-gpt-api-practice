import { useCallback } from "react";
import { generateRandomId } from "../../../domains/id/id";
import { createChatNote } from "../../../domains/note/Note";
import { UserAssets } from "../../../domains/userAssets/UserAssets";
import { useUserAssetsContext } from "../../../domains/userAssets/UserAssetsContext";
import { saveUserAssets } from "../../../domains/userAssets/userAssetsStore";

export function useSetCurNoteId(): (id: string) => void {
  const [userAssets, setUserAssets] = useUserAssetsContext();

  const setCurNoteId = useCallback(
    (id: string) => {
      const newAssets: UserAssets = {
        ...userAssets,
        curNoteId: id,
      };
      saveUserAssets(newAssets);
      setUserAssets(newAssets);
    },
    [setUserAssets, userAssets]
  );

  return setCurNoteId;
}

export function useStartNewNote(): () => void {
  const [userAssets, setUserAssets] = useUserAssetsContext();

  const startNewNote = useCallback(() => {
    const newNote = createChatNote({ id: generateRandomId() });
    const newAssets: UserAssets = {
      ...userAssets,
      curNoteId: newNote.id,
      notes: userAssets.notes.concat(newNote),
    };
    saveUserAssets(newAssets);
    setUserAssets(newAssets);
  }, [setUserAssets, userAssets]);

  return startNewNote;
}
