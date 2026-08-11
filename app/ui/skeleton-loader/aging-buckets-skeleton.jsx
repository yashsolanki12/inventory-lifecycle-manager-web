import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const AgingBucketsSkeleton = () => (
  <Box
    sx={{
      width: "100%",
      maxWidth: 900,
      mx: "auto",
      px: { xs: 2, sm: 3 },
      py: 3,
      boxSizing: "border-box",
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 1 }}>
      <Skeleton variant="text" width={280} height={32} />
    </Box>

    <Box
      sx={{
        borderRadius: "14px",
        border: "1px solid #ececec",
        boxShadow: "0 8px 24px rgba(0,0,0,.04)",
        p: "24px",
      }}
    >
      <Skeleton variant="text" width="70%" height={18} sx={{ mb: 3 }} />

      <Box sx={{ mt: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            pb: 1,
            mb: 1,
            borderBottom: "2px solid #e5e7eb",
            gap: 4,
          }}
        >
          <Skeleton variant="text" width={120} height={16} sx={{ width: 220 }} />
          <Skeleton variant="text" width={100} height={16} />
        </Box>

        {[1, 2, 3, 4].map((i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              alignItems: "center",
              py: 1.5,
              borderBottom: i < 4 ? "1px solid #f3f4f6" : "none",
              gap: 4,
            }}
          >
            <Skeleton variant="rounded" width={220} height={40} sx={{ borderRadius: "8px" }} />
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Skeleton variant="rounded" width={70} height={32} sx={{ borderRadius: "6px" }} />
              <Skeleton variant="text" width={20} height={18} />
              <Skeleton variant="rounded" width={120} height={32} sx={{ borderRadius: "8px" }} />
              {i > 2 && <Skeleton variant="circular" width={32} height={32} />}
            </Box>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 4,
          pt: 3,
          borderTop: "1px solid #ececec",
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <Skeleton variant="rounded" width={110} height={36} sx={{ borderRadius: "8px" }} />
        </Box>
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Skeleton variant="rounded" width={140} height={36} sx={{ borderRadius: "8px" }} />
          <Skeleton variant="rounded" width={150} height={36} sx={{ borderRadius: "8px" }} />
        </Box>
      </Box>
    </Box>
  </Box>
);

export default AgingBucketsSkeleton;
