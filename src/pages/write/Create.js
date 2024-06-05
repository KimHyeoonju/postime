import React from "react";

const Create = () => {
  return (
    <div className="write-wrap">
      <div className="write-inner">
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
                // maxlength="25"
              ></textarea>
            </div>
            <div className="write-header-dec">
              <span>
                <i className="xi-calendar"></i> 2024.06.03
              </span>
              <span>
                <i className="xi-tag"></i> 태그
              </span>
              <span>
                <i className="xi-pen"></i> 설명
              </span>
            </div>
          </div>
        </div>
        <div className="write-main">
          <div className="write-main-text">
            <textarea type="text" placeholder="내용을 입력하세요."></textarea>
          </div>
          <div className="write-img">
            <div className="write-img-inner">
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
              <div className="write-img-contain">
                <i className="xi-close"></i>
                <i className="xi-file-image xi-2x"></i>
              </div>
              <div className="write-img-contain-button">
                <i className="xi-plus"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
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
            <div className="chat-comment-write"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
