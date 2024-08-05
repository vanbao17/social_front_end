import axios from "axios";
const token = localStorage.getItem("token");

export const getPosts = async () => {
  try {
    const response = await axios.get("http://localhost:3001/api/v1/posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};
export const getPostsIdPersonal = async (ID) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/v1/getPostsIdPersonal",
      {
        ID,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};
export const addPost = async (IDAccount, Content) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/v1/addPost",
      {
        IDAccount,
        Content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};
