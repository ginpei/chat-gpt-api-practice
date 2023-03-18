import { useEffect, useRef, useState } from "react";
import { createChatHistory } from "../../../domains/chat/ChatHistory";
import { KeyAssign } from "../../../domains/key/KeyAssign";
import { useOnKey } from "../../../domains/key/keyHooks";
import { Container } from "../../../domains/layout/Container";
import { createChatNote, Note } from "../../../domains/note/Note";
import { useUserAssetsContext } from "../../../domains/userAssets/UserAssetsContext";
import { useUserSettings } from "../../../domains/userSettings/UserSettingsContext";
import { useClearChatHistoryAction } from "../chatHistoryManipulators";
import { ChatItem } from "./ChatItem";
import { DiscreetButton } from "./DiscreetButton";
import { SelectFileCloseHandler, SelectFilePopup } from "./SelectFilePopup";

export interface ChatHistoryBlockProps {}

export function ChatHistoryBlock({}: ChatHistoryBlockProps): JSX.Element {
  const [userSettings] = useUserSettings();
  const [userAssets, setUserAssets] = useUserAssetsContext();
  const clearHistoryClick = useClearChatHistoryAction();
  const refMessageList = useRef<HTMLDivElement>(null);
  const [selectFileVisible, setSelectFileVisible] = useState(false);

  useOnKey("Ctrl+O", document.body, () => {
    setSelectFileVisible(true);
  });

  useEffect(() => {
    const children = refMessageList.current?.children;
    if (!children || userAssets.messages.length < 1) {
      return;
    }

    const elLastItem = children[children.length - 1];
    if (!(elLastItem instanceof HTMLElement)) {
      return;
    }

    elLastItem.scrollIntoView({ block: "nearest" });
  }, [userAssets.messages.length]);

  const onFileSelect: SelectFileCloseHandler = (note: Note | undefined) => {
    if (note) {
      console.log("# note", note);
    }
    setSelectFileVisible(false);
  };

  return (
    <div className="ChatHistoryBlock flex-grow overflow-auto bg-stone-50">
      <div ref={refMessageList}>
        {userAssets.messages.map((message) => (
          <ChatItem
            key={message.id}
            message={message}
            renderMarkdown={userSettings.renderMarkdown}
          />
        ))}
      </div>
      <Container>
        <div className="py-2 text-end text-sm text-gray-300">
          Chat token usage: {userAssets.completionTokenUsage}
        </div>
      </Container>
      <div aria-hidden className="min-h-[5em]"></div>
      <Container>
        <div className="grid gap-4">
          <DiscreetButton
            disabled={userAssets.messages.length < 1}
            onClick={clearHistoryClick}
            type="button"
          >
            🗑️ Clear history... <KeyAssign>(Ctrl+L)</KeyAssign>
          </DiscreetButton>
          {/* <DiscreetButton
            onClick={() => setSelectFileVisible(true)}
            type="button"
          >
            📁 Open... <KeyAssign>(Ctrl+O)</KeyAssign>
          </DiscreetButton> */}
        </div>
      </Container>
      <div aria-hidden className="min-h-[5em]"></div>
      <SelectFilePopup
        notes={userAssets.notes}
        onClose={onFileSelect}
        open={selectFileVisible}
      />
    </div>
  );
}
