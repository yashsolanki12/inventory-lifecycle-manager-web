import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const AlertsSkeleton = ({ skeletonCount = 5 }) => (
  <Box
    sx={{
      width: "100%",
      maxWidth: 1450,
      mx: "auto",
      px: { xs: 1, sm: 2 },
      boxSizing: "border-box",
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
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Skeleton variant="text" width={120} height={32} />
        <Skeleton variant="rounded" width={70} height={22} sx={{ borderRadius: "11px" }} />
      </Box>
      <Skeleton variant="rounded" width={160} height={36} sx={{ borderRadius: "8px" }} />
    </Box>

    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      {Array.from({ length: skeletonCount }).map((_, i) => (
        <Box
          key={i}
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 2,
            p: 2,
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
            backgroundColor: "#ffffff",
          }}
        >
          <Skeleton
            variant="rounded"
            width={40}
            height={40}
            sx={{ borderRadius: "10px", flexShrink: 0 }}
          />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="60%" height={20} sx={{ mb: 0.5 }} />
            <Skeleton variant="text" width="80%" height={16} sx={{ mb: 0.5 }} />
            <Skeleton variant="text" width="30%" height={14} />
          </Box>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center", flexShrink: 0 }}>
            <Skeleton variant="rounded" width={50} height={26} sx={{ borderRadius: "6px" }} />
            <Skeleton variant="circular" width={28} height={28} />
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
);

export default AlertsSkeleton;
