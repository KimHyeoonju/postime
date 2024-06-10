import { useEffect, useState } from "react";
import "../../src/css/commonpage.css";
import Button from "../components/Button";
import Modal from "../components/Modal";
import useModal from "../hooks/useModal";
import axios from "axios";

const Complete = () => {
  const { isModalOpen, modalMessage, confirmAction, openModal, closeModal } =
    useModal();

  const [completeList, setCompleteList] = useState([]);

  useEffect(() => {
    getApi();
  }, []);

  const deleteBt = () => {
    openModal({
      message: "정말 삭제하시겠습니까?",
      onConfirm: () => {
        const selectedBoxes = document.querySelectorAll(
          'input[type="checkbox"]:checked',
        );
        // console.log(selectedBoxes);
        if (selectedBoxes.length > 0) {
          selectedBoxes.forEach(item => {
            const listItem = item.closest(".common-list");
            // console.log(listItem);
            listItem.remove();
            // alert("선택한 항목을 휴지통으로 이동합니다.");
            closeModal();
          });
        } else {
          alert("체크박스를 선택해주세요.");
        }
      },
    });
  };

  const getApi = async () => {
    const getCompleteList = async () => {
      try {
        const response = await axios.get(`/api/board/deleted?signed_user_id=8`);
        // console.log(response.data);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    };
    const result = await getCompleteList();
    console.log(result.resultData);
    setCompleteList(result.resultData);
  };

  const DeleteApi = async () => {
    const DeleteList = async () => {
      try {
        const response = await axios.delete(`/api/board`, {
          boardId: 59,
          calendarId: 61,
        });
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    };
    const result = DeleteList();
  };
  return (
    <div className="common">
      <div className="common-inner">
        <h1>삭제된 일정</h1>
        <div className="common-button">
          <Button label="복원"></Button>
          <Button
            label="api"
            onClick={() => {
              DeleteApi();
            }}
          ></Button>
          <Button
            label="삭제"
            onClick={() => {
              deleteBt();
            }}
          ></Button>
        </div>
        <div className="common-menu">
          <div className="cmt">
            <span>일정 명</span>
          </div>
          <div className="cmtxt">
            <span> 일정 내용 </span>
          </div>
          <div className="cmdate">
            <span>날짜</span>
          </div>
          <div className="cmcalender">
            <span>캘린더 명</span>
          </div>
        </div>

        <div className="common-list-wrap">
          {completeList.map((item, index) => {
            return (
              <ul className="common-list" key={index}>
                <li className="checkbox-area">
                  <input type="checkbox" className="com-checkbox" />
                </li>
                <li className="title-area">
                  <span className="com-title">{item.title}</span>
                </li>
                <li className="text-area">
                  <span className="com-text">{item.content}</span>
                </li>
                <li className="date-area">
                  <span className="com-date">{item.dDay}</span>
                </li>
                <li className="calender-area">
                  <span className="com-calender">{item.calendarId}</span>
                </li>
              </ul>
            );
          })}
        </div>
        {/* 모달 관련 */}
        <Modal
          isOpen={isModalOpen}
          message={modalMessage}
          onClose={closeModal}
          onConfirm={confirmAction}
        />
      </div>
    </div>
  );
};

export default Complete;
