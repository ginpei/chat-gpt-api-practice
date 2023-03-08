import { FormEventHandler } from "react";
import { NiceButton } from "../../domains/button/NiceButton";
import {
  NiceDialog,
  NiceDialogCoreProps,
} from "../../domains/dialog/NiceDialog";
import { NiceLink } from "../../domains/link/NiceLink";
import { useChatGptApiContext } from "../../domains/openai/chatGptApiContext";
import { saveChatGptApiKeyKey } from "../../domains/openai/chatGptApiKeyStore";

export interface SettingsDialogProps extends NiceDialogCoreProps {}

export function SettingsDialog({
  onClose,
  open,
}: SettingsDialogProps): JSX.Element {
  const [apiContext, setApiContext] = useChatGptApiContext();

  const onUpdateClick: FormEventHandler = () => {
    const newKey = window.prompt("API key", apiContext.apiKey);
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

    setApiContext((v) => ({ ...v, apiKey: newKey }));
    saveChatGptApiKeyKey(newKey);
  };

  return (
    <NiceDialog onClose={onClose} open={open} title="Settings">
      <form className="p-4" method="dialog">
        <div className="flex justify-between items-center gap-4">
          API key:{" "}
          {apiContext.apiKey ? (
            "********"
          ) : (
            <span className="italic text-red-500">not set</span>
          )}
          <NiceButton onClick={onUpdateClick} type="button">
            ✏️
          </NiceButton>
        </div>
        <p>
          <NiceLink
            href="https://platform.openai.com/account/api-keys"
            target="_blank"
          >
            Manage your API keys 🚀
          </NiceLink>
        </p>
      </form>
    </NiceDialog>
  );
}
