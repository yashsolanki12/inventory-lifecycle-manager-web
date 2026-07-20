import axios from "axios";

function getBackendBaseURL() {
  return "http://localhost:3001";
}

export const api = axios.create({
  baseURL: getBackendBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
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
  }
);

export function setShopDomain(shop) {
  api.defaults.headers.common["x-shopify-shop-domain"] = shop;
}

export async function backendGet(path, config = {}) {
  const response = await api.get(path, config);
  return response.data;
}

export async function backendPost(path, data, config = {}) {
  const response = await api.post(path, data, config);
  return response.data;
}

export async function backendPut(path, data, config = {}) {
  const response = await api.put(path, data, config);
  return response.data;
}

export async function backendDelete(path, config = {}) {
  const response = await api.delete(path, config);
  return response.data;
}
