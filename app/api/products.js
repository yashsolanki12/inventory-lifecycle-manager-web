import axiosInstance from "./axios-instance";

export const syncProduct = async (shopDomain) => {
  if (!shopDomain) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required.");
  }

  return axiosInstance
    .post(
      "products/sync",
      {},
      {
        params: { shop: shopDomain },
      },
    )
    .then((res) => res.data)
    .catch((error) => {
      throw (
        error?.response?.data?.message || error?.message || "An error occurred"
      );
    });
};

export const listLocalDbProducts = async (
  shopDomain,
  {
    page = 1,
    limit = 10,
    search,
    sort = "createdAt",
    status,
  } = {},
) => {
  if (!shopDomain) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required.");
  }

  return axiosInstance
    .get("products/local", {
      params: { shop: shopDomain, page, limit, search, sort, status },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const getSingleProduct = async (shopDomain, productId) => {
  if (!shopDomain) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required.");
  }
  return axiosInstance
    .get("products", {
      params: { shop: shopDomain, productId },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const getProductTypes = async (
  shopDomain,
  { page = 1, limit = 10 } = {},
) => {
  if (!shopDomain) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required.");
  }
  return axiosInstance
    .get("products/types", {
      params: { shop: shopDomain, page, limit },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const getProductVendors = async (
  shopDomain,
  { page = 1, limit = 10 } = {},
) => {
  if (!shopDomain) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required.");
  }
  return axiosInstance
    .get("products/vendors", {
      params: { shop: shopDomain, page, limit },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const getProductTags = async (
  shopDomain,
  { page = 1, limit = 10 } = {},
) => {
  if (!shopDomain) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required.");
  }
  return axiosInstance
    .get("products/tags", {
      params: { shop: shopDomain, page, limit },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
