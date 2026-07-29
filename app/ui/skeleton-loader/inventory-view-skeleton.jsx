import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const InventoryViewSkeleton = () => {
  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 2 }, maxWidth: 1200, mx: "auto" }}>
      <Skeleton variant="text" width={300} height={40} sx={{ mb: 3 }} />
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} variant="rounded" width={44} height={44} />
            ))}
          </Box>
          <Skeleton variant="rounded" width={360} height={320} />
        </Box>
        <Box sx={{ width: { xs: "100%", md: 700 } }}>
          <Box
            sx={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              px: 4,
              py: 4,
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <Box key={i} sx={{ display: "flex", alignItems: "center" }}>
                <Skeleton
                  variant="text"
                  width={120}
                  height={16}
                  sx={{ mr: 2 }}
                />
                <Skeleton
                  variant="text"
                  width="60%"
                  height={18}
                  sx={{ ml: "auto" }}
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
