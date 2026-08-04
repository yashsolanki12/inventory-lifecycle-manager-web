import React from "react";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

export const LineItemsPopover = ({ lineItems, children }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box onClick={handleClick}>{children}</Box>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              mt: 0.5,
              borderRadius: "10px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              border: "1px solid #e5e7eb",
              minWidth: 320,
              maxWidth: 420,
              maxHeight: 300,
              overflowY: "auto",
            },
          },
        }}
      >
        {lineItems.length === 0 ? (
          <Typography sx={{ p: 2, fontSize: 13, color: "#9ca3af" }}>
            No items
          </Typography>
        ) : (
          lineItems.map((li, i) => (
            <Box
              key={li.id || i}
              sx={{
                display: "flex",
                gap: 1.5,
                p: 1.5,
                borderBottom:
                  i < lineItems.length - 1 ? "1px solid #f3f4f6" : "none",
                "&:hover": { backgroundColor: "#f9fafb" },
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "8px",
                  overflow: "hidden",
                  flexShrink: 0,
                  backgroundColor: "#f3f4f6",
                  backgroundImage: `url(${li.image?.url || "/fallback-image.jpg"})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3 }}
                >
                  {li.title}
                </Typography>
                {li.variantTitle && (
                  <Typography sx={{ fontSize: 12, color: "#6b7280", mt: 0.3 }}>
                    Variant: {li.variantTitle}
                  </Typography>
                )}
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    mt: 0.3,
                    flexWrap: "wrap",
                  }}
                >
                  {li.sku && (
                    <Typography sx={{ fontSize: 12, color: "#9ca3af" }}>
                      SKU: {li.sku}
                    </Typography>
                  )}
                  <Typography sx={{ fontSize: 12, color: "#9ca3af" }}>
                    Qty: {li.quantity}
                  </Typography>
                  {li.price && (
                    <Typography sx={{ fontSize: 12, color: "#9ca3af" }}>
                      Price: {li.price}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          ))
        )}
      </Popover>
    </>
  );
};
