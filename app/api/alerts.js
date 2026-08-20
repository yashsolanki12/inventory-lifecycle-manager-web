import axiosInstance from "./axios-instance";

export const getAlerts = async (
  shop,
  { page = 1, limit = 10, type, unreadOnly } = {},
) => {
  if (!shop) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required");
  }
  return axiosInstance
    .get("alerts", {
      params: { shop, page, limit, type, unreadOnly },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const markAlertsRead = async (shop, alertIds) => {
  if (!shop) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required");
  }
  return axiosInstance
    .post("alerts/mark-read", { alertIds }, { params: { shop } })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const markAllAlertsRead = async (shop) => {
  if (!shop) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required");
  }
  return axiosInstance
    .post("alerts/mark-all-read", {}, { params: { shop } })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const getAlertById = async (shop, alertId, { page = 1, limit = 10 } = {}) => {
  if (!shop) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required");
  }
  return axiosInstance
    .get("alerts", {
      params: { shop, id: alertId, page, limit },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const generateAlerts = async (shop) => {
  if (!shop) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required");
  }
  return axiosInstance
    .post("alerts/generate", {}, { params: { shop } })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
