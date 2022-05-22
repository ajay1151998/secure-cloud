import { apiUrl } from "config/api";
import axios from "axios";

export const uploadImage = async (image, token) => {
  const data = new FormData();
  data.append("files", image);
  //   console.log(image);

  const res = await axios.post(`${apiUrl}/upload`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const uploadedImage = await res.data[0];

  return uploadedImage;
};
