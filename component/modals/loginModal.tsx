import { forwardRef, useEffect } from "react";

// import { XIcon } from "@/public/svgIcons/xIcon";

interface DialogProp {
  title: string;
  handleOpenModal: () => void;
  children: React.ReactNode;
}

export const Modal = forwardRef<HTMLDialogElement | null, DialogProp>(
  ({ title, children }, ref) => {
    const handleCloseModal = () => {
      if (ref && typeof ref !== "function") {
        ref.current?.close();
      }
    };

    return (
      <dialog ref={ref} className="dialog-wrapper rounded-xl p-6">
        <div className="dialog_header">
          <h3>{title}</h3>
          <button onClick={handleCloseModal} autoFocus aria-label="close-button" type="button">
            <span>{/* <XIcon /> */}close</span>
          </button>
        </div>
        {children}
        {/* <button onClick={handleCloseModal} autoFocus>
          Close
        </button> */}
      </dialog>
    );
  }
);
