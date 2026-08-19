import axios from "axios";

const getBaseURL = () => {
  if (typeof window !== "undefined") {
    const isLocal =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    if (!isLocal) {
      return "/api/";
    }
  }
  // Server-side (SSR / route loaders): use process.env because
  // import.meta.env.VITE_* is only inlined for client-side Vite builds.
  const backendDomain =
    // eslint-disable-next-line no-undef
    (typeof process !== "undefined" && process.env?.VITE_BACKEND_API_URL) ||
    "http://localhost:3001";
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
      message: error.message,
      code: error.code,
      baseURL: error.config?.baseURL,
    });
    return Promise.reject(error);
  },
);

export default axiosInstance;
