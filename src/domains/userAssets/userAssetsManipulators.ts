import { ChatMessage } from "../chat/ChatMessage";
import { generateRandomId } from "../id/id";
import { ImageGeneration } from "../imageGeneration/ImageHistory";
import { ChatNote, ImageNote, Note } from "../note/Note";
import { UserAssets } from "./UserAssets";

export function findCurNote(userAssets: UserAssets): Note | null {
  const note = userAssets.notes.find((v) => v.id === userAssets.curNoteId);
  if (note) {
    return note;
  }

  const firstNote = userAssets.notes[0];
  return firstNote ?? null;
}

export function updateNote(userAssets: UserAssets, note: Note): UserAssets {
  const notes = userAssets.notes.map((v) => (v.id === note.id ? note : v));
  return { ...userAssets, notes };
}

export function addChatHistory(
  userAssets: UserAssets,
  message: Omit<ChatMessage, "id">
): UserAssets {
  const curNote = findCurNote(userAssets);
  if (!curNote || curNote.type !== "chat") {
    throw new Error("Chat note is required");
  }

  const newNote: ChatNote = {
    ...curNote,
    body: {
      ...curNote.body,
      messages: [
        ...curNote.body.messages,
        {
          ...message,
          id: generateRandomId(),
        },
      ],
    },
  };

  const newAssets = updateNote(userAssets, newNote);

  return newAssets;
}

export function addImageHistory(
  userAssets: UserAssets,
  generation: Omit<ImageGeneration, "id">
): UserAssets {
  const curNote = findCurNote(userAssets);
  if (!curNote || curNote.type !== "image") {
    throw new Error("Note not found");
  }

  const newNote: ImageNote = {
    ...curNote,
    body: {
      ...curNote.body,
      images: [
        ...curNote.body.images,
        {
          ...generation,
          id: generateRandomId(),
        },
      ],
    },
  };

  const newAssets = updateNote(userAssets, newNote);

  return newAssets;
}
