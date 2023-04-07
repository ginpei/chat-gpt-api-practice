import { useState } from "react";
import { NiceButton } from "../../../domains/button/NiceButton";
import { ToolsDialog } from "./ToolsDialog";

export interface ToolsDialogButtonProps {
  initialOpen: boolean;
}

export function ToolsDialogButton({
  initialOpen: hasApiKey,
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
