import axios from "axios";

const apiUrl = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMAGES_API_KEY}`;

export const fileUpload = async (data) => {
  try {
    await axios.post(apiUrl + "file", data);
  } catch (error) {
    throw error;
  }
};
