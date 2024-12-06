import React from 'react';
import Modal from 'react-modal'

interface ModalConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalConfirmation: React.FC<ModalConfirmationProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal" overlayClassName="overlay">
      <div className="modal-content">
        <h2>Participantes añadidos</h2>
        <p>¡Los datos se han enviado correctamente!</p>
        <button onClick={onClose} className="btn-close">
          Cerrar
        </button>
      </div>
    </Modal>
  );
};

export default ModalConfirmation;
