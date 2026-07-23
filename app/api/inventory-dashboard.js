import axiosInstance from "./axios-instance";

export const getInventoryDashboard = async (shop) => {
  if (!shop) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required");
  }
  return axiosInstance
    .get("analytics/dashboard", {
      params: {
        shop: shop,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error while fetching Inventory dashboard", error);
      throw error;
    });
};
