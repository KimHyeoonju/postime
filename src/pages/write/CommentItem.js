import React from "react";
import { RiChatDeleteLine } from "react-icons/ri";

const CommentItem = ({ item }) => {
  return (
    <div className="chat-comment-inner">
      <div className="chat-user-text">
        <div className="chat-user">{item.id}</div>
        <div className="user-comment">{item.content}</div>
      </div>
      <RiChatDeleteLine />
    </div>
  );
};

export default CommentItem;
