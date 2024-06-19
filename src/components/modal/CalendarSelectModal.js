import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { colorSystem } from "../../css/color";
import CalendarModal from "./CalendarModal";
import "./calendarselectmodalstyle.css";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

const CalendarSelectModalStyle = styled.div`
  z-index: 9999999;
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
  selectCalenderId,
  selectCalenderName,
  calendarSelectModalCancel,
  setModalType,
}) => {
  const modalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = event => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        calendarSelectModalCancel(false);
      }
    };

    const handleResize = () => {
      calendarSelectModalCancel(false);
    };

    document.addEventListener("mousedown", handler);
    // document.addEventListener('touchstart', handler); // 모바일 대응
    window.addEventListener("resize", handleResize);

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", handler);
      // document.removeEventListener('touchstart', handler); // 모바일 대응
      window.removeEventListener("resize", handleResize);
    };
  }, [calendarSelectModalCancel]);

  const shareSelection = e => {
    // 공유

    setModalType(1);
  };

  const editSelection = e => {
    // 수정
    setModalType(2);
  };

  const insertModalOpen = e => {
    console.log("selectCalenderId : ", selectCalenderId);
    console.log("selectCalenderName : ", selectCalenderName);

    navigate("/write/create", {
      state: {
        calendarId: selectCalenderId,
        calendarName: selectCalenderName,
      },
    });
    // navigate(0);
    // window.location.replace("/write/create");
    calendarSelectModalCancel(false);
  };

  // useEffect(() => {
  //   insertModalOpen();
  // }, [selectCalenderId]);

  return (
    <CalendarSelectModalStyle>
      <div ref={modalRef} className="calendar-select-modal-wrap">
        <div className="calendar-select-modal-content">
          <div
            className="calendar-select-item"
            onClick={e => {
              shareSelection(e);
            }}
          >
            공유
          </div>
          <div
            className="calendar-select-item"
            onClick={e => {
              editSelection(e);
            }}
          >
            수정
          </div>
          <div
            className="calendar-select-item"
            onClick={e => {
              insertModalOpen({ selectCalenderName, selectCalenderId });
            }}
          >
            일정 등록
          </div>
        </div>
      </div>
    </CalendarSelectModalStyle>
  );
};

export default CalendarSelectModal;
