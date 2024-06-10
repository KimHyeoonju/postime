import { useEffect, useRef, useState } from "react";
import { FaRegCalendar } from "react-icons/fa6";
import { IoBookmarkSharp } from "react-icons/io5";
import { PiTagFill } from "react-icons/pi";

import Tagify from '@yaireo/tagify';
import '@yaireo/tagify/dist/tagify.css';
import "../../css/tag.css";

import "../../css/create.css";

const Create = () => {
  const input = useRef(null);
  const tagify = useRef(null);

  const [imgFile, setImgFile] = useState([]);
  const uploadImg = useRef();

  const fileUpload = () => {
    const imgUploadBt = document.querySelector(".img-upload-button");
    // const imgUpload = document.querySelector(".img-upload");

    // imgUpload.addEventListener("click", () => imgUploadBt.click());
    imgUploadBt.click();
    
  }

  useEffect (() => {
    const handleKeyDown = (event) => {
      const textarea = document.querySelector("#write-header-title");
      if (event.target === textarea && event.key === "Enter"){
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);


  const imgUpload = () => {
    console.log(uploadImg.current.files);
    setImgFile(prev => [...prev, URL.createObjectURL(uploadImg.current.files[0])]);
  };
  
  useEffect(() => {
    tagify.current = new Tagify(input.current);

    tagify.current.on('add', () => {
      console.log(tagify.current.value);
    });

    return () => {
      if (tagify.current){
        tagify.current.destroy();
      }
    };
  }, []);


  return (
    <div className="write-wrap">
      <div className="write-inner">
        {/* 글쓰기 상단 제목부 */}
        <div className="write-header">
          <div className="write-button">
            <button className="write-button-primary">
              <span>수정</span>
            </button>
            <button className="write-button-primary">
              <span>삭제</span>
            </button>
          </div>
          <div className="write-header-text">
            <div className="write-header-title">
              <textarea
                id="write-header-title"
                type="text"
                placeholder="제목 없음"
                maxLength="28"
              ></textarea>
            </div>
            <div className="write-header-dec">
              <span>
                <IoBookmarkSharp /> 내 캘린더
              </span>
              <div className="write-header-icon">
                <FaRegCalendar /> 2024.06.03 - 2024.06.07
              </div>
              <div className="write-header-icon">
                <PiTagFill />
                <input 
                name="tags" 
                className="write-tags" 
                placeholder="태그를 입력하세요"
                ref={input}>
                </input>
              </div>
            </div>
          </div>
        </div>
        {/* 글쓰기 본문 */}
        <div className="write-main">
          <div className="write-main-text">
            <textarea type="text" placeholder="내용을 입력하세요."></textarea>
          </div>
          {/* 이미지 업로드 부분 */}
          <div className="write-img">
            <div className="write-img-warp">
              <div className="write-img-inner">
                <button className="img-upload" onClick={fileUpload}>
                  <span>이미지 업로드</span>
                  <input
                    type="file"
                    className="img-upload-button"
                    accept="image/*"
                    required
                    multiple
                    onChange={imgUpload}
                    ref={uploadImg}
                  />
                  <i className="xi-plus"></i>
                </button>
                <div className="write-img-contain" id="write-img-show">
                  {imgFile?.map((img, idx) => (
                    <div key={idx}>
                      <img src={img} alt="img" className="write-img-contain"/>
                    </div>
                  ))}
                </div>
                <div className="write-img-contain" id="write-img-show">
                  {imgFile?.map((img, idx) => (
                    <div key={idx}>
                      <img src={img} alt="img" className="write-img-contain"/>
                    </div>
                  ))}
                </div>
                <div className="write-img-contain">
                  <i className="xi-close"></i>
                  <i className="xi-file-image xi-2x"></i>
                </div>
                <div className="write-img-contain">
                  <i className="xi-close"></i>
                  <i className="xi-file-image xi-2x"></i>
                </div>
                <div className="write-img-contain">
                  <i className="xi-close"></i>
                  <i className="xi-file-image xi-2x"></i>
                </div>
              </div>
                
            </div>
          </div>
        </div>
      </div>
      {/* 메인 우측 댓글 */}
      <div className="chat-wrap">
        <div className="chat-inner">
          <div className="chat-header">
            <h2>댓글</h2>
          </div>
          <div className="chat-comment">
            <div className="chat-comment-inner">
              <div className="chat-user-text">
                <div className="chat-user">수민</div>
                <div className="user-comment">부탁드립니다.</div>
              </div>
              <i className="xi-minus-circle-o xi-2x"></i>
            </div>
            <div className="chat-comment-write">
              <input
                type="text"
                placeholder="댓글을 작성하세요."
                className="chat-comment-input"
              />
              <i className="xi-location-arrow xi-2x"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
