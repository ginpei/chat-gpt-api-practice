import { createChatNote, Note } from "../note/Note";
import { useUserAssetsContext } from "./UserAssetsContext";

export function useCurNote(): Note {
  const [userAssets] = useUserAssetsContext();
  const note = userAssets.notes.find((v) => v.id === userAssets.curNoteId);
  if (note) {
    return note;
  }

  const firstNote = userAssets.notes[0];
  if (firstNote) {
    return firstNote;
  }

  const newNote = createChatNote();
  return newNote;
}
