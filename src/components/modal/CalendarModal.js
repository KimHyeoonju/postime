import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import "./calendarmodalstyle.css";
import { IoIosClose, IoMdClose } from "react-icons/io";
import { colorSystem } from "../../css/color";
import { CiSquarePlus } from "react-icons/ci";
import { FaSquarePlus } from "react-icons/fa6";
import axios from "axios";
import DeleteCheckModal from "./DeleteCheckModal";

const CalendarModalStyle = styled.div`
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

// setCalenderId, setModalType
const CalendarModal = ({
  calenderUserListModalOk,
  calenderName,
  calenderId,
  deleteUeserId,
}) => {
  const userId = sessionStorage.getItem("userId");
  const calendarId = sessionStorage.getItem("calendarId");

  // useRef()를 사용하여 modalRef 생성
  const modalRef = useRef(null);
  // 캘린더 공유 유저 리스트 배열
  const [calendarListUserArr, setCalendarListUserArr] = useState([]);
  const [userEmail, setUserEmail] = useState("asdqwe@naver.com");
  const [calendarModalType, setCalendarModalType] = useState(1);
  // 1: 삭제시 체크 모달

  // asdqwe@naver.com
  // console.log("유저캘린더", calenderId);

  // const [calenderId, setCalenderId] = useState(61);

  const getCalenderUserList = async calenderId => {
    try {
      const resepons = await axios.get(
        `/api/calendar/member?calendar_id=${calenderId}`,
      );
      const status = resepons.status.toString().charAt(0);
      // console.log("유저리스트", resepons.data.resultData);
      if (status === "2") {
        return resepons.data.resultData;
      } else {
        console.log("API 오류");
      }
      console.log(resepons.data);
    } catch (error) {
      console.log(error);
      // alert(error);
    }
  };

  const calenderUserList = async () => {
    const result = await getCalenderUserList(calenderId);
    console.log("유저 리스트 출력", result);
    setCalendarListUserArr(result);
  };

  useEffect(() => {
    calenderUserList();
  }, [calenderUserListModalOk]);

  const calendarUserPlus = async ({ userEmail, calenderId }) => {
    // console.log("입력된 이메일", userEmail);
    // console.log("캘린더 ID", calenderId);
    try {
      const resepons = await axios.post("/api/calendar/plus", {
        calendarId: calenderId,
        userEmail: userEmail,
      });
      const status = resepons.status.toString().charAt(0);
      if (status === "2") {
        console.log("유저 추가 성공");
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

  // const calendarUserPlusCheck = async ({userEmail, calendarId}){
  // 캘린더에 해당 이메일의 사용자가 추가되어 있는지 확인.
  // }

  // const getdelectUserId = async deleteUeserId => {
  //   // console.log("A", deleteUeserId);
  //   // console.log(calenderId);
  //   // console.log(userId);
  //   delectCalendarUser(userId, calenderId, deleteUeserId);
  // };

  // 수정;
  // const deleteUserButton = ({ deleteUeserId }) => {
  //   deleteUeserId(deleteUeserId);
  //   showDeleteCheckModal(false);
  // };

  const [isDeleteCheckModal, setIsDeleteCheckModal] = useState(false);
  const showDeleteCheckModal = async e => {
    setIsDeleteCheckModal(!isDeleteCheckModal);
    // 캘린더명
    // setCalenderId(e.target.id);
    // setIsDeleteCheckModal(false); // 이전 모달 창 닫기
  };
  const showDeleteCheckModalCancel = e => {
    setIsDeleteCheckModal(false);
  };

  return (
    <CalendarModalStyle>
      {isDeleteCheckModal ? (
        <DeleteCheckModal
          showDeleteCheckModalCancel={showDeleteCheckModalCancel}
          showDeleteCheckModal={showDeleteCheckModal}
          deleteUeserId={deleteUeserId}
        />
      ) : null}

      <div ref={modalRef} className="calendar-modal-wrap">
        <div className="calendar-modal-content">
          <div className="calendar-modal-header">
            <div>
              <h1 className="calendar-modal-title">calenderId 캘린더 참여자</h1>
            </div>
            <div
              className="calendar-modal-close-button"
              onClick={calenderUserListModalOk}
            >
              <IoMdClose />
            </div>
          </div>

          <div className="calendar-modal-content-main">
            <div className="main-wrap">
              <div>
                <h2 className="calendar-modal-content-title">참석자 초대</h2>
              </div>
              <div className="calendar-user-plus-div">
                <input
                  id="calendar-user-plus-email"
                  value={userEmail}
                  onChange={e => {
                    // setUserEmail(e);
                    setUserEmail(e.target.value);
                    console.log("입력 확인확인", e.target.value);
                  }}
                  placeholder="email@gmail.com"
                ></input>
                <div
                  className="plus-icon"
                  onClick={e => {
                    calendarUserPlus({ userEmail, calenderId });
                  }}
                >
                  <FaSquarePlus size="28" color="#4F546E" />
                </div>
              </div>
              <div className="calendar-user-list">
                <div className="calendar-user-list-item pk-user-id">
                  <p>{userId}</p>
                  <p className="user-option pk-user-option">캘린더 소유자</p>
                </div>

                {calendarListUserArr.map((item, index) => {
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
                })}

                {/* map */}

                <div className="calendar-user-list-item">
                  <p>멤버명</p>
                  <p
                    className="user-option"
                    onClick={e => {
                      showDeleteCheckModal(e);
                    }}
                  >
                    <IoIosClose />
                  </p>
                </div>
                <div className="calendar-user-list-item">
                  <p>멤버명</p>
                  <p>
                    <IoIosClose />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CalendarModalStyle>
  );
};

export default CalendarModal;
