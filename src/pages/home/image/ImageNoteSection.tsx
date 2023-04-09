import { useState } from "react";
import { ImageGeneration } from "../../../domains/imageGeneration/ImageHistory";
import { Container } from "../../../domains/layout/Container";
import { ImageNote } from "../../../domains/note/Note";
import { sendImageRequest } from "../../../domains/openai/chatRequestManipulators";
import { useUserAssetsContext } from "../../../domains/userAssets/UserAssetsContext";
import {
  addImageHistory,
  updateNote,
} from "../../../domains/userAssets/userAssetsManipulators";
import { saveUserAssets } from "../../../domains/userAssets/userAssetsStore";
import { useUserSettings } from "../../../domains/userSettings/UserSettingsContext";
import { ToolsDialogButton } from "../control/ToolsDialogButton";
import { HistoryFrame } from "../history/HistoryFrame";
import { NoteControlPanel } from "../history/NoteControlPanel";
import { ImageForm, ImageFormData } from "./ImageForm";
import { ImageItem } from "./ImageItem";

export interface ImageNoteSectionProps {
  note: ImageNote;
}

export function ImageNoteSection({ note }: ImageNoteSectionProps): JSX.Element {
  const [userSettings] = useUserSettings();
  const [userAssets, setUserAssets] = useUserAssetsContext();
  const [formData, setFormData] = useState<ImageFormData>({
    prompt:
      note.body.images.length < 1
        ? "a brown horse running in a field in rain"
        : "",
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
      saveUserAssets(newAssets);
      setFormData({ prompt: "" });
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

  const clearHistory = () => {
    note.body.images = [];
    const newAssets = updateNote(userAssets, note);
    setUserAssets(newAssets);
    saveUserAssets(newAssets);
  };

  return (
    <HistoryFrame
      ControlBlock={
        <ImageForm
          asideContent={
            <ToolsDialogButton hasApiKey={userSettings.apiKey === ""} />
          }
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
              <NoteControlPanel
                clearDisabled={note.body.images.length < 1}
                clearHistory={clearHistory}
              />
            </div>
          </Container>
        </div>
      }
    />
  );
}
