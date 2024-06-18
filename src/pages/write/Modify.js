import { useEffect, useState } from "react";
import { FaRegCalendar } from "react-icons/fa6";
import { IoBookmarkSharp } from "react-icons/io5";
import { SiStagetimer } from "react-icons/si";

import "@yaireo/tagify/dist/tagify.css";

import "../../css/create.css";
import Comment from "./Comment";
import Mulitifile from "./Mulitifile";

import { deleteAllData, modifyAllData } from "../../apis/create/createApi";

const Modify = ({ calendarId, boardId }) => {
  // 글쓰기 관련
  const [createTitle, setCreateTitle] = useState("");
  const [startDay, setStartDay] = useState("");
  const [dDay, setDDay] = useState("");
  const [deadline, setDeadline] = useState();
  const [createWrite, setCreateWrite] = useState("");
  const [sendFiles, setSendFiles] = useState([]);

  const handleTitleChange = event => {
    setCreateTitle(event.target.value);
  };

  const handleWriteChange = event => {
    setCreateWrite(event.target.value);
    console.log(createWrite);
  };

  useEffect(() => {
    const handleKeyDown = event => {
      const textarea = document.querySelector("#write-header-title");
      if (event.target === textarea && event.key === "Enter") {
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // 보드 생성
  const boardSubmit = e => {
    e.preventDefault();
    const formData = new FormData();

    // "{
    //   ""boardId"": 1,
    //   ""title"": ""제목"",
    //   ""content"": ""내용"",
    //   ""startDay"": ""2024-04-11"",
    //   ""deadLine"": ""12:30:00"",
    //   ""dDay"": ""2024-04-12""
    // }"

    const infoData = JSON.stringify({
      boardId: 100,
      title: createTitle,
      startDay: startDay,
      dDay: dDay,
      content: createWrite,
      deadline: deadline,
    });

    const dto = new Blob([infoData], { type: "application/json" });
    formData.append("p", dto);
    sendFiles.forEach(item => {
      formData.append("files", item);
    });
    console.log(formData);
    modifyAllData(formData);
  };

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
              <form onSubmit={boardSubmit}>
                <button className="write-button-primary" type="submit">
                  <span>저장</span>
                </button>
              </form>
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
                onChange={handleTitleChange}
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
                      onChange={e => setStartDay(e.target.value)}
                    />
                    <label htmlFor="dday">종료일</label>
                    <input
                      type="date"
                      id="dday"
                      value={dDay}
                      onChange={e => setDDay(e.target.value)}
                    />
                  </div>
                  <div className="timer">
                    <SiStagetimer />
                    <label htmlFor="deadline">마감일</label>
                    <input
                      type="time"
                      id="deadline"
                      value={deadline}
                      onChange={e => setDeadline(e.target.value)}
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
                onChange={handleWriteChange}
              ></textarea>
            </div>
            {/* 이미지 업로드 부분 */}
            <Mulitifile setSendFiles={setSendFiles} sendFiles={sendFiles} />
          </div>
        </div>
        <div className="chat-wrap">
          <Comment />
        </div>
      </div>
    </div>
  );
};

export default Modify;
