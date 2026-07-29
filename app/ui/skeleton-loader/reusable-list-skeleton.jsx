import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const tableWrapper = (content) => (
  <Box
    sx={{
      flex: 1,
      minHeight: 0,
      maxHeight: "calc(100vh - 300px)",
      overflowY: "auto",
      borderRadius: "8px",
      "&::-webkit-scrollbar": { width: 6 },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#d1d5db",
        borderRadius: 3,
      },
      "&::-webkit-scrollbar-track": { backgroundColor: "#f9fafb" },
    }}
  >
    {content}
  </Box>
);

export const ReusableListSkeleton = ({ columns = [], skeletonCount = 10 }) =>
  tableWrapper(
    <Box component="table" sx={{ width: "100%", borderCollapse: "collapse" }}>
      <Box
        component="thead"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          backgroundColor: "#f9fafb",
        }}
      >
        <Box component="tr">
          {columns.map((col) => (
            <Box
              key={col.key}
              component="th"
              sx={{
                textAlign: "left",
                py: 1.5,
                px: 2,
                fontWeight: 600,
                fontSize: 14,
                color: "#6b7280",
                borderBottom: "2px solid #e5e7eb",
              }}
            >
              {col.label}
            </Box>
          ))}
        </Box>
      </Box>
      <Box component="tbody">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <Box
            component="tr"
            key={i}
            sx={{ borderBottom: "1px solid #ececec" }}
          >
            {columns.map((col) => (
              <Box component="td" key={col.key} sx={{ py: 2, px: 2 }}>
                <Skeleton
                  variant="text"
                  width={col.skeletonWidth || "80%"}
                  height={20}
                />
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>,
  );

export const PaginationSkeleton = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      mt: 3,
      pt: 2,
      borderTop: "1px solid #ececec",
    }}
  >
    <Skeleton variant="text" width={200} height={20} />
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Skeleton
        variant="rounded"
        width={32}
        height={32}
        sx={{ borderRadius: "6px" }}
      />
      <Skeleton variant="text" width={50} height={20} />
      <Skeleton
        variant="rounded"
        width={32}
        height={32}
        sx={{ borderRadius: "6px" }}
      />
    </Box>
  </Box>
);
