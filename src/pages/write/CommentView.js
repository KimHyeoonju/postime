import { useEffect } from "react";
import CommentItem from "./CommentItem";
const CommentView = ({ commentList, onRemove }) => {
  useEffect(() => {}, []);

  return (
    <>
      <div className="chat-header">댓글</div>
      <div className="chat-main">
        <div className="chat-comment">
          {commentList.map(item => (
            <>
              <CommentItem
                key={item.commentId}
                item={item}
                onRemove={onRemove}
                onClick={() => {
                  // userCommentInput(item);
                }}
              />
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default CommentView;
