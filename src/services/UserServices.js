import axios from "axios";
import CryptoJS from "crypto-js";
const token = localStorage.getItem("token");

export const UserLogin = async (masv, password) => {
  try {
    const response = await axios.post("https://pycheck.xyz/api/v1/login", {
      masv,
      password,
    });
    return response;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};
export const addCode = async (masv, code) => {
  try {
    const response = await axios.post(
      "https://pycheck.xyz/api/v1/addCode",
      {
        masv,
        code,
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
export const changePass = async (msv, password, passNew) => {
  try {
    const response = await axios.post(
      "https://pycheck.xyz/api/v1/changePass",
      { msv, password, passNew },
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
export const updateBanner = async (msv, path) => {
  try {
    const response = await axios.post(
      "https://pycheck.xyz/api/v1/imageBanner",
      { msv, path },
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
export const updateImageProfile = async (msv, path) => {
  try {
    const response = await axios.post(
      "https://pycheck.xyz/api/v1/imageUser",
      { msv, path },
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
export const getInforUser = async (msv) => {
  try {
    const response = await axios.post(
      "https://pycheck.xyz/api/v1/inforUser",
      { msv },
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
export const searchUser = async (msv) => {
  try {
    const response = await axios.post(
      "https://pycheck.xyz/api/v1/searchUser",
      { msv },
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
export const cryptUser = (string) => {
  const secretKey = "Phamvanbao_0123";
  if (!string) {
    console.error("No sinhvien parameter found in URL.");
  } else {
    try {
      const bytes = CryptoJS.AES.decrypt(string, secretKey);
      const idShopString = bytes.toString(CryptoJS.enc.Utf8);

      if (!idShopString) {
        throw new Error("Decryption resulted in an empty string.");
      }

      let idShopArray = JSON.parse(idShopString);
      return idShopArray;
    } catch (error) {
      console.error("Failed to decrypt or parse the data:", error);
    }
  }
};
