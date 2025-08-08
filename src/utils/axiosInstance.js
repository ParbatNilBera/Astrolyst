import axios from "axios";
import { BASE_URL } from "./apiPath";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Response Intercepter
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    //Handle Common Error Globally
    if (error.response.status === 401) {
      //Redirect to login page
      window.location.href = "/";
    } else if (error.response.status === 500) {
      //Redirect to login Page
      console.log("Server Error, Please try again later");
    } else if (error.code === "ECONNABORTED") {
      console.log("Request Timeout. Please try again later");
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
