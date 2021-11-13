import axios from "axios";

const apiUrl =
  "https://api.imgbb.com/1/upload?key=a2c358478796c2c0d9f4743d092a6788";

export const fileUpload = async (data) => {
  try {
    await axios.post(apiUrl + "file", data);
  } catch (error) {
    throw error;
  }
};
