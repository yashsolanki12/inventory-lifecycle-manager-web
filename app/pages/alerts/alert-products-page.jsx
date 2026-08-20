import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AlertDetailSkeleton from "../../ui/skeleton-loader/alert-detail-skeleton";
import TablePagination from "../../components/TablePagination";
import AlertNotFoundCard from "./ui-components/alert-not-found-card";
import { useCurrentShopDomain, formatDate } from "../../utils/helper";
import { useParams, useNavigate } from "react-router";
import { ALERT_ACTION_CONFIG } from "../../utils/config/constants";
import { getAlertById } from "../../api/alerts";
import { useInventoryData } from "../../hooks/useInventoryData";

const ITEMS_PER_PAGE = 10;

const AlertProductsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const shopDomain = useCurrentShopDomain();
  const storeHandle = shopDomain?.split(".").at(0);

  const tableRef = React.useRef(null);

  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [page]);

  const {
    data: responseData,
    isLoading,
    isFetching,
    refetch,
  } = useInventoryData(
    ["alerts", id, page],
    () => getAlertById(shopDomain, id, { page, limit: ITEMS_PER_PAGE }),
    null,
    { enabled: !!shopDomain && !!id },
  );

  const alert = responseData?.data;

  React.useEffect(() => {
    setPage(1);
  }, [id]);

  if (isLoading || (!responseData && isFetching)) {
    return <AlertDetailSkeleton />;
  }

  if (!alert) {
    return (
      <Box sx={{ p: { xs: 2, sm: 3, md: 2 }, maxWidth: 1200, mx: "auto" }}>
        <AlertNotFoundCard />
      </Box>
    );
  }

  const actions = alert.metadata?.actions || [];
  const productIds = alert.metadata?.productIds || [];
  const ruleName = alert.metadata?.ruleName || null;
  const pagination = alert.pagination;

  const items =
    actions.length > 0
      ? actions
      : productIds.map((pid) => ({
          productId: pid,
          title: pid.split("/").pop(),
          action: alert.type,
        }));

  const getPreviewUrl = (productId) => {
    const numericId = productId.split("/").pop();
    return `https://admin.shopify.com/store/${storeHandle}/products/${numericId}`;
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 2 }, maxWidth: 1200, mx: "auto" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <IconButton
            onClick={() => navigate("/app/alerts")}
            sx={{ color: "#374151" }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: "#0f1111",
              fontSize: { xs: 20, sm: 24 },
            }}
          >
            Alert Details
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          p: 3,
          mb: 3,
        }}
      >
        <Typography
          sx={{ fontSize: 16, fontWeight: 600, color: "#0f1111", mb: 1 }}
        >
          {alert.title}
        </Typography>
        <Typography sx={{ fontSize: 14, color: "#6b7280", mb: 1 }}>
          {alert.message}
        </Typography>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          {ruleName && (
            <Typography sx={{ fontSize: 13, color: "#9ca3af" }}>
              Rule: {ruleName}
            </Typography>
          )}
          {ruleName && <Typography sx={{ color: "#9ca3af" }}>•</Typography>}
          <Typography sx={{ fontSize: 13, color: "#9ca3af" }}>
            Date & Time: {formatDate(alert.createdAt)}
          </Typography>
        </Box>
      </Box>

      {page > 1 && (
        <Box sx={{ display: "flex", justifyContent: "end", mb: 1 }}>
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
        </Box>
      )}

      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 120px 50px",
            px: 3,
            py: 1.5,
            backgroundColor: "#f9fafb",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#6b7280" }}>
            Product
          </Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#6b7280" }}>
            Action Taken
          </Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#6b7280" }}>
            Actions
          </Typography>
        </Box>

        <Box
          ref={tableRef}
          sx={{
            maxHeight: "calc(100vh - 480px)",
            overflowY: "auto",
            "&::-webkit-scrollbar": { width: 6 },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#d1d5db",
              borderRadius: 3,
            },
            "&::-webkit-scrollbar-track": { backgroundColor: "#f9fafb" },
          }}
        >
          {items.map((item, index) => {
            const actionConfig =
              ALERT_ACTION_CONFIG[item.action] || ALERT_ACTION_CONFIG.active;
            const previewUrl = getPreviewUrl(item.productId);
            return (
              <Box
                key={index}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 120px 50px",
                  alignItems: "center",
                  px: 3,
                  py: 1.5,
                  borderBottom: "1px solid #f3f4f6",
                  "&:hover": { backgroundColor: "#f9fafb" },
                  "&:last-child": { borderBottom: "none" },
                }}
              >
                <Tooltip
                  title={item.title}
                  arrow
                  placement="top-start"
                  slotProps={{
                    tooltip: {
                      sx: {
                        lineHeight: 2,
                        fontSize: "12px",
                      },
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#0f1111",
                      pr: 2,
                      maxWidth: 200,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.title}
                  </Typography>
                </Tooltip>
                <Chip
                  label={actionConfig.label}
                  size="small"
                  sx={{
                    height: 26,
                    fontSize: 12,
                    fontWeight: 600,
                    backgroundColor: actionConfig.bg,
                    color: actionConfig.color,
                    borderRadius: "6px",
                    width: "fit-content",
                    border: `1px solid ${actionConfig.color}20`,
                    px: 0.4,
                  }}
                />
                <Tooltip
                  title="Open Preview"
                  arrow
                  slotProps={{
                    tooltip: {
                      sx: {
                        lineHeight: 2,
                        fontSize: "12px",
                      },
                    },
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => window.open(previewUrl, "_blank")}
                    sx={{
                      color: "#005ea2",
                      "&:hover": { backgroundColor: "#f0f6ff" },
                    }}
                  >
                    <OpenInNewIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Tooltip>
              </Box>
            );
          })}
        </Box>

        {pagination && pagination.total > 10 && (
          <TablePagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            total={pagination.total}
            limit={pagination.limit}
            onPageChange={setPage}
            paginationText={"products"}
          />
        )}
      </Box>
    </Box>
  );
};

export default AlertProductsPage;
