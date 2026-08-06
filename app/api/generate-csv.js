import axiosInstance from "./axios-instance";

export const generateProductCsv = async (shop, status) => {
  if (!shop) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required");
  }
  return axiosInstance
    .post("products/export", {}, { params: { shop: shop, status } })
    .then((res) => res.data)
    .catch((error) => {
      // console.error("Error while generate product csv:", error);
      throw error;
    });
};
