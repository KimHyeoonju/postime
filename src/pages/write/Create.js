import { useEffect, useRef, useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { FaRegCalendar } from "react-icons/fa6";
import { IoBookmarkSharp } from "react-icons/io5";

// import { create } from "../../apis/create";

import Tagify from "@yaireo/tagify";
import "@yaireo/tagify/dist/tagify.css";

import "../../css/create.css";
import Comment from "./Comment";
import { useLocation } from "react-router-dom";

const Create = () => {
  // 1. useLocation 훅 취득
  const location = useLocation();

  // 2. location.state 에서 파라미터 취득 - 타입을 지정해줌.
  // const state = location.state as { boardId }; // 이 형태는 지금 못 씀.
  // const boardId = state.boardId;
  const boardId = location.state.boardId;
  console.log("boardId : ", boardId);

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
                    <FaRegCalendar /> 2024.06.03 - 2024.06.07
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
            <div className="write-img">
              <div className="write-img-warp">
                <div className="write-img-inner">
                  <button
                    className="img-upload"
                    onClick={fileUpload}
                    type="button"
                  >
                    <label htmlFor="input-file" onChange={handleImgUpload}>
                      <span>이미지 업로드</span>
                      <input
                        type="file"
                        className="img-upload-button"
                        accept="image/*"
                        required
                        multiple
                      />
                    </label>
                  </button>

                  <div>
                    {/* 저장해둔 이미지들을 순회하면서 화면에 이미지 출력 */}
                    {imgFile.map((image, id) => (
                      <div key={id} className="img-contain-wrap">
                        {/* <IoMdClose
                        onClick={() => handleDeleteImage(id)}
                        className="img-delete"
                      /> */}
                        <AiFillCloseSquare
                          className="img-delete"
                          onClick={() => handleDeleteImage(id)}
                        />
                        <img
                          src={image}
                          alt={`${image}-${id}`}
                          className="write-img-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
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
