import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const formFieldSkeletonSx = {
  borderRadius: "8px",
};

const RuleFormSkeleton = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        mx: "auto",
        backgroundColor: "white",
        padding: "20px 30px",
        borderRadius: 3,
      }}
    >
      {/* Header with back arrow + title */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          sx={{ flexShrink: 0 }}
        />
        <Skeleton variant="text" width={180} height={32} />
      </Box>

      {/* Rule Name + Rule Condition */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Skeleton
          variant="rounded"
          width="50%"
          height={56}
          sx={formFieldSkeletonSx}
        />
        <Skeleton
          variant="rounded"
          width="50%"
          height={56}
          sx={formFieldSkeletonSx}
        />
      </Box>

      {/* Days Without Sales + Operator */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Skeleton
          variant="rounded"
          width="50%"
          height={56}
          sx={formFieldSkeletonSx}
        />
        <Skeleton
          variant="rounded"
          width="50%"
          height={56}
          sx={formFieldSkeletonSx}
        />
      </Box>

      {/* Product Age + Stock Threshold */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Skeleton
          variant="rounded"
          width="50%"
          height={56}
          sx={formFieldSkeletonSx}
        />
        <Skeleton
          variant="rounded"
          width="50%"
          height={56}
          sx={formFieldSkeletonSx}
        />
      </Box>

      {/* Product Type + Vendor */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Skeleton
          variant="rounded"
          width="50%"
          height={56}
          sx={formFieldSkeletonSx}
        />
        <Skeleton
          variant="rounded"
          width="50%"
          height={56}
          sx={formFieldSkeletonSx}
        />
      </Box>

      {/* Excluded Tags + Action Type */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Skeleton
          variant="rounded"
          width="50%"
          height={56}
          sx={formFieldSkeletonSx}
        />
        <Skeleton
          variant="rounded"
          width="50%"
          height={56}
          sx={formFieldSkeletonSx}
        />
      </Box>

      {/* Stock Zero Switch */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Skeleton
          variant="rounded"
          width={44}
          height={24}
          sx={{ borderRadius: "12px" }}
        />
        <Skeleton variant="text" width={250} height={20} />
      </Box>

      {/* Cancel + Submit Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "flex-end",
          mt: 2,
        }}
      >
        <Skeleton variant="rounded" width={100} height={36} sx={{ borderRadius: "8px" }} />
        <Skeleton variant="rounded" width={100} height={36} sx={{ borderRadius: "8px" }} />
      </Box>
    </Box>
  );
};

export default RuleFormSkeleton;
