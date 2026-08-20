import axiosInstance from "./axios-instance";

export const getInventoryDashboard = async (shopDomain) => {
  if (!shopDomain) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required.");
  }
  return axiosInstance
    .get("analytics/dashboard", {
      params: { shop: shopDomain },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
