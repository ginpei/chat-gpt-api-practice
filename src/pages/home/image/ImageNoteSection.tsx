import { useState } from "react";
import { ImageGeneration } from "../../../domains/imageGeneration/ImageHistory";
import { Container } from "../../../domains/layout/Container";
import { ImageNote } from "../../../domains/note/Note";
import { sendImageRequest } from "../../../domains/openai/chatRequestManipulators";
import { useUserAssetsContext } from "../../../domains/userAssets/UserAssetsContext";
import { addImageHistory } from "../../../domains/userAssets/userAssetsManipulators";
import { useUserSettings } from "../../../domains/userSettings/UserSettingsContext";
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
  const [userSettings] = useUserSettings();
  const [userAssets, setUserAssets] = useUserAssetsContext();
  const [formData, setFormData] = useState<ImageFormData>({
    prompt: "a brown horse running in a field in rain",
  });
  const [sending, setSending] = useState(false);

  const onSubmit = async () => {
    setSending(true);

    try {
      const res = await sendImageRequest({
        apiKey: userSettings.apiKey,
        prompt: formData.prompt,
      });

      const url = res.data.data[0].url;
      if (!url) {
        throw new Error("No URL");
      }

      const newAssets = addImageHistory(userAssets, {
        prompt: formData.prompt,
        url,
      });

      setUserAssets(newAssets);
      setFormData({ prompt: "" });
      // TODO: save to local storage
    } catch (error) {
      // TODO show error
      console.error(error);
    } finally {
      setSending(false);
    }
  };

  const onPromptChange = (data: ImageFormData) => {
    setFormData(data);
  };

  return (
    <HistoryFrame
      ControlBlock={
        <ImageForm
          data={formData}
          disabled={sending}
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
