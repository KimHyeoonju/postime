import { useEffect, useRef, useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { FaRegCalendar } from "react-icons/fa6";
import { IoBookmarkSharp } from "react-icons/io5";

// import { create } from "../../apis/create";

import Tagify from "@yaireo/tagify";
import "@yaireo/tagify/dist/tagify.css";

import "../../css/create.css";
import Comment from "./Comment";
import Mulitifile from "./Mulitifile";

const Create = () => {
  const input = useRef(null);
  const tagify = useRef(null);

  const [imgFile, setImgFile] = useState([]);

  // 글쓰기 관련
  const [createTitle, setCreateTitle] = useState("");
  const [startDay, setStartDay] = useState();
  const [dDay, setDDay] = useState();
  const [createWrite, setCreateWrite] = useState("");

  const handleTitleChange = event => {
    setCreateTitle(event.target.value);
    // console.log("Title:", event.target.value);
  };

  const handleWriteChange = event => {
    setCreateWrite(event.target.value);
  };

  const fileUpload = () => {
    const imgUploadBt = document.querySelector(".img-upload-button");
    imgUploadBt.click();
  };

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = id => {
    setImgFile(imgFile.filter((_, index) => index !== id));
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

  const handleImgUpload = event => {
    const imgList = event.target.files;
    let imageUrlList = [...imgFile];

    for (let i = 0; i < imgList.length; i++) {
      const currentImgUrl = URL.createObjectURL(imgList[i]);
      imageUrlList.push(currentImgUrl);
    }

    if (imageUrlList.length > 10) {
      imageUrlList = imageUrlList.slice(0, 10);
    }

    setImgFile(imageUrlList);
  };

  useEffect(() => {
    tagify.current = new Tagify(input.current);

    tagify.current.on("add", () => {
      console.log(tagify.current.value);
    });

    return () => {
      if (tagify.current) {
        tagify.current.destroy();
      }
    };
  }, []);

  return (
    <div className="write-wrap">
      <div className="write-inner">
        <form className="write-header-title">
          {/* 글쓰기 상단 제목부 */}
          <div className="write-header">
            <div className="write-button">
              <button className="write-button-primary">
                <span>저장</span>
              </button>
              <button className="write-button-primary">
                <span>삭제</span>
              </button>
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
                  <input
                    name="tags"
                    className="write-tags"
                    placeholder="태그를 입력하세요"
                    ref={input}
                  ></input>
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
            <Mulitifile />
          </div>
        </form>
        <div className="chat-wrap">
          <Comment />
        </div>
      </div>
    </div>
  );
};

export default Create;
