import styled from "@emotion/styled";
import React from "react";
import "./calendarmodalstyle.css";
import { IoIosClose, IoMdClose } from "react-icons/io";
import { colorSystem } from "../../css/color";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { RiCheckboxBlankFill, RiCheckboxFill } from "react-icons/ri";

const CalendarModigyModalStyle = styled.div`
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

  .modify-button:hover {
    height: 27px;
  }
`;

const CalendarModifyModal = ({
  calendarModifyModalOk,
  calendarModifyModalCancel,
}) => {
  const userId = sessionStorage.getItem("userCode");
  // 캘린더명 입력 > 캘린더명 수정
  // console.log("네?", userId);
  return (
    <CalendarModigyModalStyle>
      {/* {isDeleteCheckModal ? (
        <DeleteCheckModal
          showDeleteCheckModalCancel={showDeleteCheckModalCancel}
          showDeleteCheckModal={showDeleteCheckModal}
          deleteUeserId={deleteUeserId}
        />
      ) : null} */}

      <div className="calendar-modal-wrap">
        <div className="calendar-modal-content">
          <div className="calendar-modal-header">
            <div>
              <h1 className="calendar-modal-title">calenderId 캘린더 수정</h1>
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
                  onChange={e => {
                    // setUserEmail(e.target.value);
                    console.log("입력 확인", e.target.value);
                  }}
                  // 여기는 나중에 수정
                  placeholder={sessionStorage.getItem("calendarId")}
                ></input>
                <div
                  className="modify-button"
                  onClick={e => {
                    // calendarUserPlus({ userEmail, calenderId });
                  }}
                >
                  수정
                  {/* <FaSquarePlus IoIosClose size="28" color="#4F546E" /> */}
                </div>
              </div>
              <div className="calendar-user-list calendar-color-palette">
                {/* <div className="calendar-user-list-item pk-user-id">
                  <p>{userId}</p>
                  <p className="user-option pk-user-option">캘린더 소유자</p>
                </div> */}

                {/* {calendarListUserArr.map((item, index) => {
              console.log(item.name);
              return (
                <div className="calendar-user-list-item" key={index}>
                  <p>{item.name}</p>
                  <p
                    className="user-option"
                    onClick={
                      e => {
                        showDeleteCheckModal(item.userId);
                      }

                      // getdelectUserId(`${item.userId}`);
                    }
                  >
                    <IoIosClose />
                  </p>
                </div>
              );
            })} */}

                {/* map */}

                <div className="calendar-user-list-item calendar-color-palette">
                  {/* <p
                    className="user-option"
                    onClick={e => {
                      //   showDeleteCheckModal(e);
                    }}
                  > */}
                  <RiCheckboxBlankFill color="#ABD5BD" size={30} />
                  <RiCheckboxBlankFill color="#FF6B6B" size={30} />
                  <RiCheckboxBlankFill color="#F06595" size={30} />
                  <RiCheckboxBlankFill color="#CC5DE8" size={30} />
                  <RiCheckboxBlankFill color="#845EF7" size={30} />
                  <RiCheckboxBlankFill color="#339AF0" size={30} />
                  <RiCheckboxBlankFill color="#51CF66" size={30} />
                  <RiCheckboxBlankFill color="#FCC419" size={30} />
                  <RiCheckboxBlankFill color="#FF922B" size={30} />
                  <br />
                  {/* <RiCheckboxFill color="#ABD5BD" />
                    <RiCheckboxFill color="#FF6B6B" />
                    <RiCheckboxFill color="#F06595" />
                    <RiCheckboxFill color="#CC5DE8" />
                    <RiCheckboxFill color="#845EF7" />
                    <RiCheckboxFill color="#339AF0" />
                    <RiCheckboxFill color="#51CF66" />
                    <RiCheckboxFill color="#FCC419" />
                    <RiCheckboxFill color="#FF922B" /> */}
                  {/* </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CalendarModigyModalStyle>
  );
};

export default CalendarModifyModal;
