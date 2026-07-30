import React from "react";
import { useParams, useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InventoryViewSkeleton from "../../ui/skeleton-loader/inventory-view-skeleton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useInventoryData from "../../hooks/useInventoryData";
import { getSingleProduct } from "../../api/products";
import { useCurrentShopDomain } from "../../utils/helper";
import { INVENTORY_STATUS_CONFIG } from "../../utils/config/constants";
import ProductImageZoom from "../../components/product-image-zoom";

const FALLBACK_IMAGE = "/fallback-image.jpg";

const InventoryViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const shopDomain = useCurrentShopDomain();
  const [selectedImage, setSelectedImage] = React.useState(0);

  const { data: responseData, isLoading } = useInventoryData(
    ["single-product", id],
    () => getSingleProduct(shopDomain, id),
    null,
    { enabled: !!shopDomain && !!id },
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

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 2 }, maxWidth: 1200, mx: "auto" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3 }}>
        <Box
          sx={{
            color: "#374151",
            backgroundColor: "#ffffff",
            padding: 0.02,
            borderRadius: 50,
            border: "1px solid #bfd3e6",
            "&:hover": {
              backgroundColor: "#f3f4f6",
              border: "1px solid #CBD5E1",
            
            },
          }}
        >
          <IconButton onClick={() => navigate("/app/inventory")}>
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, color: "#0f1111", fontSize: 24 }}
        >
          {product.title}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box sx={{ display: "flex", gap: 2, flex: 1 }}>
          {allImages.length > 1 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                maxHeight: 320,
                overflowY: "auto",
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
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Box>
              ))}
            </Box>
          )}
          <ProductImageZoom
            imageUrl={mainImage?.url || FALLBACK_IMAGE}
            altText={mainImage?.altText || product.title}
          >
            <Box sx={{ width: { xs: "100%", md: 600 }, flexShrink: 0 }}>
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
                {/* Product Type */}
                {product.title && (
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
                      Title
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14, color: "#0f1111", fontWeight: 500 }}
                    >
                      {product.title}
                    </Typography>
                  </Box>
                )}

                {/* Product Type */}
                {product.productType && (
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
                      Product Type
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14, color: "#0f1111", fontWeight: 500 }}
                    >
                      {product.productType}
                    </Typography>
                  </Box>
                )}

                {/* Vendor */}
                {product.vendor && (
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
                      Vendor
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 14,
                        color: "#0f1111",
                        fontWeight: 500,
                      }}
                    >
                      {product.vendor}
                    </Typography>
                  </Box>
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
                            fontSize: 11,
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

                {/* Stock */}
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
                    Stock
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: "#0f1111",
                      fontWeight: 500,
                    }}
                  >
                    {product.totalInventory ?? 0} units
                  </Typography>
                </Box>

                {/* SKU */}
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
                    SKU
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: "#0f1111",
                      fontWeight: 500,
                    }}
                  >
                    {sku}
                  </Typography>
                </Box>

                {/* Last Sold At */}
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
                    Last Sold At
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: "#0f1111",
                      fontWeight: 500,
                    }}
                  >
                    {product.lastSoldAt
                      ? new Date(product.lastSoldAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                            timeZone: "UTC",
                          },
                        )
                      : "—"}
                  </Typography>
                </Box>

                {/* Created At */}
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
                    Created At
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: "#0f1111",
                      fontWeight: 500,
                    }}
                  >
                    {product.createdAt
                      ? new Date(product.createdAt).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                          timeZone: "UTC",
                        })
                      : "—"}
                  </Typography>
                </Box>

                {/* Status */}
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
                  {statusConfig && (
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
                      }}
                    />
                  )}
                </Box>
              </Box>
            </Box>
          </ProductImageZoom>
        </Box>
      </Box>
    </Box>
  );
};

export default InventoryViewPage;
