import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import useInventoryData from "../../../hooks/useInventoryData";
import TablePagination from "../../../components/TablePagination";
import ErrorCard from "../../../components/error-card";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { formatDate, useCurrentShopDomain } from "../../../utils/helper";
import { getMovements } from "../../../api/movements";
import {
  INVENTORY_HISTORY_HEADER,
  MOVEMENT_CONFIG,
  PAGE_SIZE,
} from "../../../utils/config/constants";

const formatReference = (ref) => {
  if (!ref) return "—";
  if (ref.startsWith("order:")) return `Order #${ref.split(":")[1]}`;
  if (ref.startsWith("location:")) return `Location ${ref.split(":")[1]}`;
  return ref;
};

const InventoryHistoryTab = ({ product }) => {
  const shopDomain = useCurrentShopDomain();
  const scrollRef = React.useRef(null);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    if (
      scrollRef.current &&
      scrollRef.current.scrollHeight > scrollRef.current.clientHeight
    ) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [page]);

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
      <ErrorCard
        errorMessage={
          error?.response?.data?.message || "Failed to load inventory movements"
        }
      />
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
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: { xs: 14, sm: 18 },
            color: "#0f1111",
          }}
        >
          Inventory Movements
        </Typography>
        {page > 1 && (
          <IconButton
            size="small"
            onClick={() => setPage(1)}
            sx={{
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              px: 1,
              color: "#6b7280",
              backgroundColor: "white",
              fontSize: 12,
              "&:hover": {
                backgroundColor: "#ffebee",
                borderColor: "#d1d5db",
              },
            }}
          >
            <CloseIcon sx={{ fontSize: 16, mr: 0.5 }} />
            <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
              Clear
            </Typography>
          </IconButton>
        )}
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
          {INVENTORY_HISTORY_HEADER.map((h) => (
            <Typography
              key={h}
              sx={{ fontSize: 14, fontWeight: 600, color: "#6b7280" }}
            >
              {h}
            </Typography>
          ))}
        </Box>

        <Box
          ref={scrollRef}
          sx={{
            maxHeight: "calc(100vh - 560px)",
            overflowY: "auto",
            "&::-webkit-scrollbar": { width: 6 },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#d1d5db",
              borderRadius: 3,
            },
            "&::-webkit-scrollbar-track": { backgroundColor: "#f9fafb" },
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
                    fontSize: 13,
                    fontWeight: 500,
                    backgroundColor: config.bg,
                    color: config.color,
                    borderRadius: "6px",
                    width: "fit-content",
                  }}
                />
                <Typography
                  sx={{ fontSize: 14, fontWeight: 600, color: "#0f1111" }}
                >
                  {qtyPrefix}
                  {m.quantity} units
                </Typography>
                <Typography sx={{ fontSize: 14, color: "#6b7280" }}>
                  {m.previousQuantity ?? "—"}
                </Typography>
                <Typography sx={{ fontSize: 14, color: "#6b7280" }}>
                  {m.newQuantity ?? "—"}
                </Typography>
                <Typography sx={{ fontSize: 14, color: "#6b7280" }}>
                  {formatReference(m.reference)}
                </Typography>
                <Typography sx={{ fontSize: 14, color: "#6b7280" }}>
                  {formatDate(m.createdAt)}
                </Typography>
              </Box>
            );
          })}
        </Box>
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
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
                <Typography sx={{ fontSize: 12, color: "#6b7280" }}>
                  {formatDate(m.createdAt)}
                </Typography>
              </Box>
              <Typography
                sx={{ fontSize: 14, fontWeight: 600, color: "#0f1111" }}
              >
                {qtyPrefix} {m.quantity} units
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
          paginationText="history"
        />
      )}
    </Box>
  );
};
export default InventoryHistoryTab;
