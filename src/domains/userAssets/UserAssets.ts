import { Note } from "../note/Note";

export interface UserAssets {
  curNoteId: string;
  notes: Note[];
}

export function createUserAssets(init?: Partial<UserAssets>): UserAssets {
  return {
    curNoteId: init?.curNoteId ?? "",
    notes: init?.notes ?? [],
  };
}
