import { createRef, useEffect, useState } from "react";
import { Container } from "../../../domains/layout/Container";
import { ChatNote } from "../../../domains/note/Note";
import { sendChatRequest } from "../../../domains/openai/chatRequestManipulators";
import { useUserAssetsContext } from "../../../domains/userAssets/UserAssetsContext";
import {
  addChatHistory,
  updateNote,
} from "../../../domains/userAssets/userAssetsManipulators";
import { saveUserAssets } from "../../../domains/userAssets/userAssetsStore";
import { useUserSettings } from "../../../domains/userSettings/UserSettingsContext";
import { ToolsDialogButton } from "../control/ToolsDialogButton";
import { HistoryFrame } from "../history/HistoryFrame";
import { NoteControlPanel } from "../history/NoteControlPanel";
import { ChatForm, ChatFormData } from "./ChatForm";
import { ChatItem } from "./ChatItem";

export interface ChatNoteSectionProps {
  note: ChatNote;
}

export function ChatNoteSection({ note }: ChatNoteSectionProps): JSX.Element {
  const [userSettings] = useUserSettings();
  const [userAssets, setUserAssets] = useUserAssetsContext();
  const [formData, setFormData] = useState<ChatFormData>({
    prompt:
      note.body.messages.length < 1
        ? "Could you please tell me a bit about yourself?"
        : "",
  });
  const [sending, setSending] = useState(false);
  const refScrollAim = createRef<HTMLDivElement>();

  useEffect(() => {
    const elTarget = refScrollAim.current;
    if (!elTarget) {
      return;
    }

    elTarget.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [refScrollAim]);

  const onSubmit = async () => {
    setSending(true);

    try {
      const newAssets = addChatHistory(userAssets, {
        body: formData.prompt,
        complete: true,
        date: Date.now(),
        name: "you",
      });

      setUserAssets(newAssets);

      const res = await sendChatRequest({
        apiKey: userSettings.apiKey,
        prompt: formData.prompt,
      });

      const text = res.data.choices[0]?.text;
      if (!text) {
        console.info("res.data.choices:", res.data.choices);
        throw new Error("No text");
      }

      const resultAssets = addChatHistory(newAssets, {
        body: text,
        complete: true, // TODO
        date: Date.now(),
        name: "ai",
      });

      setUserAssets(resultAssets);
      saveUserAssets(resultAssets);
      setFormData({ prompt: "" });
    } catch (error) {
      // TODO show error
      console.error(error);
    } finally {
      setSending(false);
    }
  };

  const onPromptChange = (data: ChatFormData) => {
    setFormData(data);
  };

  const clearHistory = () => {
    note.body.messages = [];
    const newAssets = updateNote(userAssets, note);
    setUserAssets(newAssets);
    saveUserAssets(newAssets);
  };

  return (
    <HistoryFrame
      ControlBlock={
        <ChatForm
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
          {note.body.messages.map((message) => (
            <ChatItem message={message} key={message.id} renderMarkdown />
          ))}
          <div aria-hidden className="h-8" ref={refScrollAim}></div>
          <Container>
            <div className="mt-32 mb-32">
              <NoteControlPanel
                clearDisabled={note.body.messages.length < 1}
                clearHistory={clearHistory}
              />
            </div>
          </Container>
        </div>
      }
    />
  );
}
