import axiosInstance from "./axios-instance";

export const listAllOrders = async (
  shop,
  {
    page = 1,
    limit = 10,
    search,
    sort = "createdAt",
    fulfillment_status,
    financial_status,
    status,
  },
) => {
  if (!shop) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required");
  }
  return axiosInstance
    .get("orders", {
      params: {
        shop: shop,
        page,
        limit,
        search,
        sort,
        fulfillment_status,
        financial_status,
        status,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      // console.error("Error while fetching list order:", error);
      throw error;
    });
};
