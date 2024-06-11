import axios from "axios";

export const getDelList = async () => {
  try {
    const response = await axios.get(`/api/board/deleted?signed_user_id=8`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteDelList = async () => {
  try {
    const response = await axios.delete(`/api/board`, {
      data: [
        { boardId: 130, calendarId: 64 },
        { boardId: 1, calendarId: 1 },
        { boardId: 1, calendarId: 1 },
      ],
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
