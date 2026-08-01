import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import useInventoryData from "../../../hooks/useInventoryData";
import {
  formatDate,
  MOVEMENT_CONFIG,
  PAGE_SIZE,
  useCurrentShopDomain,
} from "../../../utils/helper";
import { getMovements } from "../../../api/movements";
import TablePagination from "../../../components/TablePagination";

const formatReference = (ref) => {
  if (!ref) return "—";
  if (ref.startsWith("order:")) return `Order #${ref.split(":")[1]}`;
  if (ref.startsWith("location:")) return `Location ${ref.split(":")[1]}`;
  return ref;
};

const InventoryHistoryTab = ({ product }) => {
  const shopDomain = useCurrentShopDomain();
  const [page, setPage] = React.useState(1);

  const {
    data: responseData,
    isLoading,
    error,
  } = useInventoryData(
    ["movements", product?.productId, page],
    () =>
      getMovements(shopDomain, {
        productId: product?.productId,
        page,
        limit: PAGE_SIZE,
      }),
    null,
    { enabled: !!shopDomain && !!product?.productId },
  );

  const movements = responseData?.data?.items ?? [];
  const pagination = responseData?.data?.pagination ?? {};
  const { total = 0, totalPages = 0 } = pagination;

  if (isLoading) {
    return (
      <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
        <Typography sx={{ color: "#9ca3af", fontSize: 14 }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
        <Typography sx={{ color: "#b91c1c", fontSize: 14 }}>
          {error?.response?.data?.message ||
            error.message ||
            "Failed to load movements"}
        </Typography>
      </Box>
    );
  }

  if (movements.length === 0) {
    return (
      <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
        <Typography sx={{ color: "#9ca3af", fontSize: 14 }}>
          No inventory movements recorded yet.
        </Typography>
      </Box>
    );
  }

  const headers = ["Type", "Quantity", "Before", "After", "Reference", "Date"];

  return (
    <Box sx={{ p: { xs: 1.5, sm: 3 } }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: { xs: 14, sm: 16 }, color: "#0f1111" }}>
          Inventory Movements
        </Typography>
      </Box>

      {/* Desktop table */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr 1fr 1fr 1fr 1.2fr",
            gap: 1,
            px: 2,
            py: 1.5,
            backgroundColor: "#f9fafb",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          {headers.map((h) => (
            <Typography
              key={h}
              sx={{ fontSize: 12, fontWeight: 600, color: "#6b7280" }}
            >
              {h}
            </Typography>
          ))}
        </Box>

        {movements.map((m) => {
          const config =
            MOVEMENT_CONFIG[m.changeType] || MOVEMENT_CONFIG.initial;
          const qtyPrefix =
            m.changeType === "sale" || m.changeType === "removal" ? "-" : "+";
          return (
            <Box
              key={m.id}
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1.2fr 1fr 1fr 1fr 1.2fr",
                gap: 1,
                px: 2,
                py: 1.5,
                borderBottom: "1px solid #f3f4f6",
                alignItems: "center",
                "&:last-child": { borderBottom: "none" },
                "&:hover": { backgroundColor: "#f9fafb" },
              }}
            >
              <Chip
                label={config.label}
                size="small"
                sx={{
                  height: 22,
                  fontSize: 11,
                  fontWeight: 600,
                  backgroundColor: config.bg,
                  color: config.color,
                  borderRadius: "12px",
                  width: "fit-content",
                }}
              />
              <Typography
                sx={{ fontSize: 13, fontWeight: 600, color: "#0f1111" }}
              >
                {qtyPrefix}
                {m.quantity} units
              </Typography>
              <Typography sx={{ fontSize: 13, color: "#6b7280" }}>
                {m.previousQuantity ?? "—"}
              </Typography>
              <Typography sx={{ fontSize: 13, color: "#6b7280" }}>
                {m.newQuantity ?? "—"}
              </Typography>
              <Typography sx={{ fontSize: 12, color: "#6b7280" }}>
                {formatReference(m.reference)}
              </Typography>
              <Typography sx={{ fontSize: 12, color: "#6b7280" }}>
                {formatDate(m.createdAt)}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* Mobile cards */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        {movements.map((m) => {
          const config =
            MOVEMENT_CONFIG[m.changeType] || MOVEMENT_CONFIG.initial;
          const qtyPrefix =
            m.changeType === "sale" || m.changeType === "removal" ? "-" : "+";
          return (
            <Box
              key={m.id}
              sx={{
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                p: 1.5,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Chip
                  label={config.label}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: 11,
                    fontWeight: 600,
                    backgroundColor: config.bg,
                    color: config.color,
                    borderRadius: "12px",
                    width: "fit-content",
                  }}
                />
                <Typography sx={{ fontSize: 12, color: "#6b7280" }}>
                  {formatDate(m.createdAt)}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#0f1111" }}>
                {qtyPrefix}
                {m.quantity} units
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Typography sx={{ fontSize: 12, color: "#6b7280" }}>
                  Before: {m.previousQuantity ?? "—"}
                </Typography>
                <Typography sx={{ fontSize: 12, color: "#6b7280" }}>
                  After: {m.newQuantity ?? "—"}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: 12, color: "#6b7280" }}>
                {formatReference(m.reference)}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {totalPages > 1 && (
        <TablePagination
          page={page}
          totalPages={totalPages}
          total={total}
          limit={PAGE_SIZE}
          onPageChange={setPage}
        />
      )}
    </Box>
  );
};

export default InventoryHistoryTab;
