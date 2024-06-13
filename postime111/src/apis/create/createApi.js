import axios from "axios";

export const create = async data => {
  try {
    const response = await axios.post("/api/board", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const commentInput = async data => {
  try {
    const response = await axios.post("/api/board/comment", {
      boardId: 165,
      signedUserId: 8,
      // content: `${data.content}`,
      content: "댓글 보냅니다.",
      calendarId: 63,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const userCommentAll = async data => {
  try {
    // create 함수를 호출하여 보드를 생성합니다.
    // const createResponse = await create(data);
    // console.log("Board created:", createResponse);

    // commentInput 함수를 호출하여 댓글을 작성합니다.
    const commentResponse = await commentInput(data);
    console.log("Comment added:", commentResponse);

    return {
      // createResponse,
      commentResponse,
    };
  } catch (error) {
    console.log(error);
  }
};
