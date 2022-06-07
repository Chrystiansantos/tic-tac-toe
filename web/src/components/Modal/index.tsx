import { ReactNode } from 'react';
import Modal from 'react-modal';

interface IModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
}

export function ModalComponent({ isOpen, closeModal, children }: IModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      {children}
    </Modal>
  );
}
