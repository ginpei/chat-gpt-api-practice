import { FormEventHandler } from "react";
import { NiceButton } from "../../domains/button/NiceButton";
import { NiceButtonLink } from "../../domains/button/NiceButtonLink";
import { useChatHistoryContext } from "../../domains/chat/ChatHistoryContext";
import { buildPromptText } from "../../domains/chat/chatMessageManipulators";
import { DialogGroupHeading } from "../../domains/dialog/DialogGroupHeading";
import {
  NiceDialog,
  NiceDialogCoreProps,
} from "../../domains/dialog/NiceDialog";
import { VStack } from "../../domains/layout/VStack";
import { NiceLink } from "../../domains/link/NiceLink";
import { useChatGptApiContext } from "../../domains/openai/chatGptApiContext";
import { saveChatGptApiKeyKey } from "../../domains/openai/chatGptApiKeyStore";
import { useClearChatHistoryAction } from "./chatHistoryManipulators";

export interface ToolsDialogProps extends NiceDialogCoreProps {}

export function ToolsDialog({ onClose, open }: ToolsDialogProps): JSX.Element {
  const [apiContext, setApiContext] = useChatGptApiContext();
  const [history] = useChatHistoryContext();
  const clearHistoryClick = useClearChatHistoryAction();

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
            {!apiContext.apiKey && (
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
            <DialogGroupHeading>History</DialogGroupHeading>
            <VStack>
              <NiceButton onClick={clearHistoryClick} type="button">
                🗑️ Clear history...
              </NiceButton>
              <NiceButtonLink
                download="chatHistory.txt"
                href={`data:text/plain,${buildPromptText(history.messages)}`}
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
