import { useState } from "react";
import { FaRegCalendar } from "react-icons/fa6";
import { IoBookmarkSharp } from "react-icons/io5";
import { SiStagetimer } from "react-icons/si";

import "@yaireo/tagify/dist/tagify.css";

import "../../css/create.css";
import Comment from "./Comment";
import Mulitifile from "./Mulitifile";

import { deleteAllData } from "../../apis/create/createApi";
import { NavLink } from "react-router-dom";

const calendarId = 61;
const boardId = 145;

const Detail = () => {
  // 글쓰기 관련
  const [createTitle, setCreateTitle] = useState("제목입니당");
  const [startDay, setStartDay] = useState("2024-06-01");
  const [dDay, setDDay] = useState("2024-06-13");
  const [deadline, setDeadline] = useState();
  const [createWrite, setCreateWrite] = useState("내용입니당");
  const [sendFiles, setSendFiles] = useState([]);

  // 보드 삭제
  const boardDeleteSubmit = async e => {
    e.preventDefault();
    try {
      const data = [{ calendarId, boardId }];
      await deleteAllData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="write-wrap">
      <div className="write-inner">
        <div className="write-header-title">
          {/* 글쓰기 상단 제목부 */}
          <div className="write-header">
            <div className="write-button">
              <NavLink to={"/write/modify/" + boardId}>
                <button className="write-button-primary">
                  <span>수정</span>
                </button>
              </NavLink>
              <form onSubmit={boardDeleteSubmit}>
                <button className="write-button-primary" type="submit">
                  <span>삭제</span>
                </button>
              </form>
            </div>

            <div className="write-header-text">
              <textarea
                id="write-header-title"
                type="text"
                placeholder="제목 없음"
                maxLength="28"
                name="title"
                value={createTitle}
                readOnly
              ></textarea>

              <div className="write-header-dec">
                <span>
                  <IoBookmarkSharp /> 내 캘린더
                </span>
                <div className="write-header-info">
                  <div className="write-header-icon">
                    <FaRegCalendar />
                    <label htmlFor="startday">시작일</label>
                    <input
                      type="date"
                      id="startday"
                      value={startDay}
                      readOnly
                    />
                    <label htmlFor="dday">종료일</label>
                    <input type="date" id="dday" value={dDay} readOnly />
                  </div>
                  <div className="timer">
                    <SiStagetimer />
                    <label htmlFor="deadline">마감일</label>
                    <input
                      type="time"
                      id="deadline"
                      value={deadline}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 글쓰기 본문 */}
          <div className="write-main">
            <div className="write-main-text">
              <textarea
                type="text"
                placeholder="내용을 입력하세요."
                value={createWrite}
                readOnly
              ></textarea>
            </div>
            {/* 이미지 업로드 부분 */}
            <Mulitifile sendFiles={sendFiles} readOnly />
          </div>
        </div>
        <div className="chat-wrap">
          <Comment />
        </div>
      </div>
    </div>
  );
};

export default Detail;
