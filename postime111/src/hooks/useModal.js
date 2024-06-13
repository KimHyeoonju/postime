import { useState } from "react";

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);

  const openModal = ({ title, message, onConfirm }) => {
    setModalTitle(title);
    setModalMessage(message);
    setConfirmAction(() => onConfirm);
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
    openModal,
    closeModal,
  };
};

export default useModal;
