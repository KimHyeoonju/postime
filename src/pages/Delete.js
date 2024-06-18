import { useEffect, useState } from "react";
import "../../src/css/commonpage.css";
import Button from "../components/Button";

import {
  deleteRemoveList,
  getDeleteList,
  patchDeleteList,
} from "../apis/etc/apidelete";

const Delete = () => {
  // const {
  //   isModalOpen,
  //   modalTitle,
  //   modalMessage,
  //   confirmAction,
  //   openModal,
  //   closeModal,
  // } = useModal();

  // 휴지통 일정 목록
  const [deleteList, setDeleteList] = useState([]);
  // 체크박스 선택된 항목
  const [selectedItems, setSelectedItems] = useState([]);
  // 선택된 항목들의 boradid, state 를 저장 (복원)
  const [selectedBoardId, setSelectBoardId] = useState([]);
  // 선택된 항목의 boardid, calenderid를 저장 (영구삭제)
  const [selectedCalendarId, setSelectCalendarId] = useState([]);

  useEffect(() => {
    getDelApi();
  }, []);

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
    const result = await getDeleteList();
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

  // 영구삭제
  const handleRemoveApi = async () => {
    console.log("클릭클릭", selectedCalendarId);
    const result = await deleteRemoveList(selectedCalendarId);
    if (result.statusCode !== 2) {
      alert(result.resultMsg);
      return;
    }

    setSelectCalendarId([]); // 선택된 항목 ID 초기화
    setSelectedItems([]); // 선택된 항목 초기화
    getDelApi(); // 완료 목록 갱신
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
        {/* <Modal
          isOpen={isModalOpen}
          title={modalTitle}
          message={modalMessage}
          onClose={closeModal}
          onConfirm={confirmAction}
        /> */}
      </div>
    </div>
  );
};

export default Delete;
