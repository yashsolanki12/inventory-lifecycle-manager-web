import axios from "axios";

const getBaseURL = () => {
  // console.log("URL", import.meta.env.VITE_BACKEND_API_URL);
  // const backendLocalDomain =
  //   import.meta.env.VITE_BACKEND_API_URL ??
  //   "https://inventory-lifecycle-manager-backend.onrender.com"; //  http://localhost:3001;
  // return `${backendLocalDomain}/api/`;

  const backendDomain =
    "https://inventory-lifecycle-manager-backend.onrender.com";
  console.log("backend", backendDomain);

  return `${backendDomain}/api/`;
};

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  // timeout: 120000,
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
    // console.error("❌ API Error:", {
    //   status: error.response?.status,
    //   statusText: error.response?.statusText,
    //   url: error.config?.url,
    //   data: error.response?.data,
    //   message: error.response?.data.message
    // });
    return Promise.reject(error);
  },
);

export default axiosInstance;
