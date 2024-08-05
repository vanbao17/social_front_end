import axios from "axios";
const token = localStorage.getItem("token");
export const UploadFile = async (fileform, IDPost) => {
  try {
    const Path = "http://localhost:3001/uploads/" + fileform.fileName;
    const FileType = fileform.filetype;
    const filename = fileform.fileName;
    const responseAddFilePost = await axios.post(
      "http://localhost:3001/api/v1/addFilePost",
      {
        IDPost,
        Path,
        FileType,
        filename,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return responseAddFilePost;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};
export const updateFilePost = async (fileform, IDUpload, PostId) => {
  try {
    const Path = "http://localhost:3001/uploads/" + fileform.fileName;
    const FileType = fileform.filetype;
    const filename = fileform.fileName;
    const responseAddFilePost = await axios.post(
      "http://localhost:3001/api/v1/updateFilePost",
      {
        IDUpload,
        PostId,
        Path,
        FileType,
        filename,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return responseAddFilePost;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};
export const UploadFolder = async (file) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/v1/upload_file_post",
      file,
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
export const getFilePost = async (IDPost) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/v1/getFilePost",
      { IDPost },
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
