import React from "react";
import { useParams, useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import InventoryViewSkeleton from "../../ui/skeleton-loader/inventory-view-skeleton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useInventoryData from "../../hooks/useInventoryData";
import ProductImageZoom from "../../components/product-image-zoom";
import TabPanel from "./ui-components/TabPanel";
import OverviewTab from "./ui-components/OverviewTab";
import InventoryHistoryTab from "./ui-components/InventoryHistoryTab";
import SalesHistoryTab from "./ui-components/SalesHistoryTab";
import VariantsTab from "./ui-components/VariantsTab";
import { getSingleProduct } from "../../api/products";
import {
  formatDate,
  formatPrice,
  useCurrentShopDomain,
} from "../../utils/helper";
import {
  INVENTORY_STATUS_CONFIG,
  STOCK_STATUS_CONFIG,
} from "../../utils/config/constants";

const FALLBACK_IMAGE = "/fallback-image.jpg";

const InventoryViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const shopDomain = useCurrentShopDomain();
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [activeTab, setActiveTab] = React.useState(0);

  const { data: responseData, isLoading } = useInventoryData(
    ["single-product", id],
    () => getSingleProduct(shopDomain, id),
    null,
  );

  const product = responseData?.data;
  const allImages = product?.images?.length
    ? product.images
    : product?.image
      ? [product.image]
      : [];
  const mainImage = allImages[selectedImage] || product?.image || null;
  const statusConfig =
    INVENTORY_STATUS_CONFIG[product?.status?.toUpperCase()] || null;

  if (isLoading) {
    return <InventoryViewSkeleton />;
  }

  if (!product) {
    return (
      <Box sx={{ p: { xs: 2, sm: 3, md: 2 }, maxWidth: 1200, mx: "auto" }}>
        <Typography sx={{ color: "#9ca3af", fontSize: 16 }}>
          Product not found.
        </Typography>
      </Box>
    );
  }

  const sku = product.variants?.[0]?.sku || "—";
  const inventoryValue =
    product.inventoryValue === 0
      ? product.inventoryValue
      : formatPrice(product.currencyCode, product.inventoryValue);

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 2 }, maxWidth: 1200, mx: "auto" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 1.5, sm: 1 },
          mb: { xs: 2, sm: 3 },
        }}
      >
        <Box
          sx={{
            color: "#374151",
            padding: 0.02,
            "&:hover": {
              color: "#0f1111",
            },
          }}
        >
          <IconButton onClick={() => navigate("/app/inventory")}>
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            color: "#0f1111",
            fontSize: { xs: 18, sm: 24 },
          }}
        >
          {product.title}
        </Typography>
        {product.previewUrl && (
          <Tooltip
            title="Open Preview"
            arrow
            placement="right"
            slotProps={{
              tooltip: {
                sx: {
                  lineHeight: 2,
                  fontSize: "12px",
                },
              },
            }}
          >
            <IconButton
              onClick={() => window.open(product.previewUrl, "_blank")}
              sx={{
                borderRadius: 0,
                transition: "none",
                "--IconButton-hoverBg": "transparent",
              }}
            >
              ↗
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* Image & Product Info */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flex: 1,
            flexDirection: { xs: "column", sm: "row" },
            overflowX: { xs: "auto", sm: "visible" },
          }}
        >
          {/* Thumbnails */}
          {allImages.length > 1 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "row", sm: "column" },
                gap: 0.5,
                maxHeight: { sm: 320 },
                width: { xs: "auto", sm: 54 },
                overflowX: { xs: "auto", sm: "visible" },
                overflowY: { xs: "visible", sm: "auto" },
                pb: { xs: 0.5, sm: 0 },
                pr: { xs: 0, sm: 0.5 },
                flexShrink: 0,
                "&::-webkit-scrollbar": { width: 4, height: 4 },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#d1d5db",
                  borderRadius: 2,
                },
                "&::-webkit-scrollbar-track": { backgroundColor: "#f9fafb" },
              }}
            >
              {allImages.map((img, i) => (
                <Box
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  onMouseEnter={() => setSelectedImage(i)}
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: "8px",
                    overflow: "hidden",
                    cursor: "pointer",
                    flexShrink: 0,
                    border:
                      i === selectedImage
                        ? "2px solid #8CAECE"
                        : "2px solid transparent",
                    opacity: i === selectedImage ? 1 : 0.6,
                    backgroundColor: "#f3f4f6",
                    transition: "all 0.15s ease",
                    "&:hover": { opacity: 1 },
                  }}
                >
                  <Box
                    component="img"
                    src={img.url || FALLBACK_IMAGE}
                    alt={img.altText || ""}
                    sx={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </Box>
              ))}
            </Box>
          )}

          {/* Main Image & Details */}
          <ProductImageZoom
            imageUrl={mainImage?.url || FALLBACK_IMAGE}
            altText={mainImage?.altText || product.title}
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                  px: 2,
                  py: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {/* Product Title */}
                {/* {product.title && (
                  <InfoRow label="Title" value={product.title} />
                )} */}

                {/* SKU */}
                <InfoRow label="SKU" value={sku} />

                {/* Stock */}
                <InfoRow
                  label="Stock"
                  value={`${product.totalInventory ?? 0} units`}
                />

                {/* Product Age */}
                {product.productAgeDays && (
                  <InfoRow
                    label="Inventory Age"
                    value={product.productAgeDays}
                  />
                )}

                {/* Last sale */}
                {product.daysWithoutSales && (
                  <InfoRow label="Last Sale" value={product.daysWithoutSales} />
                )}

                {/* Inventory Value */}
                {product.inventoryValue != null && (
                  <InfoRow label="Inventory Value" value={inventoryValue} />
                )}

                {/* Status */}
                {statusConfig && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#9ca3af",
                        flexShrink: 0,
                      }}
                    >
                      Status
                    </Typography>
                    <Chip
                      label={statusConfig.label}
                      size="small"
                      sx={{
                        backgroundColor: statusConfig.bg,
                        color: statusConfig.color,
                        fontWeight: 600,
                        fontSize: 12,
                        height: 26,
                        borderRadius: "6px",
                        border: `1px solid ${statusConfig.color}20`,
                        px: 0.4,
                      }}
                    />
                  </Box>
                )}

                {/* Stock Status */}
                {product.stockStatus &&
                  (() => {
                    const stockKey =
                      product.stockStatus?.toLowerCase() || "Never Sold";
                    const stockConfig =
                      STOCK_STATUS_CONFIG[stockKey] ||
                      STOCK_STATUS_CONFIG.never_sold;
                    return (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: "#9ca3af",
                            flexShrink: 0,
                          }}
                        >
                          Stock Status
                        </Typography>

                        <Chip
                          label={stockConfig.label}
                          size="small"
                          sx={{
                            backgroundColor: stockConfig.bg,
                            color: stockConfig.color,
                            fontWeight: 600,
                            fontSize: 12,
                            height: 26,
                            borderRadius: "6px",
                            border: `1px solid ${stockConfig.color}20`,
                            px: 0.4,
                          }}
                        />
                      </Box>
                    );
                  })()}

                {/* Product Type */}
                {product.productType && (
                  <InfoRow label="Product Type" value={product.productType} />
                )}

                {/* Vendor */}
                {product.vendor && (
                  <InfoRow label="Vendor" value={product.vendor} />
                )}

                {/* Tags */}
                {product.tags?.length > 0 && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#9ca3af",
                        flexShrink: 0,
                      }}
                    >
                      Tags
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 0.5,
                        alignItems: "center",
                        flex: 1,
                        justifyContent: "flex-end",
                      }}
                    >
                      {product.tags.slice(0, 2).map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{
                            height: 22,
                            fontSize: 14,
                            fontWeight: 500,
                            backgroundColor: "#f3f4f6",
                            color: "#0f1111",
                            borderRadius: "4px",
                          }}
                        />
                      ))}
                      {product.tags.length > 2 && (
                        <Tooltip
                          title={product.tags.slice(2).join(", ")}
                          arrow
                          placement="top"
                          slotProps={{
                            tooltip: {
                              sx: {
                                lineHeight: 2,
                                fontSize: "13px",
                              },
                            },
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: 11,
                              color: "#9ca3af",
                              cursor: "default",
                            }}
                          >
                            +{product.tags.length - 2}
                          </Typography>
                        </Tooltip>
                      )}
                    </Box>
                  </Box>
                )}

                {/* <InfoRow
                  label="Last Sold At"
                  value={
                    product.lastSoldAt
                      ? new Date(product.lastSoldAt).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                          timeZone: "UTC",
                        })
                      : "—"
                  }
                /> */}
                {/* Created At */}
                <InfoRow
                  label="Created At"
                  value={
                    product.createdAt ? formatDate(product.createdAt) : "—"
                  }
                />
              </Box>
            </Box>
          </ProductImageZoom>
        </Box>
      </Box>

      {/* Master Tabs Section */}
      <Box
        sx={{
          mt: 3,
          backgroundColor: "#fff",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            overflowX: "auto",
            "&::-webkit-scrollbar": { height: 0 },
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              minHeight: 48,
              px: { xs: 1, sm: 2 },
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 600,
                fontSize: { xs: 12, sm: 14 },
                color: "#6b7280",
                minHeight: 48,
                minWidth: { xs: 0, sm: "auto" },
                px: { xs: 1.5, sm: 2 },
                "&.Mui-selected": {
                  color: "#005EA2",
                  backgroundColor: "#F6F6F7",
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#005EA2",
                height: 3,
              },
            }}
          >
            <Tab label="Overview" />
            <Tab label="Inventory History" />
            <Tab label="Sales History" />
            <Tab label="Variants" />
          </Tabs>
        </Box>

        <TabPanel value={activeTab} index={0}>
          <OverviewTab product={product} />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <InventoryHistoryTab product={product} />
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
          <SalesHistoryTab product={product} />
        </TabPanel>
        <TabPanel value={activeTab} index={3}>
          <VariantsTab variants={product.variants} />
        </TabPanel>
      </Box>
    </Box>
  );
};

const InfoRow = ({ label, value }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <Typography
      sx={{
        fontSize: 14,
        fontWeight: 600,
        color: "#9ca3af",
        flexShrink: 0,
      }}
    >
      {label}
    </Typography>
    <Typography sx={{ fontSize: 14, color: "#0f1111", fontWeight: 500 }}>
      {value}
    </Typography>
  </Box>
);

export default InventoryViewPage;
