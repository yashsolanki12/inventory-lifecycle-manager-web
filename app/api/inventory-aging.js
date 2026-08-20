import axiosInstance from "./axios-instance";

export const getAgingBucket = (
  shopDomain,
  {
    page = 1,
    limit = 10,
    bucket = "dead",
  } = {},
) => {
  if (!shopDomain) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required.");
  }
  return axiosInstance
    .get("inventory/aging", {
      params: { shop: shopDomain, page, limit, bucket },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const populateSnapshot = (shopDomain) => {
  if (!shopDomain) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required.");
  }
  return axiosInstance
    .post(
      "inventory/populate-snapshots",
      {},
      {
        params: { shop: shopDomain },
      },
    )
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
