import axios from "axios";

// Define and export the base URL
// export const baseURL = "https://api.psinepal.com.np";
export const baseURL = "http://localhost:8081";

const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 40000,
});

// // Request Interceptor (Attach sessionStorage JWT if available)
// axiosClient.interceptors.request.use(
//   (config) => {
//     const token = sessionStorage.getItem("jwt");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Response Interceptor (Handle global errors/logging)
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;
