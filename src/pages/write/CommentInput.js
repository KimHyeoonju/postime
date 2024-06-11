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

  // 이모션으로 스타일 주면 input에 입력 안 되는 현상 있음

  //   const FormStyle = styled.form`
  //     width: 100%;
  //   `;

  //   const InputStyle = styled.div`
  //     width: 300px;
  //   `;

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
        onChange={onChange}
        value={comment}
        style={{ width: "300px" }}
      />
    </form>
  );
};

export default CommentInput;
