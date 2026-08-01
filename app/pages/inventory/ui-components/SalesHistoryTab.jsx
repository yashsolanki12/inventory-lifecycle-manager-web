import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import useInventoryData from "../../../hooks/useInventoryData";
import { formatDate, PAGE_SIZE, useCurrentShopDomain } from "../../../utils/helper";
import { getMovements } from "../../../api/movements";
import TablePagination from "../../../components/TablePagination";

const formatReference = (ref) => {
  if (!ref) return "—";
  if (ref.startsWith("order:")) return `Order #${ref.split(":")[1]}`;
  return ref;
};

const SalesHistoryTab = ({ product }) => {
  const shopDomain = useCurrentShopDomain();
  const [page, setPage] = React.useState(1);

  const {
    data: responseData,
    isLoading,
    error,
  } = useInventoryData(
    ["sales-movements", product?.productId, page],
    () =>
      getMovements(shopDomain, {
        productId: product?.productId,
        changeType: "sale",
        page,
        limit: PAGE_SIZE,
      }),
    null,
    { enabled: !!shopDomain && !!product?.productId },
  );

  const sales = responseData?.data?.items ?? [];
  const pagination = responseData?.data?.pagination ?? {};
  const { total = 0, totalPages = 0 } = pagination;
  const totalUnitsSold = sales.reduce((sum, s) => sum + (s.quantity || 0), 0);

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
            "Failed to load sales history"}
        </Typography>
      </Box>
    );
  }

  if (sales.length === 0) {
    return (
      <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
        <Typography sx={{ color: "#9ca3af", fontSize: 14 }}>
          No sales recorded yet.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 1.5, sm: 3 } }}>
      <Box sx={{ display: "flex", gap: { xs: 1.5, sm: 3 }, mb: 3, flexWrap: "wrap" }}>
        <Box
          sx={{
            flex: 1,
            minWidth: 120,
            p: 2,
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
            backgroundColor: "#f9fafb",
          }}
        >
          <Typography sx={{ fontSize: 12, color: "#9ca3af", mb: 0.5 }}>
            Total Orders
          </Typography>
          <Typography sx={{ fontSize: { xs: 18, sm: 20 }, fontWeight: 700, color: "#0f1111" }}>
            {total}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            minWidth: 120,
            p: 2,
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
            backgroundColor: "#f9fafb",
          }}
        >
          <Typography sx={{ fontSize: 12, color: "#9ca3af", mb: 0.5 }}>
            Total Units Sold
          </Typography>
          <Typography sx={{ fontSize: { xs: 18, sm: 20 }, fontWeight: 700, color: "#0f1111" }}>
            {totalUnitsSold}
          </Typography>
        </Box>
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
            gridTemplateColumns: "1fr 1fr 1fr 1.5fr",
            gap: 1,
            px: 2,
            py: 1.5,
            backgroundColor: "#f9fafb",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          {["Order", "Quantity", "Stock After", "Date"].map((h) => (
            <Typography
              key={h}
              sx={{ fontSize: 12, fontWeight: 600, color: "#6b7280" }}
            >
              {h}
            </Typography>
          ))}
        </Box>

        {sales.map((s) => (
          <Box
            key={s.id}
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1.5fr",
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
              label={formatReference(s.reference)}
              size="small"
              sx={{
                height: 22,
                fontSize: 11,
                fontWeight: 600,
                backgroundColor: "#dbeafe",
                color: "#2563eb",
                borderRadius: "12px",
                width: "fit-content",
              }}
            />
            <Typography
              sx={{ fontSize: 13, fontWeight: 600, color: "#b91c1c" }}
            >
              -{s.quantity} units
            </Typography>
            <Typography sx={{ fontSize: 13, color: "#6b7280" }}>
              {s.newQuantity ?? "—"}
            </Typography>
            <Typography sx={{ fontSize: 12, color: "#6b7280" }}>
              {formatDate(s.createdAt)}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Mobile cards */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        {sales.map((s) => (
          <Box
            key={s.id}
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
                label={formatReference(s.reference)}
                size="small"
                sx={{
                  height: 22,
                  fontSize: 11,
                  fontWeight: 600,
                  backgroundColor: "#dbeafe",
                  color: "#2563eb",
                  borderRadius: "12px",
                  width: "fit-content",
                }}
              />
              <Typography sx={{ fontSize: 12, color: "#6b7280" }}>
                {formatDate(s.createdAt)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography
                sx={{ fontSize: 14, fontWeight: 600, color: "#b91c1c" }}
              >
                -{s.quantity} units
              </Typography>
              <Typography sx={{ fontSize: 12, color: "#6b7280" }}>
                Stock: {s.newQuantity ?? "—"}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {total > 0 && (
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

export default SalesHistoryTab;
