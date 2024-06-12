import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { colorSystem } from "../../css/color";
import CalendarModal from "./CalendarModal";
import "./calendarselectmodalstyle.css";

const CalendarSelectModalStyle = styled.div`
  .calendar-select-modal-content {
    border: 1px solid ${colorSystem.g800};
  }

  .calendar-select-item {
    background-color: ${colorSystem.primaryW};
    border-bottom: 1px solid ${colorSystem.g800};
  }

  .calendar-select-item:last-child {
    border: 0;
  }

  .calendar-select-item:hover {
    background-color: ${colorSystem.newAlarmC};
  }
`;

const CalendarSelectModal = ({
  calendarSelectModalCancel,
  calenderUserListModalOk,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = event => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        calendarSelectModalCancel(false);
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener("mousedown", handler);
    // document.addEventListener('touchstart', handler); // 모바일 대응

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", handler);
      // document.removeEventListener('touchstart', handler); // 모바일 대응
    };
  }, [calendarSelectModalCancel]);

  return (
    <CalendarSelectModalStyle>
      <div ref={modalRef} className="calendar-select-modal-wrap">
        <div className="calendar-select-modal-content">
          <div
            className="calendar-select-item"
            onClick={calenderUserListModalOk}
          >
            공유
          </div>
          <div className="calendar-select-item">수정</div>
        </div>
      </div>
    </CalendarSelectModalStyle>
  );
};

export default CalendarSelectModal;
