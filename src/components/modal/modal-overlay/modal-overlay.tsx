import styles from "../modal-overlay/modal-overlay.module.css";

type TModalOverlayProps = {
  onClose: () => void;
};

export default function ModalOverlay({
  onClose,
}: TModalOverlayProps): JSX.Element {
  return <div className={styles.modal__overlay} onClick={onClose}></div>;
}
