// axiosUtils.js
import {  useNavigate } from "react-router-dom";
import { base_url } from "../constants/constants";
import axios from "axios";


const axiosInstance = axios.create({
    base_url
    // Other common configuration options can go here
});

// Add a request interceptor to include the token in each request
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    // Attach the token to the Authorization header if it exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common response logic
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle error responses
    if (error.response && error.response.status === 401) {
      // Redirect to login page or perform other actions for unauthorized access
      localStorage.removeItem("token")
      const navigate = useNavigate()
      // navigate("/login")
      console.log("Unauthorized access. Redirecting to login...");
    }
    
    return Promise.reject(error);
  }
);
function isUserAuthenticated() {
    // This might involve checking the presence of a valid token using a interceptors, for example
    const token = localStorage.getItem("token");
    return token !== null && token !== undefined;
  }

export default {axiosInstance,isUserAuthenticated};
