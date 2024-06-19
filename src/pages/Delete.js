import { useEffect, useState } from "react";
import "../../src/css/commonpage.css";
import Button from "../components/Button";

import {
  deleteRemoveList,
  getDeleteList,
  patchDeleteList,
} from "../apis/etc/apidelete";
import DeleteModal from "../components/DeleteModal";

const Delete = ({ userInfo }) => {
  // console.log("삭제페이지", userInfo);
  // const {
  //   isModalOpen,
  //   modalTitle,
  //   modalMessage,
  //   confirmAction,
  //   openModal,
  //   closeModal,
  // } = useModal();
  // const signedUserId = sessionStorage.getItem("userId");

  // 로그인 한 유저의 id
  const loginUserId = userInfo.userId;
  // 휴지통 일정 목록
  const [deleteList, setDeleteList] = useState([]);
  // 체크박스 선택된 항목
  const [selectedItems, setSelectedItems] = useState([]);
  // 선택된 항목들의 boradid, state 를 저장 (복원)
  const [selectedBoardId, setSelectBoardId] = useState([]);
  // 선택된 항목의 boardid, calenderid를 저장 (영구삭제)
  const [selectedCalendarId, setSelectCalendarId] = useState([]);

  // 모달창 전달 변수
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");
  // 모달 보이는 상태값
  const [isModal, setIsModal] = useState(false);

  // load 시 목록 불러오기
  useEffect(() => {
    getDelApi();
  }, []);

  // 선택된 항목들의 데이터 를 저장
  useEffect(() => {
    console.log("선택항목 : ", selectedItems);

    // 선택된 항목들의 boradid, state 를 저장
    const boardIds = selectedItems.map(item => ({
      boardId: item.boardId,
      state: 2,
    }));
    console.log(boardIds);
    setSelectBoardId(boardIds);

    // 선택된 항목의 boardid, calenderid를 저장
    const calendarIds = selectedItems.map(item => ({
      boardId: item.boardId,
      calendarId: item.calendarId,
    }));
    console.log(calendarIds);
    setSelectCalendarId(calendarIds);
  }, [selectedItems]);

  // input onchange 이벤트 핸들러
  const handleCheckboxChange = (item, isChecked) => {
    console.log("item", item);
    console.log("isChecked", isChecked);
    console.log("selectedItems", selectedItems);

    if (isChecked) {
      setSelectedItems(prevItems => [...prevItems, item]);
    } else {
      // isChecked 는 false
      // false 인 item 이 한개
      // item :  3
      // selectedItems = [1,2,3,4,5]
      setSelectedItems(prevItems =>
        prevItems.filter(selectedItem => selectedItem.boardId !== item.boardId),
      );
    }
  };

  // 삭제페이지 목록 불러오기  ** 아이디 받아와야 함
  const getDelApi = async () => {
    const result = await getDeleteList(loginUserId);
    // console.log("result : ", result);
    // console.log("resultMsg : ", result.resultMsg);
    if (result.statusCode !== 2) {
      alert(result.resultMsg);
      return;
    }
    setDeleteList(result.resultData);
  };

  // state 3 > 1 복원
  const handleRestoreApi = async () => {
    const result = await patchDeleteList(selectedBoardId);
    console.log(selectedBoardId);
    if (result.statusCode !== 2) {
      alert(result.resultMsg);
      return;
    }
    setSelectBoardId([]); // 선택된 항목 ID 초기화
    setSelectedItems([]); // 선택된 항목 초기화
    getDelApi(); // 완료 목록 갱신
  };

  // 모달창 확인 버튼 실행함수
  // 확인 시 영구삭제 Api 실행
  const modalOk = async () => {
    const result = await deleteRemoveList(selectedCalendarId);
    if (result.statusCode !== 2) {
      alert(result.resultMsg);
      return;
    }
    setIsModal(false);
    setSelectCalendarId([]); // 선택된 항목 ID 초기화
    setSelectedItems([]); // 선택된 항목 초기화
    getDelApi(); // 완료 목록 갱신
  };

  // 모달창 취소 버튼 실행함수
  const modalCancel = () => {
    setIsModal(false);
    setSelectCalendarId([]); // 선택된 항목 ID 초기화
    setSelectedItems([]); // 선택된 항목 초기화
  };

  // 영구삭제 모달창 핸들ㄹ러
  const handleRemoveApi = () => {
    console.log("삭제클릭", selectedCalendarId);
    setIsModal(true);
    setModalTitle("영구삭제 안내");
    setModalText(
      "선택한 일정을 완전히 삭제하시겠습니까? 영구삭제 시  일정을 다시 불러올 수 없게 됩니다.",
    );
  };

  return (
    <div className="common">
      <div className="common-inner">
        <h1 className="common-title">삭제된 일정</h1>
        <div className="common-button">
          <Button
            label="복원"
            onClick={() => {
              handleRestoreApi();
            }}
          ></Button>
          <Button
            label="삭제"
            onClick={() => {
              handleRemoveApi();
            }}
          ></Button>
        </div>
        <div className="common-menu">
          <div className="com-sizebox"></div>
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
          {deleteList.map((item, index) => {
            return (
              <ul className="common-list" key={index}>
                <li className="checkbox-area">
                  <input
                    type="checkbox"
                    className="com-checkbox"
                    onChange={e => handleCheckboxChange(item, e.target.checked)}
                    checked={selectedItems.some(
                      selectedItem => selectedItem.boardId === item.boardId,
                    )} // 체크박스 상태 설정
                  />
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
                  <span className="com-calender">{item.calendarName}</span>
                </li>
              </ul>
            );
          })}
        </div>
        {/* 모달 관련 */}
        {isModal ? (
          <DeleteModal
            title={modalTitle}
            text={modalText}
            modalOk={modalOk}
            modalCancel={modalCancel}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Delete;
