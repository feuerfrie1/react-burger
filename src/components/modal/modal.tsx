import ReactDOM from "react-dom";
import { useEffect, ReactNode, JSX } from "react";
import styles from "../modal/modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal/modal-overlay/modal-overlay";

type TModalProps = {
  onClose: () => void;
  title?: string;
  children?: ReactNode;
};

export default function Modal({
  onClose,
  title,
  children,
}: TModalProps): JSX.Element {
  const modalRoot = document.getElementById("modal");
  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      return event.key === "Escape" && onClose();
    }
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return ReactDOM.createPortal(
    <section className={styles.modal}>
      <div className={styles.modal__content}>
        <header className={styles.modal__header}>
          <h2 className={styles.modal__header_text}>{title}</h2>
          <div className={styles.modal__header_close}>
            <CloseIcon type="primary" onClick={onClose} />
          </div>
        </header>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </section>,
    modalRoot!
  );
}
