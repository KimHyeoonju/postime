import { useState } from "react";

const CommentInput = ({ addComment }) => {
  // 댓글 입력 갱신
  const [comment, setComment] = useState("");

  const handleChange = event => {
    setComment(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (comment.trim()) {
      addComment(comment);
      setComment("");
    }
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
        onChange={e => handleChange(e)}
        value={comment}
      />
    </form>
  );
};

export default CommentInput;
