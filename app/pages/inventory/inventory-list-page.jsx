import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ReusableList from "../../components/reusable-list";
import ConfirmDialog from "../../ui/confirmation-dialog";
import useInventorySubmit from "../../hooks/useInventorySubmit";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { generateProductCsv } from "../../api/generate-csv";
import { useCurrentShopDomain } from "../../utils/helper";
import { listLocalDbProducts } from "../../api/products";
import {
  createRenderActions,
  INVENTORY_COLUMNS,
} from "../../utils/config/columns";
import {
  INVENTORY_SORT_OPTIONS,
  INVENTORY_FILTER_OPTIONS,
} from "../../utils/config/constants";
import { useNavigate } from "react-router";

const InventoryListPage = () => {
  const shopDomain = useCurrentShopDomain();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [getProductStatus, setProductStatus] = React.useState("");
  const navigate = useNavigate();

  const fetchProducts = (params) => listLocalDbProducts(shopDomain, params);

  const handleView = (item) => {
    const productId = item.productId.split("/").pop();
    if (productId) {
      navigate(`/app/inventory/${productId}`);
    }
  };

  const handlePreviewProduct = (item) => {
    if (item.previewUrl) window.open(item.previewUrl, "_blank");
  };

  const renderActions = createRenderActions({
    onView: handleView,
    onPreviewUrl: handlePreviewProduct,
  });

  const generateProductCsvMutation = useInventorySubmit(
    ({ shop, status }) => generateProductCsv(shop, status),
    setSnackbar,
    {
      invalidateKeys: [["generate-product-csv"]],
      onSuccess: (data) => {
        if (data.data.totalRecords === 0) {
          setSnackbar({
            open: true,
            message: "No products found to export.",
            severity: "warning",
          });
        }
        if (
          data.data.totalRecords > 0 &&
          data?.success === true &&
          data?.data?.downloadUrl
        ) {
          window.open(data.data.downloadUrl, "_top");
        }
      },
    },
  );

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogConfirm = () => {
    if (!shopDomain) return;

    setOpenDialog(false);
    generateProductCsvMutation.mutate({
      shop: shopDomain,
      ...(getProductStatus && { status: getProductStatus }),
    });
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  const handleProductStatus = (item) => {
    setProductStatus(item);
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
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: 700, color: "#202223", fontSize: 24 }}
        >
          Inventory
        </Typography>
        <Button
          variant="outlined"
          startIcon={<FileDownloadIcon />}
          onClick={handleDialogOpen}
          sx={{
            borderColor: "#fffcfc",
            color: "#000000",
            backgroundColor: "#FFFFFF",
            textTransform: "none",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: 13,
            "&:hover": {
              borderColor: "#CBD5E1",
              backgroundColor: "#F8FAFC",
            },
          }}
        >
          Export
        </Button>
      </Box>

      <ReusableList
        fetchFn={fetchProducts}
        queryKey="products-local"
        columns={INVENTORY_COLUMNS}
        actions={renderActions}
        searchPlaceholder="Search by product name..."
        sortOptions={INVENTORY_SORT_OPTIONS}
        defaultSort="-createdAt"
        // enabled={!!shopDomain}
        filters={[
          {
            param: "status",
            label: "Status",
            options: INVENTORY_FILTER_OPTIONS,
          },
        ]}
        defaultLimit={10}
        paginationText="products"
        handleProductStatus={handleProductStatus}
      />

      <ConfirmDialog
        open={openDialog}
        title="Export Products"
        message="Are you sure you want to export your product data to a CSV file?"
        onConfirm={handleDialogConfirm}
        onClose={handleDialogClose}
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

export default InventoryListPage;
