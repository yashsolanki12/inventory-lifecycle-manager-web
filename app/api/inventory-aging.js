import axiosInstance from "./axios-instance";

export const getAgingBucket = (
  shop,
  { page = 1, limit = 10, bucket = "dead" } = {},
) => {
  if (!shop) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required");
  }
  return axiosInstance
    .get("inventory/aging", {
      params: {
        shop,
        page,
        limit,
        bucket,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error while fetching getAgingBucket:", error);
      throw error;
    });
};

export const populateSnapshot = (shop) => {
  if (!shop) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required");
  }
  return axiosInstance
    .post(
      "inventory/populate-snapshots",
      {},
      {
        params: {
          shop: shop,
        },
      },
    )
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error in populateSnapshot API:", error);
      throw error;
    });
};
