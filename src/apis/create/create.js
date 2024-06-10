import axios from "axios";

export const create = async data => {
  try {
    const response = await axios.post("/api/board", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default create;
