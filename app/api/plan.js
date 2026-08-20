import axiosInstance from "./axios-instance";

export const syncPlanToBackend = async (shopDomain, plan, chargeId) => {
  if (!shopDomain) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required.");
  }
  return axiosInstance
    .post(
      "/rules/plan",
      { shop: shopDomain, plan, chargeId },
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error("[Plan] Backend sync failed:", err.message);
      return null;
    });
};

export const resetPlanOnBackend = async (shopDomain) => {
  if (!shopDomain) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required.");
  }
  return axiosInstance
    .post(
      "/rules/plan",
      { shop: shopDomain, plan: "free", chargeId: null },
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error("[Plan] Backend reset failed:", err.message);
      return null;
    });
};

export const getPlanFromBackend = async (shopDomain) => {
  if (!shopDomain) {
    console.error("[Plan] No shop domain found in URL parameters.");
    throw new Error("Shop domain is required.");
  }
  return axiosInstance
    .get("/rules/plan", {
      params: { shop: shopDomain },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error("[Plan] Backend fetch failed:", err.message);
      return null;
    });
};
