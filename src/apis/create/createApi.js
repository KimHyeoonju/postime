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

export const deleteAllData = async data => {
  try {
    // const header = { headers: { "Content-Type": "multipart/form-data" } };
    const response = await axios.delete("/api/board", { data: data });
    // console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

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

export const removeCommentInput = async commentId => {
  try {
    const response = await axios.delete(
      `/api/board/comment?comment_id=${commentId}&signed_user_id=${8}`,
    );
    console.log("삭제중?", response.data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
