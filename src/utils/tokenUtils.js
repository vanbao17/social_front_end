import { jwtDecode } from "jwt-decode";

export const getUserInfoFromToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decodedToken = jwtDecode(token);

      // Bạn có thể truy xuất các thuộc tính bên trong token
      const { MSV, Name, LSH, Dob, Image_user, Image_banner, Code } =
        decodedToken;

      return decodedToken;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  } else {
    console.error("No token found in localStorage");
  }

  return null;
};
export const token = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
