import { useState } from "react";
import { NiceButton } from "../../domains/button/NiceButton";
import { HStack } from "../../domains/layout/HStack";
import { useChatGptApiKey } from "../../domains/openai/chatGptApiKeyHooks";
import { SettingsDialog } from "./SettingsDialog";

export interface ChatGptApiKeyFormProps {}

export function ChatGptApiKeyForm({}: ChatGptApiKeyFormProps): JSX.Element {
  const apiKey = useChatGptApiKey();
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
        <NiceButton onClick={onCogClick}>⚙️</NiceButton>
        {!apiKey && (
          <span className="text-red-500">* You have to set API key to use</span>
        )}
      </HStack>
      <SettingsDialog onClose={onSettingsDialogClose} open={settingsOpen} />
    </div>
  );
}
