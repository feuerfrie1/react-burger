import styles from "../modal-overlay/modal-overlay.module.css";

const ModalOverlay = ({ onClose }) => {
  return <div className={styles.modal__overlay} onClick={onClose}></div>;
};

export default ModalOverlay;
