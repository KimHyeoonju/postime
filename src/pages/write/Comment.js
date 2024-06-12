import { useEffect, useState } from "react";
import CommentInput from "./CommentInput";
import CommentView from "./CommentView";

// 데모데이터
// const initState = [];

const Comment = () => {
  const [commentList, setCommentList] = useState([]);

  const userId = "김누구";
  const id = 1; //pk값

  const addComment = chat => {
    // 이전 코드
    // const newArr =  [...commentList, { id: 4, content: cm }]
    const newArr = [
      ...commentList,
      {
        name: userId,
        content: chat,
        p: commentList.length + 1,
      },
    ];
    setCommentList(newArr);
    // setCommentList(prev => [
    //   ...prev,
    //   //   { id: commentList.length + 1, content: chat },
    //   { id: userId, content: chat },
    // ]);
    // console.log(cm, " : 이 내용을 setCommentList 에 담아야 한다.");
  };

  const removeComment = commentId => {
    const updatedComments = commentList.filter(
      comment => comment.p !== commentId,
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
