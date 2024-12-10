import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInstance = axios.create({
  baseURL: "http://192.168.1.100:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("userToken");

    try {
      const token = await AsyncStorage.getItem("userToken"); // Retrieve the token from AsyncStorage

      if (token) {
        // If token exists, add it to the Authorization header
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error retrieving token from AsyncStorage:", error);
      // Continue without a token if there's an error
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;
