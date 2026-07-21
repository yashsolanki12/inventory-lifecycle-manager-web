import axiosInstance from "./axios-instance";

export const syncPlanToBackend = async (shop, plan, chargeId) => {
  return axiosInstance
    .post("/rules/plan", { shop, plan, chargeId })
    .then((res) => {
      console.log("[Plan] Backend sync:", res.data);
      return res.data;
    })
    .catch((err) => {
      console.error("[Plan] Backend sync failed:", err.message);
      return null;
    });
};

export const resetPlanOnBackend = async (shop) => {
  return axiosInstance
    .post("/rules/plan", { shop, plan: "free", chargeId: null })
    .then((res) => {
      console.log("[Plan] Backend reset:", res.data);
      return res.data;
    })
    .catch((err) => {
      console.error("[Plan] Backend reset failed:", err.message);
      return null;
    });
};

export const getPlanFromBackend = async (shop) => {
  return axiosInstance
    .get("/rules/plan", { params: { shop } })
    .then((res) => res.data)
    .catch((err) => {
      console.error("[Plan] Backend fetch failed:", err.message);
      return null;
    });
};
