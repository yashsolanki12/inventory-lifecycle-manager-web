import axiosInstance from "./axios-instance";

export const getAgingBuckets = async (shop) => {
  if (!shop) throw new Error("Shop domain is required");
  return axiosInstance
    .get("inventory/aging-buckets", { params: { shop } })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const updateAgingBuckets = async (shop, data) => {
  if (!shop) throw new Error("Shop domain is required");
  return axiosInstance
    .put("inventory/aging-buckets", data, { params: { shop } })
    .then((res) => res.data)
    .catch((error) => {
      throw error.response?.data?.message || error.message;
    });
};

export const resetAgingBuckets = async (shop) => {
  if (!shop) throw new Error("Shop domain is required");
  return axiosInstance
    .post("inventory/aging-buckets/reset", {}, { params: { shop } })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
