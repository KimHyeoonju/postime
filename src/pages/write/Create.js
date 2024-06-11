import { useEffect, useRef, useState } from "react";
import { FaRegCalendar } from "react-icons/fa6";
import { IoBookmarkSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

// import { create } from "../../apis/create";

import Tagify from "@yaireo/tagify";
import "@yaireo/tagify/dist/tagify.css";

import "../../css/create.css";
import axios from "axios";
import Comment from "./Comment";

const Create = () => {
  const input = useRef(null);
  const tagify = useRef(null);

  const [imgFile, setImgFile] = useState([]);

  // 글쓰기 관련
  const [createTitle, setCreateTitle] = useState("");
  const [createWrite, setCreateWrite] = useState("");
  const [createDate, setCreateDate] = useState();

  // const createPost = async event => {
  //   event.preventDefault();

  //   try {
  //     const response = await axios.post("/api/board", {
  //       calendarId: "calendarId",
  //       signedUserId: "signedUserId",
  //       title: "title",
  //       content: "content",
  //       startDay: "startDay",
  //       deadLine: "deadLine",
  //       existTag: [1, 2],
  //       notExistTag: [
  //         {
  //           calendarId: "calendarId",
  //           title: "tag1",
  //           color: 1,
  //         },
  //       ],
  //       dDay: "dDay",
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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

  // X버튼 클릭 시 이미지 삭제 > 아직 구현 못함
  // const handleDeleteImage = id => {
  //   setShowImages(showImages.filter((_, index) => index !== id));
  // };

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
                      <div key={id}>
                        {/* <IoMdClose
                        onClick={() => handleDeleteImage(id)}
                        className="img-delete"
                      /> */}
                        <img
                          src={image}
                          alt={`${image}-${id}`}
                          className="write-img-contain"
                        />
                      </div>
                    ))}
                  </div>
                  {/* <div className="write-img-contain" id="write-img-show">
                  {imgFile?.map((img, idx) => (
                    <div key={idx}>
                      <img src={img} alt="img" className="write-img-contain" />
                    </div>
                  ))}
                </div> */}
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
