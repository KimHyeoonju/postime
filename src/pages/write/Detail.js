import { useEffect, useState } from "react";
import { FaRegCalendar } from "react-icons/fa6";
import { IoBookmarkSharp } from "react-icons/io5";
import { SiStagetimer } from "react-icons/si";

import "@yaireo/tagify/dist/tagify.css";

import "../../css/create.css";
import Comment from "./Comment";
import Mulitifile from "./Mulitifile";

// const calendarId = 1;

import {
  deleteAllData,
  getAllData,
  patchCompleteSearchList,
} from "../../apis/create/createApi";

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import ReadMulitifile from "./ReadMulitifile";

const Detail = () => {
  const navigate = useNavigate();
  // 1. useLocation 훅 취득
  const location = useLocation();
  // console.log("Detail Location: ", location.state);
  //2. location.state 에서 파라미터 취득 - 타입을 지정해줌.

  // const boardId = location.state.boardId;
  // const calendarId = location.state.calendarId;

  const userId = sessionStorage.getItem("userId");
  // 글쓰기 관련
  const [createTitle, setCreateTitle] = useState("");
  const [startDay, setStartDay] = useState("");
  const [dDay, setDDay] = useState("");
  const [deadline, setDeadline] = useState();
  const [createWrite, setCreateWrite] = useState("");
  const [sendFiles, setSendFiles] = useState([]);
  const [sendUrlFiles, setSendUrlFiles] = useState([]);
  const [calendarId, setCalendarId] = useState(null);
  const [boardId, setBoardId] = useState("");

  const getData = async () => {
    try {
      const response = await getAllData(boardId);
      // console.log("Detail.js : ", response.data.resultData);
      const result = response.data.resultData;
      setCreateTitle(result.title);
      setStartDay(result.startDay);
      setDDay(result.dDay);
      setDeadline(result.deadLine);
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
    // console.log("location.state.boardId : ", location.state.boardId);
    // console.log("location.state.calendarId : ", location.state.calendarId);
  }, []);

  useEffect(() => {
    getData();
  }, [calendarId, boardId]);

  // const { boardId } = useParams();

  // useEffect(() => {
  //   if (boardId) {
  //     getData();
  //   }
  // }, [boardId]);

  // useEffect(() => {
  //   console.log("sendFilessendFilessendFiles : ", sendFiles);
  //   console.log("sendFilessendFilessendFiles : ", calendarId);
  // }, [calendarId]);

  // 보드 완료
  const boardComplete = async e => {
    e.preventDefault();
    try {
      const data = [{ boardId: boardId, state: 2 }];
      await patchCompleteSearchList(data);
      alert("일정 완료 목록으로 이동합니다.");
      navigate("/complete");
    } catch (error) {
      console.log(error);
    }
  };
  // 보드 수정
  const boardModify = async e => {
    e.preventDefault();
    navigate("/write/modify", {
      state: {
        boardId: boardId,
        calendarId: calendarId,
      },
    });
  };

  return (
    <div className="write-wrap">
      <div className="write-inner">
        <div className="write-header-title">
          {/* 글쓰기 상단 제목부 */}
          <div className="write-header">
            <div className="write-button">
              <NavLink to={"/write/modify/" + boardId}>
                <button
                  className="write-button-primary"
                  onClick={e => {
                    boardModify(e);
                    // console.log("클릭확인", boardId);
                  }}
                >
                  <span>수정</span>
                </button>
              </NavLink>
              <form>
                <button
                  className="write-button-primary"
                  type="submit"
                  onClick={e => boardComplete(e)}
                >
                  <span>완료</span>
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
                    <label htmlFor="deadline">마감시간</label>
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

            <ReadMulitifile
              sendFiles={sendFiles}
              setSendFiles={setSendFiles}
              sendUrlFiles={sendUrlFiles}
              setSendUrlFiles={setSendUrlFiles}
              calendarId={calendarId}
              boardId={boardId}
              readOnly
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

export default Detail;
