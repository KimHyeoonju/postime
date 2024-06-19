import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import "./calendarmodalstyle.css";
import { IoIosClose, IoMdClose } from "react-icons/io";
import { colorSystem } from "../../css/color";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { RiCheckboxBlankFill, RiCheckboxFill } from "react-icons/ri";
import axios from "axios";

const CalendarModifyModalStyle = styled.div`
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

  .modify-button {
    height: 27px;
    margin-top: 0px;
  }

  .modify-button:hover {
    height: 27px;
  }

  .calendar-color-palette {
    display: flex;
    flex-wrap: wrap;
    gap: 3px; /* 체크박스 간격 조정 */
    flex-direction: row; /* 체크박스를 가로로 배열 */
    justify-content: space-between; /* 양쪽 끝에 자리가 남지 않도록 설정 */
  }
`;

const CalendarCreateModal = ({ calendarCreateModalCancel }) => {
  /** 새로 작성한 캘린더 이름 */
  const [newCalendarName, setNewCalendarName] = useState();
  /** 새로 작성한 캘린더 색  */
  const [selectedColor, setSelectedColor] = useState();
  const [userId, setuserId] = useState(sessionStorage.getItem("userId"));
  // console.log("userId : ", userId);

  const modalRef = useRef(null);

  /** 선택한 색 저장 */
  const modifyCheckboxChange = color => {
    setSelectedColor(color);
  };

  /** 캘린더 정보 수정 내용 데이터를 서버로 보내는 로직 */
  const handleCreateButtonClick = async ({
    newCalendarName,
    selectedColor,
  }) => {
    const res = handleCreateEvent({
      newCalendarName,
      selectedColor,
    });

    // 캘린더 리스트 갱신
    if (res) {
      calendarCreateModalCancel(false);
    }
  };

  const handleCreateEvent = async ({ newCalendarName, selectedColor }) => {
    console.log("생성 userId : ", userId);
    console.log("생성 캘린더Name : ", newCalendarName);
    console.log("생성 캘린더Color : ", selectedColor);
    try {
      const resepons = await axios.post(`/api/calendar`, {
        signedUserId: userId,
        title: newCalendarName,
        color: selectedColor,
      });
      const status = resepons.status.toString().charAt(0);
      if (status === "2") {
        console.log("캘린더 정보 수정 성공");
        return true;
      } else {
        console.log("API 오류");
      }
      console.log(resepons.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderCheckbox = color => (
    <div onClick={() => modifyCheckboxChange(color)}>
      {selectedColor === color ? (
        <RiCheckboxFill color={color} size={30} />
      ) : (
        <RiCheckboxBlankFill color={color} size={30} />
      )}
    </div>
  );

  useEffect(() => {
    const handler = event => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        calendarCreateModalCancel(false);
      }
    };

    document.addEventListener("mousedown", handler);
    // document.addEventListener('touchstart', handler); // 모바일 대응

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", handler);
      // document.removeEventListener('touchstart', handler); // 모바일 대응
    };
  }, [calendarCreateModalCancel]);

  return (
    <CalendarModifyModalStyle>
      <div ref={modalRef} className="calendar-modal-wrap">
        <div className="calendar-modal-content">
          <div className="calendar-modal-header">
            <div>
              <h1 className="calendar-modal-title">캘린더 생성</h1>
            </div>
            <div
              className="calendar-modal-close-button"
              onClick={calendarCreateModalCancel}
            >
              <IoMdClose />
            </div>
          </div>

          <div className="calendar-modal-content-main">
            <div className="main-wrap">
              <div>
                <h2 className="calendar-modal-content-title">캘린더명</h2>
              </div>
              <div className="calendar-user-plus-div modify-btn-div">
                <input
                  id="calendar-user-plus-email"
                  value={newCalendarName}
                  onChange={e => setNewCalendarName(e.target.value)}
                />
                <div
                  className="modify-button"
                  onClick={e => {
                    handleCreateButtonClick({
                      newCalendarName,
                      selectedColor,
                    });
                  }}
                >
                  생성
                </div>
              </div>
              <div className="calendar-user-list calendar-color-palette">
                {renderCheckbox("#ABD5BD")}
                {renderCheckbox("#FF6B6B")}
                {renderCheckbox("#F06595")}
                {renderCheckbox("#CC5DE8")}
                {renderCheckbox("#845EF7")}
                {renderCheckbox("#339AF0")}
                {renderCheckbox("#51CF66")}
                {renderCheckbox("#FCC419")}
                {renderCheckbox("#FF922B")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CalendarModifyModalStyle>
  );
};

export default CalendarCreateModal;
