import { useEffect } from "react";
import CommentItem from "./CommentItem";
import { commentInput } from "../../apis/create/createApi";
const CommentView = ({ commentList, onRemove }) => {
  const userCommentInput = async event => {
    event.preventDefault();

    // 아래 데이터 api로 전송
    const requestData = {
      boardId: 100,
      signedUserId: 8,
      content: "댓글 확인중",
      calendarId: 63,
    };
    const result = await commentInput(requestData);
    console.log(result);
  };

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
              <CommentItem
                key={item.index}
                item={item}
                onRemove={onRemove}
                onClick={() => {
                  userCommentInput(item);
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
