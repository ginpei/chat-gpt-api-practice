import { useCallback } from "react";
import { createChatNote } from "../../domains/note/Note";
import { UserAssets } from "../../domains/userAssets/UserAssets";
import { useUserAssetsContext } from "../../domains/userAssets/UserAssetsContext";
import { useCurNote } from "../../domains/userAssets/UserAssetsContextHooks";
import { saveUserAssets } from "../../domains/userAssets/userAssetsStore";

export function useClearChatHistoryAction(): () => void {
  const [userAssets, setUserAssets] = useUserAssetsContext();
  const note = useCurNote();

  const action = useCallback(() => {
    const ok = window.confirm("Are you sure you want to remove all chat log?");
    if (!ok) {
      return;
    }

    const newAssets = clearChatNoteHistory(userAssets, note.id);

    saveUserAssets(newAssets);
    setUserAssets(newAssets);
  }, [note.id, setUserAssets, userAssets]);

  return action;
}

function clearChatNoteHistory(userAssets: UserAssets, id: string): UserAssets {
  const notes = userAssets.notes.map((v) =>
    v.id === id ? createChatNote({ id: id }) : v
  );

  const newAssets: UserAssets = {
    ...userAssets,
    notes,
  };

  return newAssets;
}
