import axiosInstance from "./axios-instance";

export const getDeadStockTrend = (shop) => {
  if (!shop) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required");
  }
  return axiosInstance
    .get("analytics/dead-stock-trend", {
      params: { shop },
    })
    .then((res) => res.data)
    .catch((error) => {
      // console.error("Error while fetching dead stock trend:", error);
      throw error;
    });
};
