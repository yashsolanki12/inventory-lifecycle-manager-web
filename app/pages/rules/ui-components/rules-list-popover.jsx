import React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";

const RuleDetailsPopover = ({ item }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const productType = item.productType || "";
  const vendor = item.vendor || "";
  const excludedTags = item.excludedTags || [];
  const tags = Array.isArray(excludedTags)
    ? excludedTags
    : typeof excludedTags === "string" && excludedTags
      ? excludedTags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];
  if (!productType && !vendor && tags.length === 0) {
    return <Typography sx={{ fontSize: 14, color: "#9ca3af" }}>—</Typography>;
  }
  const summary = [
    productType && "Type",
    vendor && "Vendor",
    excludedTags.length > 0 && "Tags",
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <>
      <Box
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.5,
          cursor: "pointer",
          color: "#374151",
          "&:hover .arrow-icon": { opacity: 1 },
        }}
      >
        <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
          {summary}
        </Typography>
        <KeyboardArrowDownIcon
          className="arrow-icon"
          sx={{
            fontSize: 16,
            color: "#9ca3af",
            opacity: 0,
            transition: "opacity 0.15s",
          }}
        />
      </Box>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        onClose={() => setAnchorEl(null)}
        slotProps={{
          paper: {
            sx: {
              mt: 0.5,
              borderRadius: "10px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              border: "1px solid #e5e7eb",
              minWidth: 260,
              maxWidth: 340,
            },
          },
        }}
      >
        <Box sx={{ py: 0.5 }}>
          {productType && (
            <Box
              sx={{
                px: 2,
                py: 1.5,
                borderBottom:
                  vendor.length > 0 || tags.length > 0
                    ? "1px solid #b2b7c0"
                    : "none",
              }}
            >
              <Typography sx={{ fontSize: 13, color: "#9ca3af", mb: 0.3 }}>
                Product Type
              </Typography>
              <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                {productType}
              </Typography>
            </Box>
          )}
          {vendor && (
            <Box
              sx={{
                px: 2,
                py: 1.5,
                borderBottom: tags.length > 0 ? "1px solid #b2b7c0" : "none",
              }}
            >
              <Typography sx={{ fontSize: 13, color: "#9ca3af", mb: 0.3 }}>
                Vendor
              </Typography>
              <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                {vendor}
              </Typography>
            </Box>
          )}
          {excludedTags.length > 0 && (
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography sx={{ fontSize: 13, color: "#9ca3af", mb: 0.5 }}>
                Excluded Tags
              </Typography>
              <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                {tags.slice(0, 3).map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{
                      height: 22,
                      fontSize: 13,
                      fontWeight: 500,
                      backgroundColor: "#f3f4f6",
                      color: "#374151",
                      borderRadius: "4px",
                    }}
                  />
                ))}
                {tags.length > 3 && (
                  <Tooltip
                    title={tags.slice(3).join(", ")}
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
                        fontSize: 12,
                        color: "#9ca3af",
                        alignSelf: "center",
                        cursor: "default",
                      }}
                    >
                      +{tags.length - 3}
                    </Typography>
                  </Tooltip>
                )}
              </Box>
            </Box>
          )}
        </Box>
      </Popover>
    </>
  );
};

export default RuleDetailsPopover;
