import axios from "axios";
const token = localStorage.getItem("token");

export const getCommentPost = async (IDPost) => {
  try {
    const responseCommentPost = await axios.post(
      "https://pycheck.xyz/api/v1/getCommentsPost",
      { IDPost },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return responseCommentPost.data;
  } catch (error) {
    console.log(error);
    if (error) throw error;
  }
};
export const addCommentPost = async (IDPost, UserID, Content, ReplyId) => {
  try {
    const responseCommentPost = await axios.post(
      "https://pycheck.xyz/api/v1/addCommentPost",
      { IDPost, UserID, Content, ReplyId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return responseCommentPost.status;
  } catch (error) {
    console.log(error);
    if (error) throw error;
  }
};
export const updateCommentPost = async (IDComment, Content) => {
  try {
    const responseCommentPost = await axios.post(
      "https://pycheck.xyz/api/v1/updateCommentPost",
      { IDComment, Content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return responseCommentPost.status;
  } catch (error) {
    console.log(error);
    if (error) throw error;
  }
};
export const deleteCommentPost = async (IDComment) => {
  try {
    const responseCommentPost = await axios.post(
      "https://pycheck.xyz/api/v1/deleteCommentPost",
      { IDComment },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return responseCommentPost.status;
  } catch (error) {
    console.log(error);
    if (error) throw error;
  }
};
