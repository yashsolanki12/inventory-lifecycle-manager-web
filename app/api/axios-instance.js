import axios from "axios";

const getBaseURL = () => {
  // const backendDomain = "http://localhost:3001";
  const backendDomain =
    "https://inventory-lifecycle-manager-backend.onrender.com";
  console.log("VITE_URL", import.meta.env.VITE_BACKEND_API_URL);
  return `${backendDomain}/api/`;
};

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  },
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("❌ API Error:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      data: error.response?.data,
    });
    return Promise.reject(error);
  },
);

export default axiosInstance;
