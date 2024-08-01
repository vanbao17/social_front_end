import axios from "axios";
export const getCommentPost = async (IDPost) => {
  try {
    const responseCommentPost = await axios.post(
      "http://localhost:3001/api/v1/getCommentsPost",
      { IDPost }
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
      "http://localhost:3001/api/v1/addCommentPost",
      { IDPost, UserID, Content, ReplyId }
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
      "http://localhost:3001/api/v1/updateCommentPost",
      { IDComment, Content }
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
      "http://localhost:3001/api/v1/deleteCommentPost",
      { IDComment }
    );
    return responseCommentPost.status;
  } catch (error) {
    console.log(error);
    if (error) throw error;
  }
};
