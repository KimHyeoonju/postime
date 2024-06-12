import { useEffect } from "react";
import CommentItem from "./CommentItem";
const CommentView = ({ commentList, onRemove }) => {
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
            <>
              <CommentItem key={item.index} item={item} onRemove={onRemove} />
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default CommentView;
