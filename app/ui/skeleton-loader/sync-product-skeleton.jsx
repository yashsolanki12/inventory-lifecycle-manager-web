import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const SyncProductSkeleton = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "65vh",
        px: 3,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 480,
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.06)",
          backgroundColor: "#fff",
        }}
      >
        {/* Green header with skeleton */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #008060 0%, #006F60 50%, #004C3F 100%)",
            px: 4,
            py: 5,
            textAlign: "center",
          }}
        >
          <Skeleton
            variant="circular"
            width={64}
            height={64}
            sx={{ mx: "auto", mb: 2, backgroundColor: "rgba(255,255,255,0.2)" }}
          />
          <Skeleton
            variant="text"
            width="65%"
            height={28}
            sx={{ mx: "auto", mb: 1, backgroundColor: "rgba(255,255,255,0.2)" }}
          />
          <Skeleton
            variant="text"
            width="80%"
            height={16}
            sx={{ mx: "auto", backgroundColor: "rgba(255,255,255,0.15)" }}
          />
        </Box>

        {/* Feature rows skeleton */}
        <Box sx={{ px: 4, pt: 3, pb: 1 }}>
          {[1, 2, 3].map((i) => (
            <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 1 }}>
              <Skeleton
                variant="rounded"
                width={36}
                height={36}
                sx={{ borderRadius: "8px", flexShrink: 0 }}
              />
              <Skeleton variant="text" width={`${55 - i * 10}%`} height={18} />
            </Box>
          ))}
        </Box>

        {/* Button skeleton */}
        <Box sx={{ px: 4, pb: 4, pt: 2 }}>
          <Skeleton
            variant="rounded"
            width="100%"
            height={48}
            sx={{ borderRadius: "8px" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SyncProductSkeleton;
