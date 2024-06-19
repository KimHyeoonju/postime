import { useEffect, useState } from "react";
import { FaRegCalendar } from "react-icons/fa6";
import { IoBookmarkSharp } from "react-icons/io5";
import { SiStagetimer } from "react-icons/si";

import "@yaireo/tagify/dist/tagify.css";

import "../../css/create.css";
import Comment from "./Comment";
import Mulitifile from "./Mulitifile";

import {
  deleteAllData,
  getAllData,
  modifyAllData,
} from "../../apis/create/createApi";
import { useLocation, useNavigate } from "react-router-dom";
// import ModifyMulitifile from "./ReadMulitifile";

const Modify = () => {
  const navigate = useNavigate();
  // 1. useLocation 훅 취득
  const location = useLocation();
  //2. location.state 에서 파라미터 취득 - 타입을 지정해줌.
  // const boardId = location.state.boardId;
  // const calendarId = location.state.calendarId;
  const userId = sessionStorage.getItem("userId");

  // 글쓰기 관련
  const [createTitle, setCreateTitle] = useState("");
  const [startDay, setStartDay] = useState("");
  const [dDay, setDDay] = useState("");
  const [deadLine, setDeadLine] = useState();
  const [createWrite, setCreateWrite] = useState("");
  const [sendFiles, setSendFiles] = useState([]);
  const [sendUrlFiles, setSendUrlFiles] = useState([]);
  const [calendarId, setCalendarId] = useState(null);
  const [boardId, setBoardId] = useState("");

  useEffect(() => {
    setCalendarId(location.state.calendarId);
    setBoardId(location.state.boardId);
    // console.log("location.state.boardId : ", location.state.boardId);
    // console.log("location.state.calendarId : ", location.state.calendarId);
  }, []);

  const handleTimeChange = e => {
    const timeValue = e.target.value;
    const timeWithSeconds = `${timeValue}:00`;
    setDeadLine(timeWithSeconds);
  };

  const getData = async () => {
    try {
      const response = await getAllData(boardId);
      console.log("Modify.js : ", response.data.resultData);
      const result = response.data.resultData;
      setCreateTitle(result.title);
      setStartDay(result.startDay);
      setDDay(result.dDay);
      setDeadLine(result.deadLine);
      setCreateWrite(result.content);
      setSendUrlFiles(result.files);
      setCalendarId(result.calendarId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setBoardId(location.state.boardId);
    setCalendarId(location.state.calendarId);
  }, []);

  useEffect(() => {
    getData();
  }, [calendarId, boardId]);

  // 보드 정보 업데이트
  const boardSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();

    const infoData = JSON.stringify({
      boardId: boardId,
      calendarId: calendarId,
      title: createTitle,
      content: createWrite,
      startDay: startDay,
      deadLine: deadLine,
      dDay: dDay,
    });

    const dto = new Blob([infoData], { type: "application/json" });
    formData.append("p", dto);
    sendFiles.forEach(item => {
      formData.append("files", item);
    });
    try {
      await modifyAllData(formData);
      alert("캘린더로 이동합니다.");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

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

  // 보드 휴지통으로
  const boardDeleteSubmit = async e => {
    e.preventDefault();
    try {
      const data = [{ boardId, state: 3 }];
      await deleteAllData(data);
      alert("휴지통으로 이동합니다.");
      navigate("/delete");
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
                    <label htmlFor="deadLine">마감시간</label>
                    <input
                      type="time"
                      id="deadLine"
                      value={deadLine ? deadLine.slice(0, 5) : ""}
                      onChange={e => handleTimeChange(e)}
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
            <Mulitifile
              sendFiles={sendFiles}
              setSendFiles={setSendFiles}
              sendUrlFiles={sendUrlFiles}
              setSendUrlFiles={setSendUrlFiles}
              calendarId={calendarId}
              boardId={boardId}
            />
          </div>
        </div>
        {/*  수정했습니다. */}
        <div>
          <div className="chat-wrap">
            <Comment boardId={boardId} signUserId={userId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modify;
