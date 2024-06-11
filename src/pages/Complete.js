import React, { useEffect, useState } from "react";
import "../../src/css/commonpage.css";
import Button from "../components/Button";
import { getCompleteList } from "../apis/etc/completeApi";

const Complete = () => {
  const [completeList, setCompleteList] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    getApi();
  }, []);

  const getApi = async () => {
    const result = await getCompleteList();
    setCompleteList(result.resultData);
    console.log(result.resultData);
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
    console.log("해해 : ", selectedItems);
  }, [selectedItems]);

  return (
    <div className="common">
      <div className="common-inner">
        <h1>완료된 일정</h1>
        <div className="common-button">
          <Button label="복원" onClick={() => {}}></Button>
          <Button label="삭제"></Button>
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
                <span className="com-calender">{item.calendarId}</span>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Complete;
