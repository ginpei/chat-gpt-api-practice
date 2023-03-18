import { FormEventHandler } from "react";
import { NiceButton } from "../../../domains/button/NiceButton";
import { NiceButtonLink } from "../../../domains/button/NiceButtonLink";
import { buildPromptText } from "../../../domains/chat/chatMessageManipulators";
import { DialogGroupHeading } from "../../../domains/dialog/DialogGroupHeading";
import {
  NiceDialog,
  NiceDialogCoreProps,
} from "../../../domains/dialog/NiceDialog";
import { VStack } from "../../../domains/layout/VStack";
import { NiceLink } from "../../../domains/link/NiceLink";
import { useUserAssetsContext } from "../../../domains/userAssets/UserAssetsContext";
import {
  UserSettingsValue,
  useUserSettings,
} from "../../../domains/userSettings/UserSettingsContext";
import { saveUserSettings } from "../../../domains/userSettings/userSettingsStore";
import { useClearChatHistoryAction } from "../chatHistoryManipulators";

export interface ToolsDialogProps extends NiceDialogCoreProps {}

export function ToolsDialog({ onClose, open }: ToolsDialogProps): JSX.Element {
  const [userSettings, setUserSettings] = useUserSettings();
  const [userAssets] = useUserAssetsContext();
  const clearHistoryClick = useClearChatHistoryAction();

  const onUpdateClick: FormEventHandler = () => {
    const newKey = window.prompt("API key", userSettings.apiKey);
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

    setUserSettings((v) => ({ ...v, apiKey: newKey }));
    saveUserSettings({ ...userSettings, apiKey: newKey });
  };

  const updateUserSettings = (newSettings: Partial<UserSettingsValue>) => {
    setUserSettings({ ...userSettings, ...newSettings });
    saveUserSettings({ ...userSettings, ...newSettings });
  };

  return (
    <NiceDialog onClose={onClose} open={open} title="🛠️ Tools">
      <form className="p-4" method="dialog">
        <VStack gap="gap-8">
          <article>
            <DialogGroupHeading>OpenAI API settings</DialogGroupHeading>
            <div className="flex justify-between items-center gap-4">
              API key:{" "}
              {userSettings.apiKey ? (
                "********"
              ) : (
                <span className="italic text-red-500">not set</span>
              )}
              <NiceButton onClick={onUpdateClick} type="button">
                ✏️
              </NiceButton>
            </div>
            {!userSettings.apiKey && (
              <p className="text-red-500">Please set up an API key first:</p>
            )}
            <p>
              <NiceLink
                href="https://platform.openai.com/account/api-keys"
                target="_blank"
              >
                Manage your API keys 🚀
              </NiceLink>
            </p>
          </article>
          <article>
            <DialogGroupHeading>Rendering</DialogGroupHeading>
            <p>
              <label>
                <input
                  checked={userSettings.renderMarkdown}
                  type="checkbox"
                  onChange={() =>
                    updateUserSettings({
                      renderMarkdown: !userSettings.renderMarkdown,
                    })
                  }
                />{" "}
                Render markdown format
              </label>
            </p>
          </article>
          <article>
            <DialogGroupHeading>History</DialogGroupHeading>
            <VStack>
              <NiceButton onClick={clearHistoryClick} type="button">
                🗑️ Clear history...
              </NiceButton>
              <NiceButtonLink
                download="chatHistory.txt"
                href={`data:text/plain,${buildPromptText(userAssets.messages)}`}
              >
                💾 Download
              </NiceButtonLink>
            </VStack>
          </article>
        </VStack>
      </form>
    </NiceDialog>
  );
}
