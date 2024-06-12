import React, { useState } from "react";
import { commentInput } from "../../apis/create/create";

const CommentInput = ({ addComment, userComment }) => {
  // 댓글 입력 갱신
  const [comment, setComment] = useState("");

  const onChange = event => {
    setComment(event.target.value);
    // console.log("입력하는 중", comment);
  };

  const handleSubmit = event => {
    // console.log(comment);
    event.preventDefault();
    // addComment(comment);
    // setComment("");
    if (comment.trim()) {
      addComment(comment);
      setComment("");
    }
  };

  const userCommentInput = async event => {
    event.preventDefault();

    // 아래 데이터 api로 전송
    // const requestData = {
    //   boardId: 100,
    //   signedUserId: 8,
    //   content: "",
    //   calendarId: 63,
    // };
    // const result = await commentInput(requestData);
    // console.log(result);

    const data = {};
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
        onClick={event => {
          userCommentInput(event);
        }}
      />
    </form>
  );
};

export default CommentInput;
