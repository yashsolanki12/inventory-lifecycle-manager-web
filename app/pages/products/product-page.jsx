import React from "react";
import useInventoryData from "../../hooks/useInventoryData";
import useInventorySubmit from "../../hooks/useInventorySubmit";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { syncProduct } from "../../api/products";
import { useCurrentShopDomain } from "../../utils/helper";
import { getInventoryDashboard } from "../../api/inventory-dashboard";

const ProductPage = () => {
  const shopDomain = useCurrentShopDomain();
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };
  const createSyncAllProductMutation = useInventorySubmit(
    (shop) => syncProduct(shop),
    setSnackbar,
    {
      invalidateKeys: [["sync-product"]],
    },
  );

  const syncAllProduct = () => {
    createSyncAllProductMutation.mutate(shopDomain);
  };
  const { data: inventoryDashboardData, isLoading: inventoryDashboardLoading } =
    useInventoryData(
      ["inventory-dashboard-data"],
      () => getInventoryDashboard(shopDomain),
      null,
    );
  return (
    <>
      <h2>This is products page</h2>
      <button onClick={syncAllProduct}>Sync product</button>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={snackbar.severity === "error" ? 5000 : 3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductPage;
