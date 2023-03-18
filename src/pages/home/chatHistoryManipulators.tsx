import { useCallback } from "react";
import { useUserAssetsContext } from "../../domains/chat/UserAssetsContext";
import { saveUserAssets } from "../../domains/chat/userAssetsStore";
import { createUserAssets } from "../../domains/chat/UserAssets";

export function useClearChatHistoryAction(): () => void {
  const [, setUserAssets] = useUserAssetsContext();

  const action = useCallback(() => {
    const ok = window.confirm("Are you sure you want to remove all chat log?");
    if (!ok) {
      return;
    }

    saveUserAssets(createUserAssets());
    setUserAssets(createUserAssets());
  }, [setUserAssets]);

  return action;
}
