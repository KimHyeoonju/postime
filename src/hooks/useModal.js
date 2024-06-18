import { useState } from "react";

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);
  const [movePageAction, setMovePageAction] = useState(null);

  const openModal = ({ title, message, onConfirm, onDetail }) => {
    setModalTitle(title);
    setModalMessage(message);
    setConfirmAction(() => onConfirm);
    setMovePageAction(() => onDetail);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    modalTitle,
    modalMessage,
    confirmAction,
    movePageAction,
    openModal,
    closeModal,
  };
};

export default useModal;
