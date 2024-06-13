import styled from "@emotion/styled";
import { useState } from "react";
import { colorSystem } from "../../css/color";
import "./calendarmodalstyle.css";

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

  .calendar-button-box button:first-child {
    background-color: ${colorSystem.g900};
    border-color: ${colorSystem.MainPurple};
    color: ${colorSystem.primaryB};
  }
  .calendar-button-box button:last-child {
    color: ${colorSystem.primaryW};

    background-color: ${colorSystem.MainPurple};
  }
`;

// const DeleteCheckModal = ({ showDeleteCheckModal, deleteUeserId }) => {
const DeleteCheckModal = ({ showDeleteCheckModal }) => {
  const [deleteCheck, setDeleteCheck] = useState(false);
  const userId = sessionStorage.getItem("userId");
  const calendarId = sessionStorage.getItem("calendarId");
  const [deleteUeserId, setDeleteUeserId] = useState(1);

  // 캘린더에서 유저 삭제 취소 버튼 : 모달 닫음.
  const cancelDeleteCalendarUser = e => {
    showDeleteCheckModal(false);
  };

  // 캘린더에서 유저 삭제 확인 버튼
  const delectCalendarUser = async e => {
    setDeleteCheck(!deleteCheck);
    setDeleteUeserId(2);
    const a = await deleteUeser();
  };

  const deleteUeser = () => {
    console.log(deleteCheck);
    console.log(deleteUeserId);

    if (!deleteCheck) {
      // const result = deleteListUser(userId, calendarId, deleteUeserId);

      //   deleteListUser(userId, calendarId, deleteUeserId);
      console.log("1", userId);
      console.log("2", calendarId);
      console.log("3", deleteUeserId);
    }
    showDeleteCheckModal(false);
  };

  // 수정 예정
  const deleteListUser = async (userId, calenderId, deleteUeserId) => {
    // console.log(userId);
    // console.log(calenderId);
    // console.log(deleteUeserId);
    // try {
    //   const resepons = await axios.delete("/api/calendar/member", {
    //     // signedUserId:
    //     userId,
    //     // calendarId:
    //     calenderId,
    //     // userId:
    //     deleteUeserId,
    //   });
    //   console.log(resepons);
    //   const status = resepons.status.toString().charAt(0);
    //   if (status === "2") {
    //     return resepons.data.resultData;
    //   } else {
    //     console.log("API 오류");
    //   }
    //   console.log(resepons.data);
    // } catch (error) {
    //   console.log(error);
    //   // alert(error);
    // }
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
                <button type="button" onClick={delectCalendarUser}>
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
