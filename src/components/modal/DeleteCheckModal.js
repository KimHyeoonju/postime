import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";
import "./calendarmodalstyle.css";
import { colorSystem } from "../../css/color";

const DeleteCheckModal = ({
  showDeleteCheckModalCancel,
  isDeleteCheckModal,
  calendarModalType,
}) => {
  const modalRef = useRef(null);

  const DeleteCheckModalStyle = styled.div`
    position: absolute;
    width: auto;

    /* .calendar-warning-modal-wrap {
      display: flex;
    } */
    .main-wrap {
      display: flex;
      flex-direction: column;
      position: relative;
    }
    .calendar-modal-content {
      border: 1px solid ${colorSystem.g500};
      max-width: 400px;
    }
    .calendar-modal-header {
      background-color: ${colorSystem.g900};
    }
    .calendar-modal-title {
      color: ${colorSystem.primaryB};
    }
    .calendar-modal-content-main {
      border-color: ${colorSystem.g500};
    }

    .calendar-modal-content-title {
      color: ${colorSystem.g500};
    }

    input[id="calendar-user-plus-email"] {
      border: 1px solid ${colorSystem.g700};
    }

    .pk-user-id {
      background-color: ${colorSystem.ModalPurple};
    }

    .calendar-user-list-item {
      border-bottom: 1px solid ${colorSystem.g800};
    }

    .calendar-button-box button:first-child {
      background-color: ${colorSystem.g900};
      border-color: ${colorSystem.MainPurple};
      color: ${colorSystem.primaryB};
    }
    .calendar-button-box button:last-child {
      color: ${colorSystem.primaryW};

      background-color: ${colorSystem.MainPurple};
    }
  `;

  useEffect(() => {}, []);

  //  수정하기
  const delectCalendarUser = () => {
    console.log("제거되었다.");
  };

  return (
    <DeleteCheckModalStyle>
      <div className="calendar-warning-modal-wrap">
        <div className="calendar-modal-content">
          <div className="calendar-modal-header">
            <div>
              <h1 className="calendar-modal-warning-msg">경고</h1>
            </div>
          </div>

          <div className="calendar-modal-content-main">
            <div className="main-wrap">
              <h2 className="calendar-modal-msg">
                정말 해당 유저를 제거 하시겠습니까?
              </h2>
              <div className="calendar-button-box">
                <button
                  type="button"
                  onClick={e => {
                    isDeleteCheckModal(e);
                  }}
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={e => {
                    delectCalendarUser();
                  }}
                >
                  제거
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DeleteCheckModalStyle>
  );
};

export default DeleteCheckModal;
