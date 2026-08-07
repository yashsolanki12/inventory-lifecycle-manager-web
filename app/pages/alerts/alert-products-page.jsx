import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AlertsSkeleton from "../../ui/skeleton-loader/alerts-skeleton";

import { useCurrentShopDomain, formatDate } from "../../utils/helper";
import { useParams, useNavigate } from "react-router";
import { ALERT_ACTION_CONFIG } from "../../utils/config/constants";
import { getAlertById } from "../../api/alerts";
import { useInventoryData } from "../../hooks/useInventoryData";

const AlertProductsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const shopDomain = useCurrentShopDomain();
  const storeHandle = shopDomain?.split(".").at(0);

  const { data: responseData, isLoading } = useInventoryData(
    ["alerts", id],
    () => getAlertById(shopDomain, id),
    null,
    { enabled: !!shopDomain && !!id },
  );

  const alert = responseData?.data;

  if (isLoading) {
    return <AlertsSkeleton />;
  }

  if (!alert) {
    return (
      <Box sx={{ p: { xs: 2, sm: 3, md: 2 }, maxWidth: 1200, mx: "auto" }}>
        <Typography sx={{ color: "#9ca3af", fontSize: 16 }}>
          Alert not found.
        </Typography>
      </Box>
    );
  }

  const actions = alert.metadata?.actions || [];
  const productIds = alert.metadata?.productIds || [];
  const ruleName = alert.metadata?.ruleName || null;

  const items =
    actions.length > 0
      ? actions
      : productIds.map((id) => ({
          productId: id,
          title: id.split("/").pop(),
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
          gap: 1.5,
          mb: 3,
        }}
      >
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
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          {ruleName && (
            <Typography sx={{ fontSize: 13, color: "#9ca3af" }}>
              Rule: {ruleName}
            </Typography>
          )}
          <Typography sx={{ fontSize: 13, color: "#9ca3af" }}>
            {formatDate(alert.createdAt)}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          overflow: "hidden",
          maxHeight: "calc(100vh - 340px)",
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: 6 },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#d1d5db",
            borderRadius: 3,
          },
          "&::-webkit-scrollbar-track": { backgroundColor: "#f9fafb" },
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
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
              color: "#6b7280",
            }}
          >
            Product
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
              color: "#6b7280",
            }}
          >
            Action
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
              color: "#6b7280",
            }}
          >
            Preview
          </Typography>
        </Box>

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
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#0f1111",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  pr: 2,
                }}
              >
                {item.title}
              </Typography>
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
              <Tooltip title="Open Preview" arrow>
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
    </Box>
  );
};

export default AlertProductsPage;
