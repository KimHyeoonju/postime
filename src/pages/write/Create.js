import { useEffect, useState } from "react";
import { FaRegCalendar } from "react-icons/fa6";
import { IoBookmarkSharp } from "react-icons/io5";
import { SiStagetimer } from "react-icons/si";

import "../../css/create.css";
import Comment from "./Comment";
import Mulitifile from "./Mulitifile";

import { useNavigate } from "react-router-dom";
import { deleteAllData, sendCreateAllData } from "../../apis/create/createApi";
import Modal from "../../components/Modal";

const calendarId = localStorage.setItem("calendarId", 1);

const Create = () => {
  const userId = sessionStorage.getItem("userId");

  // 모달관련
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");
  const [modalBtOk, setModalBtOk] = useState(false);
  const [modalBtCancel, setModalBtCancel] = useState(false);

  // 모달 보이는 상태값
  const [isModal, setIsModal] = useState(false);

  const naviagte = useNavigate();

  const handleModalSubmit = e => {
    e.preventDefault();
    // 모달 활성화
    setIsModal(true);
  };

  // 모달 실행 함수
  const handleModalConfirm = () => {
    setIsModal(false);
    naviagte("/");
  };

  // 글쓰기 관련
  const [createTitle, setCreateTitle] = useState("");
  const [startDay, setStartDay] = useState("");
  const [dDay, setDDay] = useState("");
  const [deadline, setDeadline] = useState("00:00:00");
  const [createWrite, setCreateWrite] = useState("");
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

  const handleTimeChange = e => {
    const timeValue = e.target.value;
    const timeWithSeconds = `${timeValue}:00`;
    setDeadline(timeWithSeconds);
  };

  // 보드 전송
  const boardSubmit = async e => {
    e.preventDefault();
    // 각 항목 체크하기 생략
    // 1 번 전송데이터 포맷 만들기
    const formData = new FormData();

    // 2 번 보낼데이터 (json 형식의 문자열로 만들기)
    const infoData = JSON.stringify({
      calendarId: 1,
      signedUserId: userId,
      title: createTitle,
      startDay: startDay,
      content: createWrite,
      deadLine: deadline,
      dDay: dDay,
    });

    console.log("infoData : ", infoData);
    // 3 번 Blob 바이너리 데이터 만들기
    const dto = new Blob([infoData], { type: "application/json" });
    // 4 번 form-data 에 키에 값으로 추가하기
    formData.append("p", dto);
    console.log(formData);
    sendFiles.forEach(item => {
      // 5 번 이미지 파일 추가하기
      formData.append("files", item);
    });
    // 6 번 axios 로 전달
    try {
      console.log("데이터전송중");
      await sendCreateAllData(formData);
      naviagte("/");
    } catch (error) {
      console.log(error);
    }
  };

  // 보드 휴지통으로
  // const boardDeleteSubmit = async e => {
  //   e.preventDefault();
  //   const data = [
  //     {
  //       boardId: boardId,
  //       state: 3,
  //     },
  //   ];
  //   try {
  //     await deleteAllData(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleModalSubmit = (e) => {
  //   e.preventDefault();

  //   setIsModal(true);
  //   setModalTitle("!!!경고!!!");
  //   setModalText("진짜 정말 리얼 진심 삭제 하시겠습니까?");
  //   setModalBtOk(true);
  //   setModalBtCancel(true);
  //   setIsModal(true);
  //   return;
  // };

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
                  type="button"
                  onClick={e => handleModalSubmit(e)}
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
                      value={deadline.slice(0, 5)}
                      onChange={e => handleTimeChange(e)}
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
      </div>
    </div>
  );
};

export default Create;
