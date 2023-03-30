import { Note } from "../note/Note";
import { UserAssets } from "./UserAssets";

export function findCurNote(userAssets: UserAssets): Note | null {
  const note = userAssets.notes.find((v) => v.id === userAssets.curNoteId);
  if (note) {
    return note;
  }

  const firstNote = userAssets.notes[0];
  return firstNote ?? null;
}
