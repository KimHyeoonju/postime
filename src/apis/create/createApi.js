import axios from "axios";

export const sendCreateAllData = async data => {
  try {
    const header = { headers: { "Content-Type": "multipart/form-data" } };
    const response = await axios.post("/api/board", data, header);
    // console.log(response);
    // console.log(data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const modifyAllData = async data => {
  try {
    const header = { headers: { "Content-Type": "multipart/form-data" } };
    const response = await axios.post("/api/board", data, header);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getAllData = async boardId => {
  try {
    const header = { headers: { "Content-Type": "multipart/form-data" } };
    const response = await axios.get(`/api/board?board_id=${boardId}`, header);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 휴지통으로 보내기
export const deleteAllData = async data => {
  try {
    const response = await axios.patch("/api/board/state", data);
    // console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// patch  state 1 > 2
export const patchCompleteSearchList = async apiArr => {
  try {
    const response = await axios.patch(`/api/board/state`, apiArr);
    const status = response.status.toString().charAt(0);
    if (status === "2") {
      return response.data;
    } else {
      alert("API 오류발생 status 확인해주세요");
    }
  } catch (error) {
    console.log(error);
  }
};

// 댓글 기능
export const getComment = async data => {
  try {
    const response = await axios.get(`/api/board/comment?board_id=${data}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const postCommentInput = async data => {
  try {
    const response = await axios.post("/api/board/comment", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const removeCommentInput = async (commentId, userId) => {
  try {
    const response = await axios.delete(
      `/api/board/comment?comment_id=${commentId}&signed_user_id=${userId}`,
    );
    console.log("삭제중?", response.data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
