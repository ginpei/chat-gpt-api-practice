import { ComponentPropsWithoutRef, RefObject, useEffect, useRef } from "react";

export interface SendOptionPopupProps {
  hoverOn: RefObject<HTMLElement | null>;
  onClose: SendOptionCloseHandler;
  open: boolean;
}

export type SendOptionCloseHandler = (
  type: "text" | "system" | "image" | undefined
) => void;

export function SendOptionPopup({
  hoverOn,
  onClose,
  open,
}: SendOptionPopupProps): JSX.Element {
  const refDialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const elTarget = hoverOn.current;
    const elDialog = refDialog.current;
    if (!elTarget || !elDialog) {
      return;
    }

    if (open && !elDialog.open) {
      elDialog.showModal();
    } else if (!open && elDialog.open) {
      elDialog.close();
    }
  }, [hoverOn, open]);

  const onDialogClose = () => {
    onClose(undefined);
  };

  return (
    <dialog
      className="SendOptionPopup p-0"
      onClose={onDialogClose}
      ref={refDialog}
    >
      <div className="flex flex-col">
        <MenuItem onClick={() => onClose("text")}>📝 Send text chat</MenuItem>
        <MenuItem disabled onClick={() => onClose("system")}>
          🖥️ Send system description
        </MenuItem>
        <MenuItem disabled onClick={() => onClose("image")}>
          🖼️ Request image
        </MenuItem>
        <MenuItem onClick={() => onClose(undefined)}>
          <small>Cancel</small>
        </MenuItem>
      </div>
    </dialog>
  );
}

type MenuItemProps = ComponentPropsWithoutRef<"button">;

function MenuItem(props: MenuItemProps): JSX.Element {
  return (
    <button
      className="
        MenuItem
        p-4 text-start
        hover:bg-gray-50
        focus:bg-gray-50
        active:bg-gray-100
        disabled:text-gray-400 disabled:grayscale
      "
      {...props}
    />
  );
}
