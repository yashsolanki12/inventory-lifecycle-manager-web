import React from "react";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import InventoryIcon from "@mui/icons-material/Inventory";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ArchiveIcon from "@mui/icons-material/Archive";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import { useCurrentShopDomain, formatDate } from "../../utils/helper";
import { ALERT_TYPE_CONFIG } from "../../utils/config/constants";
import { getAlerts, markAlertsRead, markAllAlertsRead } from "../../api/alerts";
import { useInventoryData } from "../../hooks/useInventoryData";
import useInventorySubmit from "../../hooks/useInventorySubmit";
import TablePagination from "../../components/TablePagination";
import ConfirmDialog from "../../ui/confirmation-dialog";
import EmptyAlertsCard from "./ui-components/empty-alerts-card";
import AlertsSkeleton from "../../ui/skeleton-loader/alerts-skeleton";

const ALERT_ICON_MAP = {
  dead_stock: InventoryIcon,
  inventory_age: WarningAmberIcon,
  archive_rule: ArchiveIcon,
  low_stock: LowPriorityIcon,
};

const AlertsListPage = () => {
  const shopDomain = useCurrentShopDomain();
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });

  const { data: responseData, isLoading, refetch } = useInventoryData(
    ["alerts", page],
    () => getAlerts(shopDomain, { page, limit: 10 }),
    null,
    { enabled: !!shopDomain },
  );

  const alerts = responseData?.data?.items || [];
  const pagination = responseData?.data?.pagination;
  const unreadCount = responseData?.data?.unreadCount || 0;

  const markReadMutation = useInventorySubmit(
    ({ shop, alertIds }) => markAlertsRead(shop, alertIds),
    setSnackbar,
    { onSuccess: () => refetch() },
  );

  const markAllReadMutation = useInventorySubmit(
    (shop) => markAllAlertsRead(shop),
    setSnackbar,
    { onSuccess: () => refetch() },
  );

  const handleView = (alert) => {
    navigate(`/app/alerts/${alert.id}`);
  };

  const handleMarkRead = (alert) => {
    if (!alert.isRead) {
      markReadMutation.mutate({ shop: shopDomain, alertIds: [alert.id] });
    }
  };

  const handleMarkAllRead = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogConfirm = () => {
    setOpenDialog(false);
    markAllReadMutation.mutate(shopDomain);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  if (isLoading) {
    return <AlertsSkeleton />;
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1450,
        mx: "auto",
        px: { xs: 1, sm: 2 },
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, color: "#202223", fontSize: 24 }}
          >
            Alerts
          </Typography>
          {unreadCount > 0 && (
            <Chip
              label={`${unreadCount} unread`}
              size="small"
              sx={{
                backgroundColor: "#dc2626",
                color: "#fff",
                fontWeight: 600,
                fontSize: 11,
                height: 22,
              }}
            />
          )}
        </Box>
        {unreadCount > 0 && (
          <Button
            variant="outlined"
            startIcon={<CheckCircleOutlineIcon />}
            onClick={handleMarkAllRead}
            sx={{
              borderColor: "#e5e7eb",
              color: "#374151",
              backgroundColor: "#FFFFFF",
              textTransform: "none",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: 13,
              "&:hover": {
                borderColor: "#d1d5db",
                backgroundColor: "#f9fafb",
              },
            }}
          >
            Mark all as read
          </Button>
        )}
      </Box>

      {alerts.length === 0 ? (
        <EmptyAlertsCard />
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {alerts.map((alert) => {
            const config = ALERT_TYPE_CONFIG[alert.type] || ALERT_TYPE_CONFIG.dead_stock;
            const IconComponent = ALERT_ICON_MAP[alert.type] || InventoryIcon;
            return (
              <Box
                key={alert.id}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                  p: 2,
                  borderRadius: "10px",
                  border: "1px solid #e5e7eb",
                  backgroundColor: alert.isRead ? "#ffffff" : "#f8fafc",
                  opacity: alert.isRead ? 0.7 : 1,
                  transition: "all 0.15s ease",
                  "&:hover": {
                    borderColor: "#d1d5db",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "10px",
                    backgroundColor: config.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <IconComponent sx={{ fontSize: 20, color: config.color }} />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 0.5,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#0f1111",
                      }}
                    >
                      {alert.title}
                    </Typography>
                    {!alert.isRead && (
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: "#dc2626",
                          flexShrink: 0,
                        }}
                      />
                    )}
                  </Box>
                  <Typography
                    sx={{ fontSize: 13, color: "#6b7280", mb: 0.5 }}
                  >
                    {alert.message}
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: "#9ca3af" }}>
                    {formatDate(alert.createdAt)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    flexShrink: 0,
                  }}
                >
                  {alert.metadata?.productIds?.length > 0 && (
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleView(alert)}
                      sx={{
                        textTransform: "none",
                        borderRadius: "6px",
                        fontWeight: 600,
                        fontSize: 12,
                        px: 1.5,
                        py: 0.5,
                        borderColor: "#005ea2",
                        color: "#005ea2",
                        "&:hover": {
                          borderColor: "#004d8a",
                          backgroundColor: "#f0f6ff",
                        },
                      }}
                    >
                      View
                    </Button>
                  )}
                  {!alert.isRead && (
                    <IconButton
                      size="small"
                      onClick={() => handleMarkRead(alert)}
                      sx={{
                        color: "#6b7280",
                        "&:hover": {
                          backgroundColor: "#f3f4f6",
                          color: "#374151",
                        },
                      }}
                    >
                      <CheckCircleOutlineIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>
      )}

      {pagination && pagination.total > 10 && (
        <TablePagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          total={pagination.total}
          limit={10}
          onPageChange={setPage}
        />
      )}

      <ConfirmDialog
        open={openDialog}
        title="Mark All Confirmation"
        message="Are you sure you want to mark all alerts as read?"
        onConfirm={handleDialogConfirm}
        onClose={handleDialogClose}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={snackbar.severity === "error" ? 5000 : 3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AlertsListPage;
