import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const InventoryViewSkeleton = () => {
  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 2 }, maxWidth: 1200, mx: "auto" }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="text" width={300} height={32} />
      </Box>

      {/* Image & Product Info */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box sx={{ display: "flex", gap: 2, flex: 1 }}>
          {/* Thumbnails */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              maxHeight: 320,
              width: 54,
            }}
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton
                key={i}
                variant="rounded"
                width={38}
                height={38}
                sx={{ borderRadius: "8px" }}
              />
            ))}
          </Box>

          {/* Main Image & Details */}
          <Box sx={{ display: "flex", gap: 2, flex: 1 }}>
            <Skeleton
              variant="rounded"
              width={600}
              height={320}
              sx={{ borderRadius: "12px", flexShrink: 0 }}
            />
            <Box sx={{ flex: 1 }}>
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
                {/* SKU */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Skeleton variant="text" width={80} height={16} />
                  <Skeleton variant="text" width={100} height={18} />
                </Box>

                {/* Stock */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Skeleton variant="text" width={60} height={16} />
                  <Skeleton variant="text" width={80} height={18} />
                </Box>

                {/* Inventory Age */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Skeleton variant="text" width={110} height={16} />
                  <Skeleton variant="text" width={90} height={18} />
                </Box>

                {/* Last Sale */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Skeleton variant="text" width={80} height={16} />
                  <Skeleton variant="text" width={100} height={18} />
                </Box>

                {/* Inventory Value */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Skeleton variant="text" width={130} height={16} />
                  <Skeleton variant="text" width={120} height={18} />
                </Box>

                {/* Status Chip */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Skeleton variant="text" width={60} height={16} />
                  <Skeleton variant="rounded" width={80} height={24} sx={{ borderRadius: "16px" }} />
                </Box>

                {/* Stock Status Chip */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Skeleton variant="text" width={100} height={16} />
                  <Skeleton variant="rounded" width={70} height={24} sx={{ borderRadius: "16px" }} />
                </Box>

                {/* Product Type */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Skeleton variant="text" width={110} height={16} />
                  <Skeleton variant="text" width={90} height={18} />
                </Box>

                {/* Vendor */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Skeleton variant="text" width={70} height={16} />
                  <Skeleton variant="text" width={100} height={18} />
                </Box>

                {/* Tags */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Skeleton variant="text" width={50} height={16} />
                  <Skeleton variant="rounded" width={120} height={22} sx={{ borderRadius: "4px" }} />
                </Box>

                {/* Created At */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Skeleton variant="text" width={90} height={16} />
                  <Skeleton variant="text" width={140} height={18} />
                </Box>
              </Box>
            </Box>
          </Box>
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
        {/* Tabs */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            px: 2,
            py: 1.5,
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          {["Overview", "Inventory History", "Sales History", "Variants"].map(
            (_, i) => (
              <Skeleton
                key={i}
                variant="rounded"
                width={110}
                height={28}
                sx={{ borderRadius: "6px" }}
              />
            ),
          )}
        </Box>

        {/* Tab Content */}
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <Box key={i} sx={{ display: "flex", gap: 2 }}>
                <Skeleton variant="rounded" width={120} height={16} />
                <Skeleton variant="rounded" width="60%" height={16} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InventoryViewSkeleton;
