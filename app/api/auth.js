import axiosInstance from "./axios-instance";

export const authPostSync = async (sessionShop) => {
  if (!sessionShop) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required");
  }
  return axiosInstance
    .post("/auth/post-setup", { shop: sessionShop })
    .then((res) => console.log("[App] Backend post-setup:", res.data))
    .catch((err) =>
      console.error("[App] Backend post-setup failed:", err.message),
    );
};
