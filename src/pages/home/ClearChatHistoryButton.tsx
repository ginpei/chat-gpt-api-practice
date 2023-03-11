import { NiceButton } from "../../domains/button/NiceButton";

export interface ClearChatHistoryButtonProps {
  onProceed: () => void;
}

export function ClearChatHistoryButton({
  onProceed,
}: ClearChatHistoryButtonProps): JSX.Element {
  const onClick = () => {
    const ok = window.confirm("Are you sure you want to remove all chat log?");
    if (!ok) {
      return;
    }
    onProceed();
  };

  return (
    <NiceButton onClick={onClick} type="button">
      🗑️ Clear history...
    </NiceButton>
  );
}
