import axios from "axios";

export const getCompleteList = async () => {
  try {
    const response = await axios.get(`/api/board/done?signed_user_id=8`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
