import { FormEventHandler } from "react";
import { NiceButton } from "../../domains/button/NiceButton";
import { useChatHistoryContext } from "../../domains/chat/ChatHistoryContext";
import { saveChatLog } from "../../domains/chat/chatLogStore";
import { DialogGroupHeading } from "../../domains/dialog/DialogGroupHeading";
import {
  NiceDialog,
  NiceDialogCoreProps,
} from "../../domains/dialog/NiceDialog";
import { VStack } from "../../domains/layout/VStack";
import { NiceLink } from "../../domains/link/NiceLink";
import { useChatGptApiContext } from "../../domains/openai/chatGptApiContext";
import { saveChatGptApiKeyKey } from "../../domains/openai/chatGptApiKeyStore";

export interface ToolsDialogProps extends NiceDialogCoreProps {}

export function ToolsDialog({ onClose, open }: ToolsDialogProps): JSX.Element {
  const [apiContext, setApiContext] = useChatGptApiContext();
  const [history, setHistory] = useChatHistoryContext();

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

  const onClearHistoryClick = () => {
    const ok = window.confirm("Are you sure you want to remove all chat log?");
    if (!ok) {
      return;
    }
    saveChatLog([]);
    setHistory({ ...history, messages: [] });
  };

  return (
    <NiceDialog onClose={onClose} open={open} title="🛠️ Tools">
      <form className="p-4" method="dialog">
        <VStack gap="gap-8">
          <article>
            <DialogGroupHeading>OpenAI API settings</DialogGroupHeading>
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
          </article>
          <article>
            <DialogGroupHeading>History</DialogGroupHeading>
            <NiceButton onClick={onClearHistoryClick} type="button">
              🗑️ Clear history...
            </NiceButton>
          </article>
        </VStack>
      </form>
    </NiceDialog>
  );
}