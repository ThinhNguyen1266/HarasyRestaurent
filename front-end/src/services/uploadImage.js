import axios from "axios";

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  try {
    const response = await axios.post(
      "http://localhost:8080/uploadImage",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data.data.imageUrl;
  } catch (error) {
    throw new Error("Error uploading image");
  }
};

export default uploadImage;
