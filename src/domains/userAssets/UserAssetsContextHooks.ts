import { createChatNote, Note } from "../note/Note";
import { useUserAssetsContext } from "./UserAssetsContext";
import { findCurNote } from "./userAssetsManipulators";

// TODO replace with findCurNote
export function useCurNote(): Note {
  const [userAssets] = useUserAssetsContext();

  const note = findCurNote(userAssets);
  if (note) {
    return note;
  }

  const newNote = createChatNote();
  return newNote;
}
