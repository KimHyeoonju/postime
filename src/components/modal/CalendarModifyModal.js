import styled from "@emotion/styled";
import React, { useState } from "react";
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

const CalendarModifyModal = ({
  selectCalenderColor,
  // setSelectCalenderColor,
  selectCalenderName,
  // setSelectCalenderName,
  selectCalenderId,
  // calendarModifyModalOk,
  calendarModifyModalCancel,
  handleCheckboxChange,
  setCheckCalendarColorChange,
}) => {
  // console.log("color : ", selectCalenderColor);
  // console.log("name : ", selectCalenderName);
  // console.log("id : ", selectCalenderId);

  // 아래를 비활성화
  // calendarModifyModalCancel : 모달 창을 닫기 위한 값
  // const [calendarId, setCalendarId] = useState(1); // 서버 연결을 할 수 없을 때 : 디폴트 값(나중에 삭제 또는 주석처리)
  // const [defaultColor, setDefaultColor] = useState("#845EF7"); // 기존 캘린더의 색. 서버 연결을 할 수 없을 때 : 디폴트 값(나중에 삭제 또는 주석처리)
  // const [newCalendarColor, setNewCalendarColor] = useState("#845EF7"); // 새로운 또는 유지되는 서버에 보낼 캘린더의 색. 서버 연결을 할 수 없을 때 : 디폴트 값(나중에 삭제 또는 주석처리)
  // const [newCalendarName, setNewCalendarName] = useState();

  // 아래를 활성화
  /** 기존 캘린더 이름, 새로 작성한 캘린더 이름 */
  const [newCalendarName, setNewCalendarName] = useState(selectCalenderName);
  // const [selectedColor, setSelectedColor] = useState(defaultColor);
  /** 기존 캘린더 색, 새로 작성한 캘린더 색  */
  const [selectedColor, setSelectedColor] = useState(selectCalenderColor);

  const modifyCheckboxChange = color => {
    setSelectedColor(color);
  };

  const getCalenderList = async userId => {
    // console.log(userId);
    try {
      const resepons = await axios.get(
        `/api/calendar?signed_user_id=${userId}`,
      );
      const status = resepons.status.toString().charAt(0);
      // console.log("sp", resepons.data.resultData);
      if (status === "2") {
        return resepons.data;
      } else {
        console.log("API 오류");
      }
      console.log(resepons.data);
    } catch (error) {
      console.log(error);
      // alert(error);
    }
  };

  /** 캘린더 정보 수정 내용 데이터를 서버로 보내는 로직 */
  const handleModifyButtonClick = async ({
    selectCalenderId,
    newCalendarName,
    selectedColor,
  }) => {
    const res = handleModifyEvent({
      selectCalenderId,
      newCalendarName,
      selectedColor,
    });

    if (res) {
      console.log("Id", selectCalenderId);
      handleCheckboxChange(selectCalenderId);
      setCheckCalendarColorChange(selectCalenderId);
    }
  };

  const handleModifyEvent = async ({
    selectCalenderId,
    newCalendarName,
    selectedColor,
  }) => {
    console.log("전달 캘린더ID : ", selectCalenderId);
    console.log("전달 캘린더Name : ", newCalendarName);
    console.log("전달 캘린더Color : ", selectedColor);
    try {
      const resepons = await axios.put(`/api/calendar`, {
        calendarId: selectCalenderId,
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

  return (
    <CalendarModifyModalStyle>
      <div className="calendar-modal-wrap">
        <div className="calendar-modal-content">
          <div className="calendar-modal-header">
            <div>
              <h1 className="calendar-modal-title">
                {selectCalenderId} 캘린더 수정
              </h1>
            </div>
            <div
              className="calendar-modal-close-button"
              onClick={calendarModifyModalCancel}
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
                    handleModifyButtonClick({
                      selectCalenderId,
                      newCalendarName,
                      selectedColor,
                    });
                  }}
                >
                  수정
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

export default CalendarModifyModal;
