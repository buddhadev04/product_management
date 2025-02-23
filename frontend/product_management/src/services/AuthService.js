import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL || "https://product-management-lxrm.onrender.com"; 

export const signIn = async (email, password) => {
  try {
    const response = await axios.post(`${baseURL}/signin`, { email, password });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      return { success: true, token: response.data.token };
    } else {
      return { success: false, error: "Invalid credentials" };
    }
  } catch (err) {
    return { success: false, error: err.response?.data?.message || "Login failed. Please check your credentials." };
  }
};
export const updateCredentials = async (email, oldPassword, newPassword) => {
    try {
      const response = await axios.patch(`${baseURL}/change-password`, {
        email,
        oldPassword,
        newPassword,
      });
  
      return { success: true, message: response.data.message };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || "Failed to update password." };
    }
  };


  export const signUp = async (email, password) => {
    try {
        console.log(email, password);
      const response = await axios.post(`${baseURL}/signup`, { email, password });
      return { success: true, message: response.data.message };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || "Sign-up failed." };
    }
  };
  
