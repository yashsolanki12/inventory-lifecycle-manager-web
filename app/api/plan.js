import axiosInstance from "./axios-instance";

export const syncPlanToBackend = async (shop, plan, chargeId) => {
  return axiosInstance
    .post("/rules/plan", { shop, plan, chargeId })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      // console.error("[Plan] Backend sync failed:", err.message);
      return null;
    });
};

export const resetPlanOnBackend = async (shop) => {
  return axiosInstance
    .post("/rules/plan", { shop, plan: "free", chargeId: null })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      // console.error("[Plan] Backend reset failed:", err.message);
      return null;
    });
};

export const getPlanFromBackend = async (shop) => {
  console.log("[Plan] GET /rules/plan shop=", shop, "baseURL=", axiosInstance.defaults.baseURL);
  return axiosInstance
    .get("/rules/plan", { params: { shop } })
    .then((res) => {
      console.log("[Plan] GET success", res.status, res.data);
      return res.data;
    })
    .catch((err) => {
      console.error("[Plan] GET failed:", err.message, err.code, err.response?.status, err.response?.data);
      return null;
    });
};
