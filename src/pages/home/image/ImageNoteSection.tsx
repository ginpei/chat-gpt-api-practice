import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { NiceButton } from "../../../domains/button/NiceButton";
import { PrimaryButton } from "../../../domains/button/PrimaryButton";
import {
  ChatMessage,
  buildChatMessage,
} from "../../../domains/chat/ChatMessage";
import { NiceText } from "../../../domains/input/NiceText";
import { Container } from "../../../domains/layout/Container";
import { VStack } from "../../../domains/layout/VStack";
import { ImageNote } from "../../../domains/note/Note";
import { useUserAssetsContext } from "../../../domains/userAssets/UserAssetsContext";
import { ChatItem } from "../history/ChatItem";
import { NoteControlPanel } from "../history/NoteControlPanel";
import { HistoryFrame } from "../history/HistoryFrame";

export interface ImageNoteSectionProps {
  note: ImageNote;
}

const tmp__note_body_messages: ChatMessage[] = [
  buildChatMessage({
    body: "Hello World!",
    complete: true,
    name: "you",
    type: "image",
  }),
  buildChatMessage({
    body: "https://ginpei.dev/ginpei-1200.png",
    complete: true,
    name: "ai",
    type: "image",
  }),
  buildChatMessage({
    body: "Hello World!",
    complete: true,
    name: "you",
    type: "image",
  }),
  buildChatMessage({
    body: "https://ginpei.dev/ginpei-1200.png",
    complete: true,
    name: "ai",
    type: "image",
  }),
];

export function ImageNoteSection({ note }: ImageNoteSectionProps): JSX.Element {
  const [userAssets, setUserAssets] = useUserAssetsContext();
  const [prompt, setPrompt] = useState("");

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    console.log(`# Hi`, prompt);
  };

  const onPromptChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setPrompt(event.currentTarget.value);
  };

  return (
    <HistoryFrame
      ControlBlock={
        <form className="p-4" onSubmit={onSubmit}>
          <Container>
            <VStack>
              <NiceText onChange={onPromptChange} value={prompt} />
              <div className="flex flex-row-reverse justify-between">
                <PrimaryButton>Generate image</PrimaryButton>
                <NiceButton disabled>Tools...</NiceButton>
              </div>
            </VStack>
          </Container>
        </form>
      }
      HistoryBlock={
        <div>
          {tmp__note_body_messages.map((message) => (
            <ChatItem
              key={message.id}
              message={message}
              renderMarkdown={false}
            />
          ))}
          <Container>
            <div className="mt-32 mb-32">
              <NoteControlPanel note={note} />
            </div>
          </Container>
        </div>
      }
    />
  );
}
