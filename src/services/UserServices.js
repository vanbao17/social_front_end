import axios from "axios";
export const UserLogin = async (masv, password) => {
  try {
    const response = await axios.post("http://localhost:3001/api/v1/login", {
      masv,
      password,
    });
    localStorage.setItem("token", response.data.token);
    return response.data.token;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};
export const addCode = async (masv, code) => {
  try {
    const response = await axios.post("http://localhost:3001/api/v1/addCode", {
      masv,
      code,
    });
    return response;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};
