/* eslint-disable no-unused-labels */
import { useEffect, useState } from "react";
import "../../src/css/commonpage.css";
import Button from "../components/Button";
import { deleteCompleteList, getCompleteList } from "../apis/etc/apicomplete";

const Complete = () => {
  const [completeList, setCompleteList] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedBoardId, setSelectBoardId] = useState([]);

  // 완료 목록 불러오기
  const getApi = async () => {
    const result = await getCompleteList();
    setCompleteList(result.resultData);
    // console.log(result.resultData);
  };

  // 완료 > 삭제 상태변경 state 2 > 3
  const deleteApi = async () => {
    console.log(selectedBoardId);
    await deleteCompleteList(selectedBoardId);
    setSelectBoardId([]);
  };

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

  useEffect(() => {
    getApi();
  }, []);

  useEffect(() => {
    console.log("선택항목 : ", selectedItems);

    const BoardIds = selectedItems.map(item => ({
      boardId: item.boardId,
      state: 3,
    }));
    console.log(BoardIds);
    setSelectBoardId(BoardIds);
  }, [selectedItems]);

  return (
    <div className="common">
      <div className="common-inner">
        <h1>완료된 일정</h1>
        <div className="common-button">
          <Button label="복원" onClick={() => {}}></Button>
          <Button
            label="삭제"
            onClick={() => {
              deleteApi();
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
          {completeList.map((item, index) => (
            <ul className="common-list" key={index}>
              <li className="checkbox-area">
                <input
                  type="checkbox"
                  className="com-checkbox"
                  onChange={e => handleCheckboxChange(item, e.target.checked)}
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Complete;
