import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ReusableList from "../../components/reusable-list";
import { listAllOrders } from "../../api/order";
import { useCurrentShopDomain } from "../../utils/helper";
import {
  ORDERS_COLUMNS,
  ordersRenderActions,
} from "../../utils/config/columns";
import {
  ORDERS_SORT_OPTIONS,
  ORDER_STATUS_FILTER_OPTIONS,
  ORDER_FINANCIAL_STATUS_FILTER_OPTIONS,
  ORDER_FULFILLMENT_STATUS_FILTER_OPTIONS,
} from "../../utils/config/constants";

const OrderListPage = () => {
  const shopDomain = useCurrentShopDomain();
  const fetchOrders = (params) => listAllOrders(shopDomain, params);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handlePreviewOrder = (item) => {
    if (item.previewUrl) window.open(item.previewUrl, "_blank");
  };

  const renderOrderAction = ordersRenderActions({
    onPreviewUrl: handlePreviewOrder,
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1450,
        mx: "auto",
        px: { xs: 1, sm: 2 },
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: 700, color: "#202223", fontSize: 24 }}
        >
          Orders
        </Typography>
      </Box>

      <ReusableList
        fetchFn={fetchOrders}
        queryKey="orders-list"
        columns={ORDERS_COLUMNS}
        actions={renderOrderAction}
        searchPlaceholder="Search by order..."
        sortOptions={ORDERS_SORT_OPTIONS}
        defaultSort="-createdAt"
        filters={[
          {
            param: "status",
            label: "Status",
            options: ORDER_STATUS_FILTER_OPTIONS,
          },
          {
            param: "financial_status",
            label: "Payment",
            options: ORDER_FINANCIAL_STATUS_FILTER_OPTIONS,
          },
          {
            param: "fulfillment_status",
            label: "Fulfillment",
            options: ORDER_FULFILLMENT_STATUS_FILTER_OPTIONS,
          },
        ]}
        defaultLimit={10}
        paginationText="orders"
      />

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
    </Box>
  );
};

export default OrderListPage;
