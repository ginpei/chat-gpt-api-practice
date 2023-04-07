import { useState } from "react";
import { NiceButton } from "../../../domains/button/NiceButton";
import { ToolsDialog } from "./ToolsDialog";

export interface ToolsDialogButtonProps {
  hasApiKey: boolean;
}

export function ToolsDialogButton({
  hasApiKey,
}: ToolsDialogButtonProps): JSX.Element {
  const [toolsDialogOpen, setToolsDialogOpen] = useState(hasApiKey);

  const onToolsClick = () => {
    setToolsDialogOpen(true);
  };

  const onToolsDialogClose = () => {
    setToolsDialogOpen(false);
  };

  return (
    <>
      <NiceButton onClick={onToolsClick}>🛠️ Tools...</NiceButton>
      <ToolsDialog onClose={onToolsDialogClose} open={toolsDialogOpen} />
    </>
  );
}
