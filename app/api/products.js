import axiosInstance from "./axios-instance";

export const syncProduct = async (shop) => {
  if (!shop) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required");
  }
  return axiosInstance
    .post(
      "products/sync",
      {},
      {
        params: {
          shop: shop,
        },
      },
    )
    .then((res) => res.data)
    .catch((error) => {
      console.error(
        "API Error while sync product",
        error.response.data.message,
      );
      throw error.response.data.message;
    });
};

export const listLocalDbProducts = async (
  shop,
  { page = 1, limit = 10, search, sort = "createdAt", status = "active" } = {},
) => {
  if (!shop) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required");
  }
  return axiosInstance
    .get("products/local", {
      params: {
        shop: shop,
        page,
        limit,
        search,
        sort,
        status,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error while fetching local Db Products:", error);
      throw error;
    });
};

export const getSingleProduct = async (shop, productId) => {
  if (!shop) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required");
  }
  return axiosInstance
    .get("products", {
      params: {
        shop: shop,
        productId: productId,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error while fetching single product:", error);
      throw error;
    });
};
