import { useState } from "react";
import { ImageGeneration } from "../../../domains/imageGeneration/ImageHistory";
import { Container } from "../../../domains/layout/Container";
import { ImageNote } from "../../../domains/note/Note";
import { useUserAssetsContext } from "../../../domains/userAssets/UserAssetsContext";
import { HistoryFrame } from "../history/HistoryFrame";
import { NoteControlPanel } from "../history/NoteControlPanel";
import { ImageForm, ImageFormData } from "./ImageForm";
import { ImageItem } from "./ImageItem";

export interface ImageNoteSectionProps {
  note: ImageNote;
}

const tmp__note_body_messages: ImageGeneration[] = [
  {
    id: "1",
    prompt: "Hello World!",
    url: "https://ginpei.dev/ginpei-1200.png",
  },
  {
    id: "2",
    prompt: "Hello World!",
    url: "https://ginpei.dev/ginpei-1200.png",
  },
];

export function ImageNoteSection({ note }: ImageNoteSectionProps): JSX.Element {
  const [userAssets, setUserAssets] = useUserAssetsContext();
  const [formData, setFormData] = useState<ImageFormData>({ prompt: "" });

  const onSubmit = () => {
    console.log(`# Hi`, formData);
  };

  const onPromptChange = (data: ImageFormData) => {
    setFormData(data);
  };

  return (
    <HistoryFrame
      ControlBlock={
        <ImageForm
          data={formData}
          onChange={onPromptChange}
          onSubmit={onSubmit}
        />
      }
      HistoryBlock={
        <div>
          {note.body.images.map((message) => (
            <ImageItem image={message} key={message.id} />
          ))}
          <Container>
            <div className="mt-32 mb-32">
              <NoteControlPanel clearDisabled={note.body.images.length < 1} />
            </div>
          </Container>
        </div>
      }
    />
  );
}
