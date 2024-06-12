import React, { useEffect, useState } from "react";
import CommentItem from "./CommentItem";
const CommentView = ({ commentList }) => {
  useEffect(() => {}, []);

  // const onInsert = () => {
  //   const chat = {
  //     id: nextId.current,
  //     text,
  //   };
  // };

  return (
    <>
      <div className="chat-header">댓글</div>
      <div className="chat-main">
        <div className="chat-comment">
          {commentList.map(item => (
            <CommentItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CommentView;
