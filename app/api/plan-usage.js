import axiosInstance from "./axios-instance";

export const getPlanUsage = (shop) => {
  if (!shop) {
    throw new Error("Shop domain is required");
  }
  return axiosInstance
    .get("/rules/plan", { params: { shop } })
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error fetching plan usage:", error);
      throw error;
    });
};
