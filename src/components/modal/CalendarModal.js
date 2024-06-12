import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import "./calendarmodalstyle.css";
import { IoIosClose, IoMdClose } from "react-icons/io";
import { colorSystem } from "../../css/color";
import { CiSquarePlus } from "react-icons/ci";

const CalendarModalStyle = styled.div`
  .calendar-modal-content {
    border: 1px solid ${colorSystem.g500};
  }
  .calendar-modal-content header {
    background-color: ${colorSystem.g900};
  }
  .calendar-modal-title {
    color: ${colorSystem.primaryB};
  }
  .calendar-modal-content main {
    border-color: ${colorSystem.g500};
  }

  .calendar-modal-content-title {
    color: ${colorSystem.g500};
  }
`;

const CalendarModal = ({ calenderUserListModalOk, calenderId }) => {
  // useRef()를 사용하여 modalRef 생성
  const modalRef = useRef(null);
  // 캘린더 공유 유저 리스트 배열
  const [calendarListUserArr, setCalendarListUserArr] = useState([]);

  console.log("유저캘린더", calenderId);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = event => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        calenderUserListModalOk(false);
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
  }, [calenderUserListModalOk]);

  return (
    <CalendarModalStyle>
      <div ref={modalRef} className="calendar-modal-wrap">
        <div className="calendar-modal-content">
          <header>
            <div className="calendar-modal-header">
              <h1 className="calendar-modal-title">{calenderId} 참여자</h1>
            </div>
            <div
              className="calendar-modal-close-button"
              onClick={calenderUserListModalOk}
            >
              <IoMdClose />
            </div>
          </header>

          <main>
            <div className="main-wrap">
              <div>
                <h2 className="calendar-modal-content-title">참석자 초대</h2>
              </div>
              <div className="calendar-user-plus-div">
                <input></input>
                <div>
                  <CiSquarePlus />
                </div>
              </div>
              <div>
                <div>
                  <p>캘린더 소유자명 = 유저id명</p>
                  <p>캘린더 소유자</p>
                </div>
                {/* 반복문 */}
                <div>
                  <p>멤버명</p>
                  <p>
                    <IoIosClose />
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </CalendarModalStyle>
  );
};

export default CalendarModal;
