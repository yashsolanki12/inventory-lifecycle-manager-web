import React from "react";
import useInventorySubmit from "../../hooks/useInventorySubmit";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ConfirmDialog from "../../ui/confirmation-dialog";
import ReusableList from "../../components/reusable-list";
import Button from "@mui/material/Button";
import useInventoryData from "../../hooks/useInventoryData";
import {
  ARCHIVE_HISTORY_COLUMN,
  archiveHistoryRenderActions,
} from "../../utils/config/columns";
import { useCurrentShopDomain } from "../../utils/helper";
import {
  archiveHistory,
  generateArchiveHistoryCsv,
} from "../../api/archive-rules";
import { ARCHIVE_HISTORY_SORT_OPTIONS } from "../../utils/config/constants";

const ArchiveHistoryListPage = () => {
  const shopDomain = useCurrentShopDomain();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });
  const fetchArchiveHistory = (params) => archiveHistory(shopDomain, params);

  const { data: archiveHistoryData } = useInventoryData(
    ["archive-history"],
    () => archiveHistory(shopDomain),
    null,
    { enabled: !!shopDomain },
  );

  const handleProductPreview = (item) => {
    if (item.previewUrl) window.open(item.previewUrl, "_blank");
  };

  const renderActions = archiveHistoryRenderActions({
    onPreviewUrl: handleProductPreview,
  });

  const archiveHistoryCsvMutation = useInventorySubmit(
    (shop) => generateArchiveHistoryCsv(shop),
    setSnackbar,
    {
      onSuccess: (data) => {
        // if (data.data.totalRecords === 0) {
        //   setSnackbar({
        //     open: true,
        //     message: "No archive history found to export.",
        //     severity: "warning",
        //   });
        // }

        if (
          data.data.totalRecords > 0 &&
          data.success === true &&
          data.data.downloadUrl
        ) {
          window.open(data.data.downloadUrl, "_top");
        }
      },
    },
  );

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogConfirm = () => {
    if (archiveHistoryData?.data.items.length === 0) {
      setSnackbar({
        open: true,
        message: "No archive history found.",
        severity: "warning",
      });
      setOpenDialog(false);
      return;
    }
    if (!shopDomain) return;
    if (archiveHistoryData?.data.items.length > 0) {
      archiveHistoryCsvMutation.mutate(shopDomain);
      setOpenDialog(false);
    }
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

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
        <Typography
          variant="h3"
          sx={{ fontWeight: 700, color: "#202223", fontSize: 24 }}
        >
          Archive History
        </Typography>
        <Button
          variant="outlined"
          startIcon={<FileDownloadIcon />}
          onClick={handleDialogOpen}
          sx={{
            borderColor: "#fffcfc",
            color: "#000000",
            backgroundColor: "#FFFFFF",
            textTransform: "none",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: 13,
            "&:hover": {
              borderColor: "#CBD5E1",
              backgroundColor: "#F8FAFC",
            },
          }}
        >
          Export
        </Button>
      </Box>

      <ReusableList
        fetchFn={fetchArchiveHistory}
        queryKey="archive-history"
        columns={ARCHIVE_HISTORY_COLUMN}
        actions={renderActions}
        searchPlaceholder="Search by product, reason..."
        sortOptions={ARCHIVE_HISTORY_SORT_OPTIONS}
        defaultSort="-createdAt"
        paginationText="archive history"
        defaultLimit={10}
        enabled={!!shopDomain}
      />

      <ConfirmDialog
        open={openDialog}
        title="Export Archive History"
        message="Are you sure you want to export archive history data to a CSV file?"
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

export default ArchiveHistoryListPage;
