import { FormEventHandler } from "react";
import { NiceButton } from "../../domains/button/NiceButton";
import {
  NiceDialog,
  NiceDialogCoreProps,
} from "../../domains/dialog/NiceDialog";
import { NiceLink } from "../../domains/link/NiceLink";
import { useChatGptApiKeyState } from "../../domains/openai/chatGptApiKeyHooks";

export interface SettingsDialogProps extends NiceDialogCoreProps {}

export function SettingsDialog({
  onClose,
  open,
}: SettingsDialogProps): JSX.Element {
  const [key, setChatGptApiKey] = useChatGptApiKeyState();

  const onUpdateClick: FormEventHandler = () => {
    const newKey = window.prompt("API key", key);
    if (newKey === null) {
      return;
    }

    if (newKey === "") {
      const ok = window.confirm(
        "Are you sure you want to delete the saved API key?"
      );
      if (!ok) {
        return;
      }
    }

    setChatGptApiKey(newKey);
  };

  return (
    <NiceDialog onClose={onClose} open={open} title="Settings">
      <form className="p-4" method="dialog">
        <p>
          API key:{" "}
          {key ? (
            <>****</>
          ) : (
            <span className="italic text-red-500">not set</span>
          )}
        </p>
        <NiceButton onClick={onUpdateClick}>Set API key...</NiceButton>
        <p>
          <NiceLink href="https://platform.openai.com/account/api-keys">
            Manage your API keys
          </NiceLink>
        </p>
      </form>
    </NiceDialog>
  );
}
