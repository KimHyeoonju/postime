import { useEffect, useState } from "react";
import { getComment, postCommentInput } from "../../apis/create/createApi";
import CommentInput from "./CommentInput";
import CommentView from "./CommentView";
import { useLocation } from "react-router-dom";

const Comment = () => {
  // 1. useLocation 훅 취득
  const location = useLocation();
  //2. location.state 에서 파라미터 취득 - 타입을 지정해줌.
  const boardIdA = location.state.boardId;
  const calendarId = location.state.calendarId;
  const userId = sessionStorage.getItem("userId");
  console.log("boardIdA : ", boardIdA);

  // 전체 댓글 목록
  const [commentList, setCommentList] = useState([]);

  const allComments = async () => {
    const result = await getComment(boardIdA);
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
      boardId: boardIdA,
      signedUserId: userId,
      content: chat,
      calendarId: calendarId,
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
