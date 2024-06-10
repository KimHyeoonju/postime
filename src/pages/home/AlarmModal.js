import React, { useState } from "react";
import Modal from "../../components/Modal";
import ShowAlarmModal from "./ShowAlarmModal";

const AlarmModal = ({ data }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  return (
    <div>
      <button onClick={showModal}>모달 띄우기</button>
      {modalOpen && <ShowAlarmModal setModalOpen={setModalOpen} />}
    </div>
  );
};

export default AlarmModal;
