import { useEffect, useState } from "react";
import CommentInput from "./CommentInput";
import CommentView from "./CommentView";

// 데모데이터
const initState = [];

const Comment = () => {
  const [commentList, setCommentList] = useState(initState);
  const addComment = chat => {
    // const newArr =  [...commentList, { id: 4, content: cm }]
    setCommentList(prev => [
      ...prev,
      { id: commentList.length + 1, content: chat },
    ]);
    // console.log(cm, " : 이 내용을 setCommentList 에 담아야 한다.");
  };

  useEffect(() => {
    // setCommentList(??)
    // dataLoading..
  }, []);
  return (
    <>
      <CommentView commentList={commentList} />
      <CommentInput addComment={addComment} />
    </>
  );
};

export default Comment;
