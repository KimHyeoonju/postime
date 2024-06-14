import { useEffect, useState } from "react";
import { getComment, postCommentInput } from "../../apis/create/createApi";
import CommentInput from "./CommentInput";
import CommentView from "./CommentView";

const Comment = () => {
  // 전체 댓글 목록
  const [commentList, setCommentList] = useState([]);

  const allComments = async () => {
    const result = await getComment(100);
    setCommentList(result.data.resultData);
  };

  useEffect(() => {
    // 전체 목록 부르기
    allComments();
  }, []);

  // const userId = "김누구";
  // const id = 1; //pk값

  // 댓글 추가
  const addComment = async chat => {
    const sendData = {
      boardId: 100,
      signedUserId: 8,
      content: chat,
      calendarId: 63,
    };
    const result = await postCommentInput(sendData);
    allComments();
  };

  // 댓글 삭제

  const removeComment = commentId => {
    const updatedComments = commentList.filter(
      comment => comment.commentId !== commentId,
    );
    setCommentList(updatedComments);
  };

  useEffect(() => {
    // setCommentList(??)
    // dataLoading..
  }, []);
  return (
    <>
      <CommentView commentList={commentList} onRemove={removeComment} />
      <CommentInput addComment={addComment} />
    </>
  );
};

export default Comment;
