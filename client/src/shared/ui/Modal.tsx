import { useEffect, useRef, type ReactNode } from "react";
import { CloseIcon } from "./icons";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** Accessible name of the dialog. */
  label: string;
  children: ReactNode;
  className?: string;
}

/**
 * Built on the native <dialog> element, which provides focus trapping, Escape
 * to close and an inert background without extra libraries.
 */
export function Modal({ open, onClose, label, children, className = "" }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal?.();
    if (!open && dialog.open) dialog.close?.();
  }, [open]);

  if (!open) return null;

  return (
    // Backdrop clicks close the dialog; keyboard users close it with Escape (native) or the Close button.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <dialog
      ref={dialogRef}
      aria-label={label}
      onClose={onClose}
      onCancel={onClose}
      // A click on the backdrop lands on the <dialog> itself, not its content.
      onClick={(event) => event.target === event.currentTarget && onClose()}
      className={`w-[calc(100%-2rem)] max-w-4xl rounded-xl bg-white p-0 text-gray-900 shadow-2xl backdrop:bg-black/70 dark:bg-night-raised dark:text-white ${className}`}
    >
      <div className="relative">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-2 top-2 z-10 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80"
        >
          <CloseIcon width={20} height={20} />
        </button>
        {children}
      </div>
    </dialog>
  );
}
