import { ChatHistory, createChatHistory } from "../chat/ChatHistory";

export interface NoteBase<Body, Type extends NoteType> {
  body: Body;
  id: string;
  title: string;
  type: Type;
}

export type Note = ChatNote | ImageNote;

export type ChatNote = NoteBase<ChatHistory, "chat">;

export type ImageNote = NoteBase<[string, string], "image">;

export type NoteType = "chat" | "image";

export const noteIcons: Readonly<Record<NoteType, string>> = {
  chat: "💭",
  image: "🖼️",
};

function createNoteBase<Body, Type extends NoteType>(
  init: Partial<NoteBase<Body, Type>>,
  type: Type,
  initialBody: Body
): NoteBase<Body, Type> {
  return {
    body: init?.body ?? initialBody,
    id: init?.id ?? "",
    title: init?.title ?? "",
    type,
  };
}

export function createChatNote(init: Partial<ChatNote> = {}): ChatNote {
  return createNoteBase(init, "chat", createChatHistory());
}
