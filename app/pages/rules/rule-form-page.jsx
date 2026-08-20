import React from "react";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import RuleFormSkeleton from "../../ui/skeleton-loader/rule-form-skeleton";
import useInventoryData from "../../hooks/useInventoryData";
import useInventorySubmit from "../../hooks/useInventorySubmit";
import RuleForm from "./ui-components/RuleForm";
import { useParams, useNavigate } from "react-router";
import { useCurrentShopDomain } from "../../utils/helper";
import {
  getArchiveRule,
  createArchiveRule,
  updateArchiveRule,
} from "../../api/archive-rules";

const RuleFormPage = () => {
  const { id } = useParams();
  const shopDomain = useCurrentShopDomain();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });

  const { data: ruleData, isLoading } = useInventoryData(
    ["archive-rule", id],
    () => getArchiveRule(shopDomain, id),
    null,
    { enabled: !!shopDomain && isEdit },
  );

  const rule = ruleData?.data;

  const submitMutation = useInventorySubmit(
    ({ shop, data, ruleId }) =>
      ruleId
        ? updateArchiveRule(shop, data, ruleId)
        : createArchiveRule(shop, data),
    setSnackbar,
    {
      invalidateKeys: ["rules-list"],
      onSuccess: (data) => {
        if (data.success === true) {
          navigate("/app/rules");
        }
      },
    },
  );

  React.useEffect(() => {
    if (submitMutation.error) {
      setSnackbar({
        open: true,
        message: submitMutation.error,
        severity: "error",
      });
    }
  }, [submitMutation.error]);

  const handleSubmit = async (data) => {
    if (!shopDomain) return;
    submitMutation.mutate({ shop: shopDomain, data, ruleId: id || null });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  if (isEdit && isLoading) {
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
        <RuleFormSkeleton />
      </Box>
    );
  }

  if (isEdit && !rule) {
    return (
      <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
        <Alert severity="error">Rule not found.</Alert>
      </Box>
    );
  }

  const initialData = rule
    ? {
        rule_name: rule.rule_name || "",
        rule_condition: rule.rule_condition || "",
        daysWithoutSales: rule.daysWithoutSales ?? 0,
        daysWithoutSalesOperator: rule.daysWithoutSalesOperator || "gte",
        stockZero: rule.stockZero ?? false,
        stockThreshold: rule.stockThreshold ?? 0,
        productAgeDays: rule.productAgeDays ?? 0,
        productType: rule.productType || "",
        vendor: rule.vendor || "",
        excludedTags: rule.excludedTags || [],
        actionType: rule.actionType || "",
      }
    : null;

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1450,
        mx: "auto",
        px: { xs: 2, sm: 3 },
        // py: 3,
        boxSizing: "border-box",
      }}
    >
      <RuleForm
        initialData={initialData}
        onSubmit={handleSubmit}
        isEdit={isEdit}
        isSubmitting={submitMutation.isPending}
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

export default RuleFormPage;
