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

import { useNavigate, useLocation } from "react-router";
import { useCurrentShopDomain } from "../../utils/helper";
import { ruleMatch, runRule } from "../../api/archive-rules";
import { MATCH_COLUMNS } from "../../utils/config/columns";

const RuleMatchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const shopDomain = useCurrentShopDomain();

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
      onSuccess: () => {
        setTimeout(() => {
          navigate("/app/rules");
        }, 1500);
      },
    },
  );

  const handleRunRule = () => {
    if (!shopDomain || selectedRuleIds.length === 0) return;
    runRuleMutation.mutate({ shop: shopDomain, ruleIds: selectedRuleIds });
  };

  const handleCancel = () => {
    navigate("/app/rules");
  };

  const fetchMatchData = (params) =>
    ruleMatch(shopDomain, selectedRuleIds, params);

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
          gap: 1.5,
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
        sortOptions={[]}
        defaultSort=""
        defaultLimit={10}
        paginationText="products"
        hideSearch={true}
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
