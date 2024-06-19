import axios from "axios";

// 완료페이지 목록 불러오기
export const getCompleteList = async loginUserId => {
  try {
    const response = await axios.get(
      `/api/board/done?signed_user_id=${loginUserId}`,
    );
    const status = response.status.toString().charAt(0);
    // console.log("resopnse : ", response);
    if (status === "2") {
      return response.data;
    } else {
      alert("API 오류발생 status 확인해주세요");
    }
  } catch (error) {
    console.log(error);
  }
};

// 완료페이지 삭제 2 > 3
export const patchDeleteCompleteList = async selectedBoardId => {
  try {
    const response = await axios.patch(`/api/board/state`, selectedBoardId);
    // console.log("responses는", response);
    // console.log("response.data는", response.data);
    const status = response.status.toString().charAt(0);
    // console.log("resopnse : ", response);
    if (status === "2") {
      return response.data;
    } else {
      alert("API 오류발생 status 확인해주세요");
    }
  } catch (error) {
    console.log(error);
  }
};

// 완료페이지 복원 2 > 1
export const patchProgressCompleteList = async selectedBoardId => {
  try {
    const response = await axios.patch(`/api/board/state`, selectedBoardId);
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

// 완료 처리 1 > 2
export const patchCompleteList = async selectedBoardId => {
  try {
    const response = await axios.patch(`/api/board/state`, selectedBoardId);
    // console.log("responses는", response);
    // console.log("response.data는", response.data);
    const status = response.status.toString().charAt(0);
    // console.log("resopnse : ", response);
    if (status === "2") {
      return response.data;
    } else {
      alert("API 오류발생 status 확인해주세요");
    }
  } catch (error) {
    console.log(error);
  }
};
