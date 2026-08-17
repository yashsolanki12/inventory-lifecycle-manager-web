import axios from "axios";

const getBaseURL = () => {
  // Server-side (SSR loaders): use full backend URL directly
  if (import.meta.env.SSR) {
    const backendDomain =
      import.meta.env.VITE_BACKEND_API_URL ||
      "https://inventory-lifecycle-manager-backend.onrender.com";
    return `${backendDomain}/api/`;
  }
  // Client-side: use relative URL so requests go through the server proxy
  // (avoids CORS/CSP issues in Shopify embedded iframe on Render)
  return "/api/";
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
