import { useState } from "react";

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);
  const [progressAction, setProgressAction] = useState(null);

  const openModal = ({ title, message, onConfirm, onProgress }) => {
    setModalTitle(title);
    setModalMessage(message);
    setConfirmAction(() => onConfirm);
    setProgressAction(() => onProgress);
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
    progressAction,
    openModal,
    closeModal,
  };
};

export default useModal;
