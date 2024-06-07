import React, { useEffect } from "react";
import "../../css/create.css";
import { FaRegCalendarCheck } from "react-icons/fa6";

const Create = () => {
  useEffect(() => {
    return () => {};
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
                maxLength="25"
              ></textarea>
            </div>
            <div className="write-header-dec">
              <span>
                <FaRegCalendarCheck /> 내 캘린더
              </span>
              <div>
                <i className="xi-calendar"></i> 2024.06.03 - 2024.06.07
              </div>
              <div>
                <i className="xi-tag"></i> #태그
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
                <div className="write-img-contain" id="write-img-show">
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
                <div className="write-img-contain">
                  <i className="xi-close"></i>
                  <i className="xi-file-image xi-2x"></i>
                </div>
                <div className="write-img-contain">
                  <i className="xi-close"></i>
                  <i className="xi-file-image xi-2x"></i>
                </div>
              </div>
              <div className="img-upload">
                <input
                  type="file"
                  className="img-upload-button"
                  accept="image/*"
                  required
                  multiple
                  style={{ display: "none" }}
                />
                <i className="xi-plus"></i>
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
