import axios from "axios";
const token = localStorage.getItem("token");

export const addConvensation = async (IDAccount1, IDAccount2) => {
  try {
    const responseAddConven = await axios.post(
      "https://pycheck.xyz/api/v1/addConvensation",
      { IDAccount1, IDAccount2 },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return responseAddConven;
  } catch (error) {
    console.log(error);
  }
};

export const checkConvensation = async (IDAccount2) => {
  try {
    const responseAddConven = await axios.post(
      "https://pycheck.xyz/api/v1/checkConvensation",
      { IDAccount2 },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return responseAddConven;
  } catch (error) {
    console.log(error);
  }
};
export const getConvens = async (id) => {
  try {
    const responseAddConven = await axios.post(
      "https://pycheck.xyz/api/v1/getConvens",
      { id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return responseAddConven;
  } catch (error) {
    console.log(error);
  }
};
export const getMesseages = async (id) => {
  try {
    const responseAddConven = await axios.post(
      "https://pycheck.xyz/api/v1/getMesseages",
      { id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return responseAddConven;
  } catch (error) {
    console.log(error);
  }
};
