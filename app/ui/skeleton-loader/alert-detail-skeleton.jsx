import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const AlertDetailSkeleton = ({ rowsCount = 6 }) => (
  <Box
    sx={{
      p: { xs: 2, sm: 3, md: 2 },
      maxWidth: 1200,
      mx: "auto",
    }}
  >
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 3,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Skeleton variant="circular" width={36} height={36} />
        <Skeleton variant="text" width={140} height={30} />
      </Box>
      <Skeleton variant="rounded" width={80} height={34} sx={{ borderRadius: "8px" }} />
    </Box>

    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
        p: 3,
        mb: 3,
      }}
    >
      <Skeleton variant="text" width="60%" height={24} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="80%" height={18} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="40%" height={16} />
    </Box>

    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 120px 50px",
          px: 3,
          py: 1.5,
          backgroundColor: "#f9fafb",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <Skeleton variant="text" width={60} height={14} />
        <Skeleton variant="text" width={50} height={14} />
        <Skeleton variant="text" width={30} height={14} />
      </Box>

      <Box>
        {Array.from({ length: rowsCount }).map((_, i) => (
          <Box
            key={i}
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 120px 50px",
              alignItems: "center",
              px: 3,
              py: 1.5,
              borderBottom: "1px solid #f3f4f6",
              "&:last-child": { borderBottom: "none" },
            }}
          >
            <Skeleton variant="text" width={`${50 + Math.random() * 30}%`} height={18} />
            <Skeleton variant="rounded" width={60} height={24} sx={{ borderRadius: "6px" }} />
            <Skeleton variant="circular" width={28} height={28} />
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          py: 1.5,
          borderTop: "1px solid #e5e7eb",
        }}
      >
        <Skeleton variant="text" width={120} height={14} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Skeleton variant="circular" width={28} height={28} />
          <Skeleton variant="text" width={40} height={14} />
          <Skeleton variant="circular" width={28} height={28} />
        </Box>
      </Box>
    </Box>
  </Box>
);

export default AlertDetailSkeleton;
