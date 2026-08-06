import axiosInstance from "./axios-instance";

export const getMovements = (shop, { productId, changeType, page = 1, limit = 20 } = {}) => {
  if (!shop) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required");
  }
  const params = { shop, page, limit };
  if (productId) params.productId = productId;
  if (changeType) params.changeType = changeType;
  return axiosInstance
    .get("analytics/movements", { params })
    .then((res) => res.data)
    .catch((error) => {
      // console.error("Error while fetching movements:", error);
      throw error;
    });
};
