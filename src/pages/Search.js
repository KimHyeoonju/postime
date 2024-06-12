import { useState } from "react";

const Search = ({ searchTextIndex }) => {
  const [serarchList, setSearchList] = useState([]);

  return (
    <div className="common">
      <div className="common-inner">
        <h1>{searchTextIndex}에 해당하는 검색결과 입니다.</h1>
        <div className="common-button">
          <button className="common-button-modify">
            <span>수정</span>
          </button>
          <button className="common-button-delete">
            <span>삭제</span>
          </button>
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
          {serarchList.map((item, index) => (
            <ul className="common-list" key={index}>
              <li className="checkbox-area"></li>
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

export default Search;
