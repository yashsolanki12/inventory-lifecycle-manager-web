import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import {
  INVENTORY_VIEW_TABS_LABEL,
  INVENTORY_VIEW_TABS_STATS_CARD,
} from "../../utils/config/constants";

const InventoryViewSkeleton = () => {
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
        <Skeleton variant="circular" width={24} height={24} />
        <Skeleton
          variant="text"
          sx={{ width: { xs: 160, sm: 240 } }}
          height={32}
        />
        <Skeleton variant="text" width={20} height={24} />
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
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flex: 1,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Skeleton
              variant="rounded"
              sx={{
                width: { xs: "100%", sm: "100%", md: 360 },
                height: { xs: 200, sm: 240, md: 320 },
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
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Skeleton variant="text" width={40} height={16} />
                  <Skeleton variant="text" width={80} height={18} />
                </Box>

                {/* Stock */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Skeleton variant="text" width={50} height={16} />
                  <Skeleton variant="text" width={70} height={18} />
                </Box>

                {/* Inventory Age */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Skeleton variant="text" width={100} height={16} />
                  <Skeleton variant="text" width={80} height={18} />
                </Box>

                {/* Last Sale */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Skeleton variant="text" width={70} height={16} />
                  <Skeleton variant="text" width={90} height={18} />
                </Box>

                {/* Inventory Value */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Skeleton variant="text" width={110} height={16} />
                  <Skeleton variant="text" width={100} height={18} />
                </Box>

                {/* Status Chip */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Skeleton variant="text" width={50} height={16} />
                  <Skeleton
                    variant="rounded"
                    width={70}
                    height={26}
                    sx={{ borderRadius: "6px" }}
                  />
                </Box>

                {/* Stock Status Chip */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Skeleton variant="text" width={90} height={16} />
                  <Skeleton
                    variant="rounded"
                    width={60}
                    height={26}
                    sx={{ borderRadius: "6px" }}
                  />
                </Box>

                {/* Product Type */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Skeleton variant="text" width={95} height={16} />
                  <Skeleton variant="text" width={80} height={18} />
                </Box>

                {/* Vendor */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Skeleton variant="text" width={55} height={16} />
                  <Skeleton variant="text" width={90} height={18} />
                </Box>

                {/* Tags */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Skeleton variant="text" width={40} height={16} />
                  <Box sx={{ display: "flex", gap: 0.5 }}>
                    <Skeleton
                      variant="rounded"
                      width={60}
                      height={22}
                      sx={{ borderRadius: "4px" }}
                    />
                    <Skeleton
                      variant="rounded"
                      width={50}
                      height={22}
                      sx={{ borderRadius: "4px" }}
                    />
                  </Box>
                </Box>

                {/* Created At */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Skeleton variant="text" width={80} height={16} />
                  <Skeleton variant="text" width={120} height={18} />
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
            borderBottom: 1,
            borderColor: "divider",
            overflowX: "auto",
            "&::-webkit-scrollbar": { height: 0 },
          }}
        >
          {INVENTORY_VIEW_TABS_LABEL.map((tab, i) => (
            <Skeleton
              key={tab}
              variant="text"
              sx={{
                width: tab.length * 9,
                height: 20,
                mx: 2,
                my: 1.5,
                opacity: i === 0 ? 1 : 0.5,
              }}
            />
          ))}
        </Box>

        {/* Tab Content */}
        <Box
          sx={{
            p: { xs: 1.5, sm: 3 },
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* Stat Cards Skeleton */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(4, 1fr)" },
              borderRadius: "14px",
              border: "1px solid #ececec",
              boxShadow: "0 8px 24px rgba(0,0,0,.04)",
              overflow: "hidden",
              backgroundColor: "#fff",
            }}
          >
            {INVENTORY_VIEW_TABS_STATS_CARD.map((label, i) => (
              <Box
                key={label}
                sx={{
                  px: { xs: 1.5, sm: 2.5 },
                  py: 2,
                  borderRight: {
                    sm:
                      i === INVENTORY_VIEW_TABS_STATS_CARD.length - 1
                        ? "none"
                        : "1px solid #e5e7eb",
                  },
                  borderBottom: {
                    xs:
                      i === INVENTORY_VIEW_TABS_STATS_CARD.length - 1
                        ? "none"
                        : "1px solid #e5e7eb",
                    sm: "none",
                  },
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                }}
              >
                <Skeleton variant="text" width="60%" height={14} />
                <Skeleton variant="text" width="45%" height={20} />
              </Box>
            ))}
          </Box>

          {/* Charts Skeleton */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 3,
            }}
          >
            {["Sales Trend", "Inventory Trend"].map((title) => (
              <Box
                key={title}
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "14px",
                  border: "1px solid #ececec",
                  boxShadow: "0 8px 24px rgba(0,0,0,.04)",
                  p: { xs: "16px", sm: "24px" },
                }}
              >
                <Skeleton
                  variant="text"
                  width="35%"
                  height={20}
                  sx={{ mb: 2.5 }}
                />
                <Skeleton
                  variant="rounded"
                  width="100%"
                  height={240}
                  sx={{ borderRadius: "8px" }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InventoryViewSkeleton;
