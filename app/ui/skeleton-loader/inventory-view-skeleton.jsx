import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const InventoryViewSkeleton = () => {
  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 2 }, maxWidth: 1200, mx: "auto" }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 3 }, mb: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            color: "#374151",
            backgroundColor: "#ffffff",
            padding: 0.02,
            borderRadius: 50,
            border: "1px solid #bfd3e6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
          }}
        >
          <Skeleton variant="circular" width={24} height={24} />
        </Box>
        <Skeleton variant="text" sx={{ width: { xs: 200, sm: 300 } }} height={32} />
      </Box>

      {/* Image & Product Info */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box sx={{ display: "flex", gap: 2, flex: 1, flexDirection: { xs: "column", sm: "row" }, overflowX: { xs: "auto", sm: "visible" } }}>
          {/* Thumbnails */}
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
            }}
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton
                key={i}
                variant="rounded"
                width={38}
                height={38}
                sx={{ borderRadius: "8px", flexShrink: 0 }}
              />
            ))}
          </Box>

          {/* Main Image & Details */}
          <Box sx={{ display: "flex", gap: 2, flex: 1, flexDirection: { xs: "column", sm: "row" } }}>
            <Skeleton
              variant="rounded"
              sx={{
                width: { xs: "100%", sm: 360 },
                minHeight: { xs: 200, sm: 260 },
                maxHeight: { xs: 360, sm: 320 },
                borderRadius: "12px",
                flexShrink: 0,
              }}
            />
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
            gap: { xs: 1, sm: 2 },
            px: { xs: 1.5, sm: 2 },
            py: 1.5,
            borderBottom: "1px solid #e5e7eb",
            overflowX: "auto",
          }}
        >
          {["Overview", "Inventory History", "Sales History", "Variants"].map(
            (_, i) => (
              <Skeleton
                key={i}
                variant="rounded"
                width={{ xs: 90, sm: 110 }}
                height={28}
                sx={{ borderRadius: "6px", flexShrink: 0 }}
              />
            ),
          )}
        </Box>

        {/* Tab Content */}
        <Box sx={{ p: { xs: 2, sm: 3 } }}>
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
