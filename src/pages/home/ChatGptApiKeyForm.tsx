import { useState } from "react";
import { NiceButton } from "../../domains/button/NiceButton";
import { HStack } from "../../domains/layout/HStack";
import { useChatGptApiContext } from "../../domains/openai/chatGptApiContext";
import { SettingsDialog } from "./SettingsDialog";

export interface ChatGptApiKeyFormProps {}

export function ChatGptApiKeyForm({}: ChatGptApiKeyFormProps): JSX.Element {
  const [apiContext] = useChatGptApiContext();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const onCogClick = () => {
    setSettingsOpen(true);
  };

  const onSettingsDialogClose = () => {
    setSettingsOpen(false);
  };

  return (
    <div className="ChatGptApiKeyForm">
      <HStack>
        <NiceButton onClick={onCogClick}>⚙️ Settings</NiceButton>
        {!apiContext.apiKey && (
          <span className="text-red-500">* You have to set API key to use</span>
        )}
      </HStack>
      <SettingsDialog onClose={onSettingsDialogClose} open={settingsOpen} />
    </div>
  );
}
