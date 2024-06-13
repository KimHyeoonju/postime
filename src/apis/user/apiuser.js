import axios from "axios";

// 로그인 API
export const postSignIn = async ({ userId, userPass }) => {
  try {
    const response = await axios.post("/api/user/sign-in", {
      id: userId,
      pwd: userPass,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

// 회원정보-비밀번호 확인
export const postCheckPw = async ({ userId, userPass }) => {
  try {
    const response = await axios.post("/api/user/checkPwd", {
      id: userId,
      pwd: userPass,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

// 비밀번호 찾기
export const getResetPwd = async ({ userEmail, userId }) => {
  try {
    const rqData = `/api/user/resetpwd?email=${userEmail}&id=${userId}`;
    const response = await axios.get(rqData);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
