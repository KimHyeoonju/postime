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

export const deleteCompleteList = async selectedBoardId => {
  try {
    const response = await axios.patch(`/api/board/state`, selectedBoardId);
    console.log("responses는", response);
    console.log("response.data는", response.data);
  } catch (error) {
    console.log(error);
  }
};
