import React from "react";
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
import HelpOutlineIcon from "@mui/icons-material/HelpOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CloseIcon from "@mui/icons-material/Close";
import useInventorySubmit from "../../hooks/useInventorySubmit";
import TablePagination from "../../components/TablePagination";
import ConfirmDialog from "../../ui/confirmation-dialog";
import EmptyAlertsCard from "./ui-components/empty-alerts-card";
import AlertsSkeleton from "../../ui/skeleton-loader/alerts-skeleton";
import { useNavigate } from "react-router";
import { useCurrentShopDomain, formatDate } from "../../utils/helper";
import { ALERT_TYPE_CONFIG } from "../../utils/config/constants";
import {
  getAlerts,
  markAlertsRead,
  markAllAlertsRead,
  generateAlerts,
} from "../../api/alerts";
import { useInventoryData } from "../../hooks/useInventoryData";
import Tooltip from "@mui/material/Tooltip";

const ALERT_ICON_MAP = {
  dead_stock: InventoryIcon,
  inventory_age: WarningAmberIcon,
  archive_rule: ArchiveIcon,
  low_stock: LowPriorityIcon,
  inventory_not_tracked: HelpOutlineIcon,
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
  const tableRef = React.useRef(null);
  const hasTriggeredGenerate = React.useRef(false);

  const {
    data: responseData,
    isLoading,
    refetch,
  } = useInventoryData(
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

  const generateAlertsMutation = useInventorySubmit(
    (shop) => generateAlerts(shop),
    setSnackbar,
    { showSuccess: false, showError: false, onSuccess: () => refetch() },
  );

  React.useEffect(() => {
    if (!shopDomain || hasTriggeredGenerate.current) return;
    const storageKey = `alerts_generated_${shopDomain}`;
    const today = new Date().toISOString().slice(0, 10);
    const lastGenerated = localStorage.getItem(storageKey);
    if (lastGenerated !== today) {
      hasTriggeredGenerate.current = true;
      generateAlertsMutation.mutate(shopDomain, {
        onSuccess: () => localStorage.setItem(storageKey, today),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopDomain]);

  const handleView = (alert) => {
    navigate(`/app/alerts/${alert.id}`);
  };

  const handleMarkRead = (e, alert) => {
    e.stopPropagation();
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

  React.useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [page]);

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
              label={`${unreadCount} new`}
              size="small"
              sx={{
                backgroundColor: "#005ea2",
                color: "#fff",
                fontWeight: 600,
                fontSize: 11,
                height: 22,
              }}
            />
          )}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {unreadCount > 0 && (
            <Button
              variant="outlined"
              startIcon={<CheckCircleOutlineIcon />}
              onClick={handleMarkAllRead}
              disabled={markAllReadMutation.isPending}
              sx={{
                borderColor: "#e5e7eb",
                color: "#374151",
                backgroundColor: "#FFFFFF",
                textTransform: "none",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: 13,
                px: 2,
                py: 1,
                "&:hover": {
                  borderColor: "#d1d5db",
                  backgroundColor: "#f9fafb",
                },
                "&.Mui-disabled": {
                  opacity: 0.6,
                },
              }}
            >
              {markAllReadMutation.isPending
                ? "Marking..."
                : "Mark all as read"}
            </Button>
          )}
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
      </Box>
      <Box
        sx={{
          width: "100%",
          maxWidth: 1450,
          mx: "auto",
          px: { xs: 1, sm: 2 },
          py: { xs: 2, sm: 3 },
          borderRadius: "16px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          backgroundColor: "white",
        }}
      >
        {alerts.length === 0 ? (
          <EmptyAlertsCard />
        ) : (
          <Box
            ref={tableRef}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              maxHeight: "calc(100vh - 282px)",
              overflowY: "auto",
              px: 2,
              "&::-webkit-scrollbar": { width: 6 },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#d1d5db",
                borderRadius: 3,
              },
              "&::-webkit-scrollbar-track": { backgroundColor: "#f9fafb" },
            }}
          >
            {alerts.map((alert) => {
              const config =
                ALERT_TYPE_CONFIG[alert.type] || ALERT_TYPE_CONFIG.dead_stock;
              const IconComponent = ALERT_ICON_MAP[alert.type] || InventoryIcon;
              const isUnread = !alert.isRead;
              return (
                <Box
                  key={alert.id}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                    p: 2,
                    borderRadius: "8px",
                    border: "1px solid",
                    borderColor: isUnread ? "#005ea2" : "#e5e7eb",
                    backgroundColor: isUnread ? "#f0f6ff" : "#ffffff",
                    cursor: "default",
                    transition: "all 0.15s ease",
                    "&:hover": {
                      borderColor: isUnread ? "#004d8a" : "#d1d5db",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "8px",
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
                        mb: 0.25,
                      }}
                    >
                      {isUnread && (
                        <FiberManualRecordIcon
                          sx={{
                            fontSize: 8,
                            color: "#005ea2",
                            flexShrink: 0,
                          }}
                        />
                      )}
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: isUnread ? 600 : 500,
                          color: "#202223",
                          lineHeight: 1.4,
                        }}
                      >
                        {alert.title}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        fontSize: 13,
                        color: "#6b7280",
                        mb: 0.5,
                        lineHeight: 1.5,
                      }}
                    >
                      {alert.message}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: "#8c9196" }}>
                      {formatDate(alert.createdAt)}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      flexShrink: 0,
                    }}
                  >
                    {alert.metadata?.productIds?.length > 0 && (
                      <Tooltip
                        title={"View details"}
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
                          onClick={(e) => {
                            e.stopPropagation();
                            handleView(alert);
                          }}
                          sx={{
                            color: "#005ea2",
                            "&:hover": {
                              backgroundColor: "#e6f0fa",
                            },
                          }}
                        >
                          <OpenInNewIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Tooltip>
                    )}
                    {isUnread && (
                      <Tooltip
                        title={"Mark as read"}
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
                          onClick={(e) => handleMarkRead(e, alert)}
                          disabled={
                            markReadMutation.isPending &&
                            markReadMutation.variables?.alertIds?.[0] ===
                              alert.id
                          }
                          sx={{
                            color: "#005ea2",
                            "&:hover": {
                              backgroundColor: "#e6f0fa",
                            },
                          }}
                        >
                          <CheckCircleOutlineIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Tooltip>
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
            paginationText="alerts"
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
            sx={{
              width: "100%",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default AlertsListPage;
