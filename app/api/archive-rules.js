import axiosInstance from "./axios-instance";

export const getAllArchiveList = async (
  shop,
  { page = 1, limit = 10, search, sort },
) => {
  if (!shop) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required");
  }
  return axiosInstance
    .get("rules/rules", {
      params: {
        shop,
        page,
        limit,
        search,
        sort,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      // console.error("Error while fetching archive rules list:", error);
      throw error;
    });
};

export const createArchiveRule = async (shop, data) => {
  if (!shop) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required");
  }
  return axiosInstance
    .post("rules/rules", data, {
      params: {
        shop,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      // console.error(
      //   "Error while create archive rule:",
      //   error.response.data.message,
      // );
      throw error.response.data.message;
    });
};

export const updateArchiveRule = async (shop, data, id) => {
  if (!shop) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required");
  }
  return axiosInstance
    .put("rules/rules", data, {
      params: {
        shop,
        id: id,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      // console.error(
      //   "Error while update archive rule:",
      //   error.response.data.message,
      // );
      throw error.response.data.message;
    });
};

export const getArchiveRule = async (shop, id) => {
  if (!shop) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required");
  }
  return axiosInstance
    .get("rules/rules", {
      params: { shop, id },
    })
    .then((res) => res.data)
    .catch((error) => {
      // console.error("Error while get archive rule:", error);
      throw error;
    });
};

export const deleteArchiveRule = async (shop, id) => {
  if (!shop) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required");
  }
  return axiosInstance
    .delete("rules/rules", {
      params: {
        shop,
        id,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      // console.error("Error while get archive rule:", error);
      throw error;
    });
};

export const ruleMatch = async (
  shop,
  ruleIds,
  { page = 1, limit = 10 } = {},
) => {
  if (!shop) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required");
  }
  return axiosInstance
    .post(
      "products/scan/preview",
      { ruleId: ruleIds },
      {
        params: { shop, page, limit },
      },
    )
    .then((res) => res.data)
    .catch((error) => {
      // console.error("Error while matching rules:", error);
      throw error;
    });
};

export const runRule = async (shop, ruleIds) => {
  if (!shop) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required");
  }
  return axiosInstance
    .post(
      "products/scan/run",
      { ruleId: ruleIds },
      {
        params: { shop },
      },
    )
    .then((res) => res.data)
    .catch((error) => {
      // console.error("Error while running rule:", error.response.data.message);
      throw error.response.data.message;
    });
};

export const archiveHistory = async (
  shop,
  { page = 1, limit = 10, search, sort } = {},
) => {
  if (!shop) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required");
  }
  return axiosInstance
    .get("products/scan/history", {
      params: {
        shop,
        page,
        limit,
        search,
        sort,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const generateArchiveHistoryCsv = async (shop) => {
  if (!shop) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required");
  }
  return axiosInstance
    .post(
      "products/scan/history/export",
      {},
      {
        params: {
          shop,
        },
      },
    )
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
