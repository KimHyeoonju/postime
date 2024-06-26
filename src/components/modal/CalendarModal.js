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
  selectCalenderMtUserId,
  selectCalenderMtUserName,
  calenderListArr,
  modalType,
}) => {
  // const userId = sessionStorage.getItem("userId");

  // const userName = sessionStorage.getItem("name");

  // useRef()를 사용하여 modalRef 생성
  const modalRef = useRef(null);
  // 캘린더 공유 유저 리스트 배열
  const [calendarListUserArr, setCalendarListUserArr] = useState([]);
  const [userEmail, setUserEmail] = useState();
  const [calendarModalType, setCalendarModalType] = useState(1);

  // 유저 삭제, 추가에 따른 유저 리스트 갱신을 위한
  const [userListUpdate, setUserListUpdate] = useState(false);

  /** 삭제할 유저 ID */
  const [deleteUeserId, setDeleteUeserId] = useState("");

  const getCalenderUserList = async (
    selectCalenderId,
    selectCalenderMtUserId,
  ) => {
    try {
      const resepons = await axios.get(
        `/api/calendar/member?calendar_id=${selectCalenderId}&owner_user_id=${selectCalenderMtUserId} `,
      );
      const status = resepons.status.toString().charAt(0);
      if (status === "2") {
        console.log("유저 리스트 정상 GET");
        console.log("유저 리스트 정상 GET : ", resepons);
        return resepons.data.resultData;
      } else {
        console.log("API 오류");
      }
      console.log(resepons.data);
    } catch (error) {
      console.log(error);
    }
  };

  /** 유저 추가, 삭제 시 리스트 실시간 갱신 */
  useEffect(() => {
    firstCalenderUserList(selectCalenderId);
    setUserListUpdate(false);
  }, [userListUpdate]);

  /** 최초 렌더링 시, 공유 멤버 리스트 GET */
  const firstCalenderUserList = async selectCalenderId => {
    const result = await getCalenderUserList(
      selectCalenderId,
      selectCalenderMtUserId,
    );

    setCalendarListUserArr(result);
  };

  /** 최초 렌더링 */
  useEffect(() => {
    firstCalenderUserList(selectCalenderId);
  }, [calenderUserListModalOk]);

  const calendarUserPlus = async ({ userEmail, selectCalenderId }) => {
    try {
      const resepons = await axios.post("/api/calendar/plus", {
        calendarId: selectCalenderId,
        userEmail: userEmail,
      });
      const status = resepons.status.toString().charAt(0);
      if (status === "2") {
        console.log("유저 추가 성공 : ", resepons);
        return setUserListUpdate(true);
      } else {
        console.log("API 오류");
      }
      console.log(resepons.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [isDeleteCheckModal, setIsDeleteCheckModal] = useState(false);
  const showDeleteCheckModal = async userId => {
    setDeleteUeserId(userId);
    setIsDeleteCheckModal(!isDeleteCheckModal);
  };
  const showDeleteCheckModalCancel = e => {
    setIsDeleteCheckModal(false);
  };

  // useEffect(() => {
  //   const handler = event => {
  //     // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
  //     if (modalRef.current && !modalRef.current.contains(event.target)) {
  //       showDeleteCheckModalCancel(false);
  //       calenderUserListModalOk();
  //     }
  //   };

  //   const handleResize = () => {
  //     showDeleteCheckModalCancel(false);
  //     calenderUserListModalOk();
  //   };

  //   document.addEventListener("mousedown", handler);
  //   // document.addEventListener('touchstart', handler); // 모바일 대응

  //   return () => {
  //     // 이벤트 핸들러 해제
  //     document.removeEventListener("mousedown", handler);
  //     // document.removeEventListener('touchstart', handler); // 모바일 대응
  //   };
  // }, [showDeleteCheckModalCancel]);

  console.log("확인 : ", calendarListUserArr);
  return (
    <CalendarModalStyle>
      {isDeleteCheckModal ? (
        <DeleteCheckModal
          showDeleteCheckModalCancel={showDeleteCheckModalCancel}
          showDeleteCheckModal={showDeleteCheckModal}
          deleteUeserId={deleteUeserId}
          selectCalenderId={selectCalenderId}
          getCalenderUserList={getCalenderUserList}
          setUserListUpdate={setUserListUpdate}
          userListUpdate={userListUpdate}
          selectCalenderMtUserId={selectCalenderMtUserId}
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
                  <p>{selectCalenderMtUserName}</p>
                  <p className="user-option pk-user-option">캘린더 소유자</p>
                </div>

                {/* <div className="calendar-user-list-item">asdf</div>
                <div className="calendar-user-list-item">asdf</div>
                <div className="calendar-user-list-item">asdf</div>
                <div className="calendar-user-list-item">asdf</div>
                <div className="calendar-user-list-item">asdf</div>
                <div className="calendar-user-list-item">asdf</div>
                <div className="calendar-user-list-item">asdf</div>
                <div className="calendar-user-list-item">asdf</div>
                <div className="calendar-user-list-item">asdf</div> */}

                {/* 캘린더 참여자 */}
                {calendarListUserArr.map((item, index) => {
                  return (
                    <div className="calendar-user-list-item" key={index}>
                      <p>{item.name}</p>
                      {selectCalenderMtUserId == selectCalenderId ? null : (
                        <p
                          className="user-option"
                          onClick={
                            e => {
                              showDeleteCheckModal(item.userId);
                              // console.log("한번 확인해보자", item.userId);
                            }
                            // getdelectUserId(`${item.userId}`);
                          }
                        >
                          <IoIosClose />
                        </p>
                      )}
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
