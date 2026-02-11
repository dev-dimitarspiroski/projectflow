import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

type Props = {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const modalRoot = document.getElementById("modal-root");

const Modal = ({ title, isOpen, onClose, children }: Props) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    dialogRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  if (!modalRoot) return null;

  return createPortal(
    <div
      role="presentation"
      className={styles.backdrop}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        ref={dialogRef}
        className={styles.dialog}
      >
        {title && (
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className={styles.closeBtn}
            >
              ✕
            </button>
          </div>
        )}

        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    modalRoot,
  );
};

export default Modal;
