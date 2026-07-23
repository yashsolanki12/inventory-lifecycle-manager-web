import axiosInstance from "./axios-instance";

export const syncProduct = async (shopDomain) => {
  if (!shopDomain) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required");
  }
  return axiosInstance
    .post(
      "products/sync",
      {},
      {
        params: {
          shop: shopDomain,
        },
      },
    )
    .then((res) => res.data)
    .catch((error) => {
      console.error("API Error while sync product", error);
      throw error;
    });
};
