import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ReusableList from "../../components/reusable-list";
import { useCurrentShopDomain } from "../../utils/helper";
import { listLocalDbProducts } from "../../api/products";
import COLUMNS, { createRenderActions } from "../../utils/config/columns";
import { INVENTORY_SORT_OPTIONS, INVENTORY_FILTER_OPTIONS } from "../../utils/config/constants";

const InventoryPage = () => {
  const shopDomain = useCurrentShopDomain();

  const fetchProducts = (params) => listLocalDbProducts(shopDomain, params);

  const handleView = (item) => {
    console.log("handle view", item);
  };
  const handlePreviewProduct = (item) => {
    if (item.previewUrl) window.open(item.previewUrl, "_blank");
  };

  const renderActions = createRenderActions({
    onView: handleView,
    onPreviewUrl: handlePreviewProduct,
  });

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
      <Typography
        variant="h3"
        sx={{ fontWeight: 700, color: "#202223", mb: 3, fontSize: 30 }}
      >
        Inventory
      </Typography>

      <ReusableList
        fetchFn={fetchProducts}
        queryKey="products-local"
        columns={COLUMNS}
        actions={renderActions}
        searchPlaceholder="Search by product name..."
        sortOptions={INVENTORY_SORT_OPTIONS}
        defaultSort="-createdAt"
        filterOptions={INVENTORY_FILTER_OPTIONS}
        defaultFilter="active"
        filterParam="status"
        defaultLimit={10}
        paginationText="products"
      />
    </Box>
  );
};

export default InventoryPage;
