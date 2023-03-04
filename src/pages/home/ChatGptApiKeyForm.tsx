import { FormEventHandler, useState } from "react";
import { useChatGptApiKey as useChatGptApiKeyState } from "../../domains/chatGptApiKey/chatGptApiKeyHooks";
import { saveChatGptApiKeyKey } from "../../domains/chatGptApiKey/chatGptApiKeyStore";

export interface ChatGptApiKeyFormProps {}

export function ChatGptApiKeyForm({}: ChatGptApiKeyFormProps): JSX.Element {
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
    <div className="ChatGptApiKeyForm border">
      <p>
        API key:{" "}
        {key ? <>****</> : <span className="italic text-red-500">not set</span>}
      </p>
      <button className="border" onClick={onUpdateClick}>
        Set API key...
      </button>
    </div>
  );
}
