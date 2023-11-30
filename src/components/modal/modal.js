import ReactDOM from "react-dom";
import { useEffect } from "react";
import styles from "../modal/modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal/modal-overlay/modal-overlay";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("modal");

const Modal = ({ onClose, title, children }) => {
  useEffect(() => {
    function handleKeyPress(event) {
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
            <CloseIcon
              className={styles.modal__header_close}
              htmlType="button"
              type="primary"
              onClick={onClose}
            />
          </div>
        </header>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </section>,

    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
};

export default Modal;
