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
  selectCalenderId,
  selectCalenderName,
}) => {
  const userId = sessionStorage.getItem("userId");
  const calendarId = sessionStorage.getItem("calendarId");

  // useRef()를 사용하여 modalRef 생성
  const modalRef = useRef(null);
  // 캘린더 공유 유저 리스트 배열
  const [calendarListUserArr, setCalendarListUserArr] = useState([]);
  // const [userEmail, setUserEmail] = useState("asdqwe@naver.com");
  const [userEmail, setUserEmail] = useState();
  const [calendarModalType, setCalendarModalType] = useState(1);

  /** 삭제할 유저 ID */
  const [deleteUeserId, setDeleteUeserId] = useState("");

  const getCalenderUserList = async selectCalenderId => {
    try {
      const resepons = await axios.get(
        `/api/calendar/member?calendar_id=${selectCalenderId}`,
      );
      const status = resepons.status.toString().charAt(0);
      // console.log("유저리스트", resepons.data.resultData);
      if (status === "2") {
        console.log("유저 리스트 정상 GET");
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

  // 공유 멤버 리스트 갱신처리
  // useEffect(() => {}, []);

  // const calenderUserList = async selectCalenderId => {
  //   const result = await getCalenderUserList(selectCalenderId);
  //   // console.log("유저 리스트 출력", result);
  //   setCalendarListUserArr(result);
  // };

  /** 최초 렌더링 시, 공유 멤버 리스트 GET */
  const firstCalenderUserList = async selectCalenderId => {
    const result = await getCalenderUserList(selectCalenderId);
    // console.log("유저 리스트 출력", result);
    setCalendarListUserArr(result);
  };

  /** 최초 렌더링 */
  useEffect(() => {
    firstCalenderUserList(selectCalenderId);
  }, [calenderUserListModalOk]);

  const calendarUserPlus = async ({ userEmail, selectCalenderId }) => {
    console.log("입력된 이메일 : ", userEmail);
    console.log("캘린더 ID : ", selectCalenderId);
    try {
      const resepons = await axios.post("/api/calendar/plus", {
        calendarId: selectCalenderId,
        userEmail: userEmail,
      });
      const status = resepons.status.toString().charAt(0);
      if (status === "2") {
        console.log("유저 추가 성공 : ", resepons);
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
    console.log("삭제할 유저 ID : ", e);
    setDeleteUeserId(e);
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
          selectCalenderId={selectCalenderId}
        />
      ) : null}

      <div ref={modalRef} className="calendar-modal-wrap">
        <div className="calendar-modal-content">
          <div className="calendar-modal-header">
            <div>
              {/* <h1 className="calendar-modal-title">calenderId 캘린더 참여자</h1> */}
              <h1 className="calendar-modal-title">
                {selectCalenderName} 캘린더 참여자
              </h1>
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
                  // value={userEmail}
                  onChange={e => {
                    setUserEmail(e.target.value);
                    // console.log("입력 확인확인", e.target.value);
                  }}
                  placeholder="email@gmail.com"
                ></input>
                <div
                  className="plus-icon"
                  onClick={e => {
                    // console.log({ selectCalenderId });
                    calendarUserPlus({ userEmail, selectCalenderId });
                  }}
                >
                  <FaSquarePlus size="28" color="#4F546E" />
                </div>
              </div>
              <div className="calendar-user-list">
                <div className="calendar-user-list-item pk-user-id">
                  {/* 세션에서 받아오는 걸로 수정 */}
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

                {/* <div className="calendar-user-list-item">
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
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CalendarModalStyle>
  );
};

export default CalendarModal;
