import axios from "axios";
import React from "react";
import { RiChatDeleteLine } from "react-icons/ri";
import { commentInput } from "../../apis/create/create";

const CommentItem = ({ item, onRemove }) => {
  return (
    <div className="chat-comment-inner">
      <div className="chat-user-text">
        <div className="chat-user">{item.name}</div>
        {console.log(item.p)}
        <div className="user-comment">{item.content}</div>
      </div>
      <RiChatDeleteLine onClick={() => onRemove(item.p)} />
    </div>
  );
};

export default CommentItem;
