import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useCurrentShopDomain } from "../../utils/helper";
import { deleteArchiveRule, getAllArchiveList } from "../../api/archive-rules";
import { useNavigate } from "react-router";
import { RULES_COLUMNS, rulesRenderActions } from "../../utils/config/columns";
import ReusableList from "../../components/reusable-list";
import { RULES_SORT_OPTIONS } from "../../utils/config/constants";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ConfirmDialog from "../../ui/confirmation-dialog";
import useInventorySubmit from "../../hooks/useInventorySubmit";

const RulesListPage = () => {
  const shopDomain = useCurrentShopDomain();
  const navigate = useNavigate();
  const fetchRulesList = (params) => getAllArchiveList(shopDomain, params);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [openDeleteDialog, setDeleteDialog] = React.useState(false);
  const [ruleData, setRuleData] = React.useState({
    rule_name: "",
    id: "",
  });

  const handleEdit = (item) => {
    const id = item.id;
    if (id) {
      navigate(`/app/rules/${id}`);
    }
  };
  const handleDelete = (item) => {
    if (item.rule_name && item.id) {
      setDeleteDialog(true);
      setRuleData({ rule_name: item.rule_name, id: item.id });
    }
  };
  const handleMatch = (item) => {
    if (item.id) {
      navigate(`/app/rules/match/${item.id}`);
    }
  };

  const deleteRuleMutation = useInventorySubmit(
    ({ shop, id }) => deleteArchiveRule(shop, id),
    setSnackbar,
    {
      invalidateKeys: [["rules-list"]], // ["delete-archive-rule"], pass [] with comma separate to call multiple api on success
      onSuccess: (data) => {
        if (data.success === true) {
          setDeleteDialog(false);
        }
      },
    },
  );

  const renderActions = rulesRenderActions({
    onEdit: handleEdit,
    onDelete: handleDelete,
    onMatch: handleMatch,
  });
  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  const handleConfirmDeleteRule = () => {
    if (!shopDomain) return;
    deleteRuleMutation.mutate({ shop: shopDomain, id: ruleData.id });
  };

  const handleConfirmClose = () => {
    setDeleteDialog(false);
    setRuleData("");
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
          sx={{ fontWeight: 700, color: "#202223", fontSize: 30 }}
        >
          Rules
        </Typography>
        <Button
          variant="outlined"
          onClick={() => navigate("/app/rules/create")}
          sx={{
            borderColor: "#cad0d6",
            color: "#ffffff",
            backgroundColor: "#000000",
            textTransform: "none",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "13px",
            px: 3,
          }}
        >
          Create Rule
        </Button>
      </Box>

      <ReusableList
        fetchFn={fetchRulesList}
        queryKey="rules-list"
        columns={RULES_COLUMNS}
        actions={renderActions}
        searchPlaceholder="Search by name, conditions..."
        sortOptions={RULES_SORT_OPTIONS}
        defaultSort="-createdAt"
        defaultLimit={10}
        paginationText="rules"
      />

      <ConfirmDialog
        open={openDeleteDialog}
        title="Delete Rule"
        message={`Are you sure you want to delete this '${ruleData.rule_name}'`}
        onConfirm={handleConfirmDeleteRule}
        onClose={handleConfirmClose}
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

export default RulesListPage;
