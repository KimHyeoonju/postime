import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import "./calendarmodalstyle.css";
import AlarmModal from "./AlarmModal";

const CalendarModalStyle = styled.div``;

const CalendarModal = ({ calendarModalCancel }) => {
  // useRef()를 사용하여 modalRef 생성
  const modalRef = useRef(null);
  // 캘린더 공유 유저 리스트 배열
  const [calendarListUserArr, setCalendarListUserArr] = useState([]);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = event => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        calendarModalCancel(false);
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
  }, [calendarModalCancel]);

  return (
    <CalendarModalStyle>
      <div className="modal-wrap">
        <div className="modal-content">
          <header>
            <h1>title</h1>
          </header>
          <main>
            <p>text</p>
          </main>
          <footer>
            <button
              onClick={() => {
                // <testModel></testModel>
              }}
            >
              취소
            </button>
          </footer>
        </div>
      </div>
    </CalendarModalStyle>
  );
};

export default CalendarModal;
