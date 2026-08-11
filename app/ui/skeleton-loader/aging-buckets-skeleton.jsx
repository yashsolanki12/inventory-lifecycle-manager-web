import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const AgingBucketsSkeleton = () => (
  <Box
    sx={{
      width: "100%",
      mx: "auto",
      px: { xs: 2, sm: 3 },
      py: 3,
      boxSizing: "border-box",
    }}
  >
    {/* Page title: "Aging Bucket" */}
    <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 1 }}>
      <Skeleton variant="text" width={140} height={30} />
    </Box>

    {/* Main card container */}
    <Box
      sx={{
        borderRadius: "14px",
        border: "1px solid #ececec",
        boxShadow: "0 8px 24px rgba(0,0,0,.04)",
        p: "24px",
      }}
    >
      {/* Description text: "Set custom aging buckets for inventory age." */}
      <Skeleton variant="text" width={260} height={18} sx={{ mb: 3 }} />

      <Box sx={{ mt: 1 }}>
        {/* Table header row: "Bucket Name" | "Days Range" */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            pb: 1,
            mb: 1,
            borderBottom: "2px solid #e5e7eb",
            gap: 24,
          }}
        >
          {/* "Bucket Name" header */}
          <Skeleton variant="text" width={100} height={14} />
          {/* "Days Range" header */}
          <Skeleton variant="text" width={100} height={14} />
        </Box>

        {/* Bucket rows: Fresh (1), Mild (2), Aging (3), Dead (4) */}
        {[1, 2, 3, 4].map((i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              alignItems: "center",
              py: 1.5,
              borderBottom: i < 4 ? "1px solid #f3f4f6" : "none",
              gap: 9,
            }}
          >
            {/* Bucket name box: e.g. "Fresh 0 to 30 days" */}
            <Skeleton
              variant="rounded"
              width={220}
              height={40}
              sx={{ borderRadius: "8px", flexShrink: 0 }}
            />
            {/* Range controls area */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {/* Static start value box, e.g. "0" */}
              <Skeleton
                variant="rounded"
                width={70}
                height={32}
                sx={{ borderRadius: "6px" }}
              />
              {/* "to" text */}
              <Skeleton variant="text" width={20} height={18} />
              {/* Dropdown select for end value */}
              {i < 4 ? (
                <Skeleton
                  variant="rounded"
                  width={120}
                  height={32}
                  sx={{ borderRadius: "8px" }}
                />
              ) : (
                /* Dead bucket: "∞ (auto)" text instead of dropdown */
                <Skeleton variant="text" width={50} height={18} />
              )}
              {/* Delete icon: only on Mild (2) and Aging (3) rows */}
              {i >= 2 && i < 4 && (
                <Skeleton variant="circular" width={32} height={32} />
              )}
            </Box>
          </Box>
        ))}
      </Box>

      {/* Footer: Add button (left) + Reset & Save buttons (right) */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 4,
          pt: 3,
          borderTop: "1px solid #ececec",
        }}
      >
        {/* Left: "Add Mild" or "Add Aging" button */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Skeleton
            variant="rounded"
            width={110}
            height={36}
            sx={{ borderRadius: "8px" }}
          />
        </Box>
        {/* Right: "Reset to Default" + "Save Configuration" buttons */}
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Skeleton
            variant="rounded"
            width={140}
            height={36}
            sx={{ borderRadius: "8px" }}
          />
          <Skeleton
            variant="rounded"
            width={150}
            height={36}
            sx={{ borderRadius: "8px" }}
          />
        </Box>
      </Box>
    </Box>
  </Box>
);

export default AgingBucketsSkeleton;
