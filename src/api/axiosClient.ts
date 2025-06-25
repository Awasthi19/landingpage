import axios from "axios";

// Define and export the base URL
export const baseURL = "http://13.234.122.212:8081";
// export const baseURL = "http://localhost:8081";

const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
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
