import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import TabPanel from "./TabPanel";
import DetailItem from "./DetailItem";
import { formatPrice, getColorHex } from "../../../utils/helper";

const VariantsTab = ({ variants }) => {
  const [selectedVariant, setSelectedVariant] = React.useState(0);
  if (!variants?.length) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography sx={{ color: "#9ca3af", fontSize: 14 }}>
          No variants available for this product.
        </Typography>
      </Box>
    );
  }

  const selectedVariantData = variants[selectedVariant];
  const selectedColorOption = selectedVariantData?.selectedOptions?.find(
    (opt) =>
      ["color", "colour", "Color", "COLOR"].includes(opt.name.toLowerCase()),
  );
  const selectedColorHex = selectedColorOption
    ? getColorHex(selectedColorOption.value)
    : null;

  return (
    <Box>
      {/* Variant Sub-Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", px: 2 }}>
        <Tabs
          value={selectedVariant}
          onChange={(_, newValue) => setSelectedVariant(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            minHeight: 40,
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 600,
              fontSize: 14,
              color: "#6b7280",
              minHeight: 40,
              "&.Mui-selected": {
                color: selectedColorHex || "#005EA2",
                backgroundColor: "#F6F6F7",
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: selectedColorHex || "#005EA2",
              height: 3,
            },
          }}
        >
          {variants.map((variant, index) => {
            const colorOption = variant.selectedOptions?.find((opt) =>
              ["color", "colour", "Color", "COLOR"].includes(
                opt.name.toLowerCase(),
              ),
            );
            const colorHex = colorOption
              ? getColorHex(colorOption.value)
              : null;

            return (
              <Tab
                key={variant.id}
                sx={{
                  textTransform: "none",
                  minHeight: 40,
                }}
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {colorHex && (
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          backgroundColor: colorHex,
                          border:
                            colorHex === "#ffffff"
                              ? "1px solid #e5e7eb"
                              : "1px solid transparent",
                          flexShrink: 0,
                        }}
                      />
                    )}
                    <Typography
                      component="span"
                      sx={{
                        fontSize: 14,
                        fontWeight: 600,
                        textTransform: "none",
                      }}
                    >
                      {variant.title || `Variant ${index + 1}`}
                    </Typography>
                  </Box>
                }
              />
            );
          })}
        </Tabs>
      </Box>

      {/* Variant Content */}
      {variants.map((variant, index) => (
        <TabPanel key={variant.id} value={selectedVariant} index={index}>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              flexDirection: { xs: "column", md: "row" },
              p: 3,
            }}
          >
            {/* Variant Image */}
            {variant.image && (
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: "10px",
                  overflow: "hidden",
                  flexShrink: 0,
                  backgroundColor: "#f3f4f6",
                  border: "1px solid #e5e7eb",
                }}
              >
                <Box
                  component="img"
                  src={variant.image.url}
                  alt={variant.image.altText || variant.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            )}

            {/* Variant Details */}
            <Box
              sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
            >
              <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                <DetailItem label="Title" value={variant.title || "—"} />
                <DetailItem
                  label="Price"
                  value={formatPrice(variant.currencyCode, variant.price)}
                />
                <DetailItem label="SKU" value={variant.sku || "—"} />
                <DetailItem
                  label="Stock"
                  value={`${variant.inventoryQuantity ?? 0} units`}
                />
              </Box>

              {/* Selected Options */}
              {variant.selectedOptions?.length > 0 && (
                <Box>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#9ca3af",
                      mb: 1,
                      textTransform: "none",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Options
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                    {variant.selectedOptions.map((opt) => {
                      const colorHex = getColorHex(opt.value);
                      const isColor =
                        opt.name?.toLowerCase() === "color" ||
                        "colour" ||
                        "Color" ||
                        ("COLOR" && colorHex);

                      return (
                        <Box
                          key={opt.name}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            backgroundColor: "#f9fafb",
                            border: "1px solid #e5e7eb",
                            borderRadius: "8px",
                            px: 1.5,
                            py: 0.75,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: 14,
                              fontWeight: 500,
                              color: "#6b7280",
                            }}
                          >
                            {opt.name}: {opt.value}
                          </Typography>
                          {isColor ? (
                            <Tooltip
                              title={opt.value}
                              arrow
                              placement="top"
                              slotProps={{
                                tooltip: {
                                  sx: {
                                    lineHeight: 2,
                                    fontSize: "14px",
                                  },
                                },
                              }}
                            >
                              <Box
                                sx={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: "50%",
                                  backgroundColor: colorHex,
                                  border:
                                    colorHex === "#ffffff"
                                      ? "2px solid #e5e7eb"
                                      : "2px solid transparent",
                                  cursor: "pointer",
                                  transition: "transform 0.15s ease",
                                  "&:hover": {
                                    transform: "scale(1.2)",
                                  },
                                }}
                              />
                            </Tooltip>
                          ) : (
                            <Typography
                              sx={{
                                fontSize: 14,
                                fontWeight: 600,
                                color: "#0f1111",
                              }}
                            >
                              {opt.value}
                            </Typography>
                          )}
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              )}

              {/* Location Info */}
              {variant.locations?.length > 0 && (
                <Box>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#9ca3af",
                      mb: 1,
                      textTransform: "none",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Location
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {variant.locations.map((loc) => (
                      <Chip
                        key={loc.id}
                        label={loc.name}
                        size="small"
                        sx={{
                          height: 24,
                          fontSize: 14,
                          fontWeight: 500,
                          backgroundColor: "#eff6ff",
                          color: "#1d4ed8",
                          borderRadius: "6px",
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {/* Tracking Status */}
              <Box sx={{ display: "flex", gap: 4 }}>
                <DetailItem
                  label="Tracking"
                  value={variant.tracked ? "Enabled" : "Disabled"}
                />
                <DetailItem label="Barcode" value={variant.barcode || "—"} />
              </Box>
            </Box>
          </Box>
        </TabPanel>
      ))}
    </Box>
  );
};

export default VariantsTab;
