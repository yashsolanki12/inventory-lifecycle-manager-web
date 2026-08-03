import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const RuleFormSkeleton = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        maxWidth: 700,
        mx: "auto",
      }}
    >
      {/* Header with back arrow + title */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="text" width={180} height={32} />
      </Box>

      {/* Rule Name */}
      <Skeleton variant="rounded" width="100%" height={56} sx={{ borderRadius: "8px" }} />

      {/* Rule Condition */}
      <Skeleton variant="rounded" width="100%" height={56} sx={{ borderRadius: "8px" }} />

      {/* Days Without Sales + Operator */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Skeleton variant="rounded" width="50%" height={56} sx={{ borderRadius: "8px" }} />
        <Skeleton variant="rounded" width="50%" height={56} sx={{ borderRadius: "8px" }} />
      </Box>

      {/* Product Age + Stock Threshold */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Skeleton variant="rounded" width="50%" height={56} sx={{ borderRadius: "8px" }} />
        <Skeleton variant="rounded" width="50%" height={56} sx={{ borderRadius: "8px" }} />
      </Box>

      {/* Product Type */}
      <Skeleton variant="rounded" width="100%" height={56} sx={{ borderRadius: "8px" }} />

      {/* Vendor */}
      <Skeleton variant="rounded" width="100%" height={56} sx={{ borderRadius: "8px" }} />

      {/* Excluded Tags */}
      <Skeleton variant="rounded" width="100%" height={56} sx={{ borderRadius: "8px" }} />

      {/* Action Type */}
      <Skeleton variant="rounded" width="100%" height={56} sx={{ borderRadius: "8px" }} />

      {/* Stock Zero Switch */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Skeleton variant="rounded" width={44} height={24} sx={{ borderRadius: "12px" }} />
        <Skeleton variant="text" width={250} height={20} />
      </Box>

      {/* Submit Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Skeleton variant="rounded" width={100} height={36} sx={{ borderRadius: "4px" }} />
      </Box>
    </Box>
  );
};

export default RuleFormSkeleton;
