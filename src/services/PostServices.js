import axios from "axios";

export const getPosts = async () => {
  try {
    const response = await axios.get("http://localhost:3001/api/v1/posts");
    return response;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};
export const addPost = async (IDAccount, Content) => {
  try {
    const response = await axios.post("http://localhost:3001/api/v1/addPost", {
      IDAccount,
      Content,
    });
    return response;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};
export const deletePost = async (IDPost) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/v1/deletePost",
      {
        IDPost,
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};
export const updatePost = async (IDPost, Content) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/v1/updatePost",
      {
        IDPost,
        Content,
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};
