import axios from "axios";

const getSearchList = async SearchWorld => {
  try {
    const response = await axios.get(
      `api/board/search?signed_user_id=8&search_word=${SearchWorld}`,
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
