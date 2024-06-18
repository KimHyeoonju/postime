import styled from "@emotion/styled";
import { useState } from "react";
import { colorSystem } from "../../css/color";
import "./calendarmodalstyle.css";
import axios from "axios";

const DeleteCheckModalStyle = styled.div`
  position: absolute;
  width: auto;

  /* .calendar-warning-modal-wrap {
  display: flex;
} */
  .main-wrap {
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .calendar-modal-content {
    border: 1px solid ${colorSystem.g500};
    max-width: 400px;
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

  .calendar-button-box button:first-of-type {
    background-color: ${colorSystem.g900};
    border-color: ${colorSystem.MainPurple};
    color: ${colorSystem.primaryB};
  }
  .calendar-button-box button:last-child {
    color: ${colorSystem.primaryW};

    background-color: ${colorSystem.MainPurple};
  }
`;

const DeleteCheckModal = ({
  showDeleteCheckModal,
  deleteUeserId,
  selectCalenderId,
  showDeleteCheckModalCancel,
  getCalenderUserList,
  setUserListUpdate,
}) => {
  // const DeleteCheckModal = ({ showDeleteCheckModal }) => {
  const [deleteCheck, setDeleteCheck] = useState(false);
  const [userId, setUserId] = useState(8); // 나중에 아래의 세션으로 변경하기
  // const userId = sessionStorage.getItem("userId");
  // const [deleteUeserId, setDeleteUeserId] = useState(1);

  // 캘린더에서 유저 삭제 취소 버튼 : 모달 닫음.
  const cancelDeleteCalendarUser = e => {
    showDeleteCheckModal(false);
  };

  // 캘린더에서 유저 삭제 확인 버튼
  const delectCalendarUser = async ({
    userId,
    selectCalenderId,
    deleteUeserId,
  }) => {
    setDeleteCheck(!deleteCheck);
    // setDeleteUeserId(2);
    console.log("userId 확인 : ", userId);
    console.log("selectCalenderId 확인 : ", selectCalenderId);
    console.log("deleteUeserId 확인 : ", deleteUeserId);
    deleteUeser({ userId, selectCalenderId, deleteUeserId });
  };

  const deleteUeser = ({ userId, selectCalenderId, deleteUeserId }) => {
    console.log(deleteCheck);
    console.log(deleteUeserId);

    if (!deleteCheck) {
      // const result = deleteListUser(userId, calendarId, deleteUeserId);
      const res = deleteListUser({ userId, selectCalenderId, deleteUeserId });

      if (res) {
        getCalenderUserList(selectCalenderId);
        showDeleteCheckModalCancel();
      }
    }

    showDeleteCheckModal(false);
  };

  // 수정 예정
  const deleteListUser = async ({
    userId,
    selectCalenderId,
    deleteUeserId,
  }) => {
    // console.log("01", userId);
    // console.log("02", selectCalenderId);
    // console.log("03", deleteUeserId);
    try {
      const resepons = await axios.delete("/api/calendar/member", {
        data: {
          signedUserId: userId,
          calendarId: selectCalenderId,
          userId: deleteUeserId,
        },
      });
      const status = resepons.status.toString().charAt(0);
      if (status === "2") {
        // console.log("유저 성공적으로 삭제 : ", resepons);
        return setUserListUpdate(true);
      } else {
        console.log("API 오류");
      }
      console.log(resepons.data);
    } catch (error) {
      console.log(error);
      // alert(error);
    }
  };

  return (
    <DeleteCheckModalStyle>
      <div className="calendar-warning-modal-wrap">
        <div className="calendar-modal-content">
          <div className="calendar-modal-header">
            <div>
              <h1 className="calendar-modal-warning-msg">경고</h1>
            </div>
          </div>

          <div className="calendar-modal-content-main">
            <div className="main-wrap">
              <h2 className="calendar-modal-msg">
                정말 해당 유저를 제거 하시겠습니까?
              </h2>
              <div className="calendar-button-box">
                <button
                  type="button"
                  onClick={e => {
                    cancelDeleteCalendarUser(e);
                  }}
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={e => {
                    delectCalendarUser({
                      userId,
                      selectCalenderId,
                      deleteUeserId,
                    });
                  }}
                >
                  제거
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DeleteCheckModalStyle>
  );
};

export default DeleteCheckModal;
