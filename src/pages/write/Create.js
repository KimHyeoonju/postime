import { useEffect, useRef, useState } from "react";
import { FaRegCalendar } from "react-icons/fa6";
import { IoBookmarkSharp } from "react-icons/io5";
import { SiStagetimer } from "react-icons/si";

import "../../css/create.css";
import Comment from "./Comment";
import Mulitifile from "./Mulitifile";

import { deleteAllData, sendCreateAllData } from "../../apis/create/createApi";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";

const calendarId = 61;
const boardId = boardId;

const Create = () => {
  // 모달관련
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");
  const [modalBtOk, setModalBtOk] = useState(false);
  const [modalBtCancel, setModalBtCancel] = useState(false);

  // 모달 보이는 상태값
  const [isModal, setIsModal] = useState(false);

  const naviagte = useNavigate();

  // const handleModalSubmit = e => {
  //   e.preventDefault();
  //   // 모달 활성화
  //   setIsModal(true);
  // };

  // // 모달 실행 함수
  // const modalOk = () => {
  //   setIsModal(false);
  //   if (isModal) {
  //     // navigate("/");
  //   }
  // };

  // // 1. useLocation 훅 취득
  // const location = useLocation();

  // // 2. location.state 에서 파라미터 취득 - 타입을 지정해줌.
  // // const state = location.state as { boardId }; // 이 형태는 지금 못 씀.
  // // const boardId = state.boardId;
  // const boardId = location.state.boardId;
  // console.log("boardId : ", boardId);

  // 글쓰기 관련
  const [createTitle, setCreateTitle] = useState("제목입니당");
  const [startDay, setStartDay] = useState("2024-06-01");
  const [dDay, setDDay] = useState("2024-06-13");
  const [deadline, setDeadline] = useState("12:00:00");
  const [createWrite, setCreateWrite] = useState("내용입니당");
  const [sendFiles, setSendFiles] = useState([]);

  const handleTitleChange = event => {
    setCreateTitle(event.target.value);
    // console.log("Title:", event.target.value);
  };

  const handleWriteChange = event => {
    setCreateWrite(event.target.value);
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

  // 보드 전송
  const boardSubmit = async e => {
    e.preventDefault();
    // 각 항목 체크하기 생략
    // 1 번 전송데이터 포맷 만들기
    const formData = new FormData();

    // {
    //   "calendarId": 63,
    //   "signedUserId": ,
    //   "title": "test55",
    //   "content": "content",
    //   "startDay": "2024-06-01",
    //   "deadLine": "12:00:00",
    //   "notExistTag": [
    //     {
    //       "calendarId": 63,
    //       "title": "test",
    //       "color": 1
    //     }
    //   ],
    //   "dDay": "2024-06-13"
    // }

    // 2 번 보낼데이터 (json 형식의 문자열로 만들기)
    const infoData = JSON.stringify({
      calendarId: calendarId,
      signedUserId: 72,
      title: createTitle,
      startDay: startDay,
      content: createWrite,
      deadLine: deadline,
      dDay: dDay,
    });
    // 3 번 Blob 바이너리 데이터 만들기
    const dto = new Blob([infoData], { type: "application/json" });
    // 4 번 form-data 에 키에 값으로 추가하기
    formData.append("p", dto);
    console.log(formData);
    // sendFiles.forEach(item => {
    //   // 5 번 이미지 파일 추가하기
    //   formData.append("files", item);
    // });
    // 6 번 axios 로 전달
    try {
      await sendCreateAllData(formData);
      naviagte("/");
    } catch (error) {
      console.log(error);
    }
  };

  // 보드 휴지통으로
  const boardDeleteSubmit = async e => {
    e.preventDefault();
    const data = [
      {
        boardId: boardId,
        state: 3,
      },
    ];
    try {
      await deleteAllData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalSubmit = async e => {
    e.preventDefault();

    const data = [{ calendarId, boardId }];
    setIsModal(true);
    setModalTitle("!!!경고!!!");
    setModalText("진짜 정말 리얼 진심 삭제 하시겠습니까?");
    setModalBtOk(true);
    setModalBtCancel(true);
    setIsModal(true);
    console.log(modalTitle, modalText);
    console.log(isModal);
    return;
  };

  // useEffect(() => {
  //   tagify.current = new Tagify(input.current);

  //   tagify.current.on("add", () => {
  //     console.log(tagify.current.value);
  //   });

  //   return () => {
  //     if (tagify.current) {
  //       tagify.current.destroy();
  //     }
  //   };
  // }, []);

  return (
    <div className="write-wrap">
      {isModal ? (
        <Modal
          title={modalTitle}
          message={modalText}
          // modalOk={modalOk}
          // modalCancel={modalCancel}
          onConfirm={modalBtOk}
          onClose={modalBtCancel}
          stateList={0}
          isOpen={isModal}
        />
      ) : null}
      <div className="write-inner">
        <div className="write-header-title">
          {/* 글쓰기 상단 제목부 */}
          <div className="write-header">
            <div className="write-button">
              <form onSubmit={boardSubmit}>
                <button
                  className="write-button-primary"
                  type="submit"
                  // onClick={e => boardSubmit(e)}
                >
                  <span>저장</span>
                </button>
              </form>
              <form>
                <button
                  className="write-button-primary"
                  type="submit"
                  onClick={e => boardDeleteSubmit(e)}
                >
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
                  {/* 캘린더 아이디의 이름이 출력되어야 하나? */}
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
                  {/* <input
                      name="tags"
                      className="write-tags"
                      placeholder="태그를 입력하세요"
                      ref={input}
                    ></input> */}
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
        {/*  수정했습니다. */}
        <div>
          <div className="chat-wrap">
            <Comment />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
