import { useEffect, useState } from "react";
import { FaRegCalendar } from "react-icons/fa6";
import { IoBookmarkSharp } from "react-icons/io5";
import { SiStagetimer } from "react-icons/si";

import "@yaireo/tagify/dist/tagify.css";

import "../../css/create.css";
import Comment from "./Comment";
import Mulitifile from "./Mulitifile";

const calendarId = 1;

import {
  deleteAllData,
  getAllData,
  patchCompleteSearchList,
} from "../../apis/create/createApi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Detail = ({ boardId }) => {
  // 1. useLocation 훅 취득
  const location = useLocation();

  //2. location.state 에서 파라미터 취득 - 타입을 지정해줌.
  // const boardId = location.state.boardId;
  // console.log("boardId : ", boardId);

  // 글쓰기 관련
  const [createTitle, setCreateTitle] = useState("");
  const [startDay, setStartDay] = useState("");
  const [dDay, setDDay] = useState("");
  const [deadline, setDeadline] = useState();
  const [createWrite, setCreateWrite] = useState("");
  const [sendFiles, setSendFiles] = useState([]);
  // const [boardData, setBoardData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAllData(boardId);
        const result = response.data.respnseData.result;

        console.log(response.data);
        setCreateTitle(result.title);
        setStartDay(result.startDay);
        setDDay(result.dDay);
        setDeadline(result.deadLine);
        setCreateWrite(result.content);
        // setSendFiles(response.data.files);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  // 보드 휴지통으로
  // const boardDeleteSubmit = async e => {
  //   e.preventDefault();
  //   try {
  //     const data = [{ calendarId, boardId }];
  //     await deleteAllData(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // 보드 완료
  const boardComplete = async e => {
    e.preventDefault();
    try {
      const data = [{ boardId }];
      await patchCompleteSearchList(data);
      navigate("/complete");
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
