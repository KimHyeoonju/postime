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
    .calendar-modal-content {
      border: 1px solid ${colorSystem.g500};
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
  `;

  useEffect(() => {}, []);

  return (
    <DeleteCheckModalStyle>
      <div className="calendar-warning-modal-wrap">
        <div className="calendar-modal-content">
          <div className="calendar-modal-header">
            <div>
              <h1 className="calendar-modal-title">경고</h1>
            </div>
          </div>

          <div className="calendar-modal-content-main">
            <div className="main-wrap">
              <div>
                <h2 className="calendar-modal-content-title">참석자 초대</h2>
              </div>
              <div className="calendar-user-plus-div"></div>
              <div className="calendar-user-list">
                <div className="calendar-user-list-item pk-user-id">
                  <p>캘린더 소유자명</p>
                  <p className="user-option pk-user-option">캘린더 소유자</p>
                </div>

                {/* {calendarListUserArr.map((item, index) => {
                  return (
                    <div className="calendar-user-list-item" key={index}>
                      <p>{item.name}</p>
                    </div>
                  );
                })} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DeleteCheckModalStyle>
  );
};

export default DeleteCheckModal;
