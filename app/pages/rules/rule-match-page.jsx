import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import ReusableList from "../../components/reusable-list";
import useInventorySubmit from "../../hooks/useInventorySubmit";
import ConfirmDialog from "../../ui/confirmation-dialog";
import { useNavigate, useLocation } from "react-router";
import { useCurrentShopDomain } from "../../utils/helper";
import { ruleMatch, runRule } from "../../api/archive-rules";
import { MATCH_COLUMNS } from "../../utils/config/columns";

const RuleMatchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const shopDomain = useCurrentShopDomain();
  const [openDialog, setOpenDialog] = React.useState(false);
  const selectedRuleIds = location.state?.selectedRuleIds || [];
  const totalFromState = location.state?.totalItems || 0;

  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  const runRuleMutation = useInventorySubmit(
    ({ shop, ruleIds }) => runRule(shop, ruleIds),
    setSnackbar,
    {
      invalidateKeys: [["plan-usage", shopDomain]],
      onSuccess: (data) => {
        if (data.success === true) {
          navigate("/app/rules");
        }
      },
    },
  );

  const handleRunRule = () => {
    if (!shopDomain || selectedRuleIds.length === 0) return;
    setOpenDialog(true);
  };

  const handleCancel = () => {
    navigate("/app/rules");
  };

  const fetchMatchData = (params) =>
    ruleMatch(shopDomain, selectedRuleIds, params);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmRun = () => {
    runRuleMutation.mutate({ shop: shopDomain, ruleIds: selectedRuleIds });
    setOpenDialog(false);
  };

  React.useEffect(() => {
    if (runRuleMutation.error) {
      setSnackbar({
        open: true,
        message: runRuleMutation.error,
        severity: "error",
      });
    }
  }, [runRuleMutation.error]);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1450,
        mx: "auto",
        px: { xs: 2, sm: 3 },
        py: 3,
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 3,
        }}
      >
        <IconButton
          onClick={handleCancel}
          sx={{
            color: "#6b7280",
            "&:hover": {
              color: "#374151",
              backgroundColor: "#f3f4f6",
            },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="h3"
          sx={{ fontWeight: 700, color: "#202223", fontSize: 24 }}
        >
          Rule Preview
        </Typography>
      </Box>
      {totalFromState > 0 && (
        <Box
          sx={{
            backgroundColor: "#EFF6FF",
            border: "1px solid #BFDBFE",
            borderRadius: "10px",
            p: 2.5,
            mb: 3,
            display: "flex",
            alignItems: "flex-start",
            gap: 1.5,
          }}
        >
          <InfoOutlinedIcon sx={{ color: "#2563EB", mt: 0.25, fontSize: 20 }} />
          <Box>
            <Typography
              sx={{ fontSize: 14, color: "#000000", fontWeight: 600 }}
            >
              This rule will affect{" "}
              <span style={{ color: "#2660db" }}> {totalFromState} </span>{" "}
              product
              {totalFromState !== 1 ? "s" : ""}.
            </Typography>
            <Typography
              sx={{ fontSize: 13, color: "#000000", mt: 0.5, fontWeight: 600 }}
            >
              Please review the list before running the rule.
            </Typography>
          </Box>
        </Box>
      )}

      <ReusableList
        fetchFn={fetchMatchData}
        queryKey={["rule-match", selectedRuleIds]}
        columns={MATCH_COLUMNS}
        defaultLimit={10}
        paginationText="products"
        hideSearch={true}
        maxHeight="calc(100vh - 450px)"
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 1.5,
          mt: 3,
        }}
      >
        <Button
          variant="outlined"
          onClick={handleCancel}
          disabled={runRuleMutation.isPending}
          sx={{
            borderColor: "#cad0d6",
            color: "#00050e",
            textTransform: "none",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "13px",
            px: 3,
            "&:hover": {
              borderColor: "#9ca3af",
              backgroundColor: "#f9fafb",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleRunRule}
          disabled={runRuleMutation.isPending || totalFromState === 0}
          sx={{
            backgroundColor: "#020005",
            color: "#ffffff",
            textTransform: "none",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "13px",
            px: 3,
          }}
        >
          {runRuleMutation.isPending ? (
            <CircularProgress size={18} sx={{ color: "white" }} />
          ) : (
            "Run Rule"
          )}
        </Button>
      </Box>

      <ConfirmDialog
        open={openDialog}
        title="Execute Rules"
        message={`Are you sure you want to run ${totalFromState !== 1 ? "all" : ""} ${totalFromState} rule${totalFromState !== 1 ? "s" : ""}?`}
        onConfirm={handleConfirmRun}
        onClose={handleCloseDialog}
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

export default RuleMatchPage;
