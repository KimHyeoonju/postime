import { RiChatDeleteLine } from "react-icons/ri";
import { removeCommentInput } from "../../apis/create/createApi";

const CommentItem = ({ item, onRemove }) => {
  console.log(item);
  const handleDelete = async () => {
    try {
      await removeCommentInput(item.commentId);
      onRemove(item.commentId);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleDelete = item => {
  //   console.log(item);
  // };

  return (
    <div className="chat-comment-inner">
      <div className="chat-user-text">
        <div className="chat-user">{item.userName}</div>
        {console.log(item.commentId)}
        <div className="user-comment">{item.content}</div>
      </div>
      <RiChatDeleteLine className="comment-icon" onClick={handleDelete} />
    </div>
  );
};

export default CommentItem;
