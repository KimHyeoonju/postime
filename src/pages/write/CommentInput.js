import styled from "@emotion/styled";
import React, { useState } from "react";

const CommentInput = ({ addComment }) => {
  // 댓글 입력 갱신
  const [comment, setComment] = useState("");

  const onChange = event => {
    setComment(event.target.value);
    // console.log("입력하는 중", comment);
  };

  const handleSubmit = event => {
    console.log(comment);
    event.preventDefault();
    addComment(comment);
    setComment("");
  };

  return (
    <form
      className="chat-inner"
      onSubmit={e => {
        handleSubmit(e);
      }}
    >
      <input
        type="text"
        placeholder="댓글을 작성하세요."
        className="comment-input"
        onChange={onChange}
        value={comment}
      />
    </form>
  );
};

export default CommentInput;
