import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import ConfirmDialog from "../../ui/confirmation-dialog";
import useInventorySubmit from "../../hooks/useInventorySubmit";
import useInventoryData from "../../hooks/useInventoryData";
import ReusableList from "../../components/reusable-list";
import { useCurrentShopDomain } from "../../utils/helper";
import {
  deleteArchiveRule,
  getAllArchiveList,
  ruleMatch,
} from "../../api/archive-rules";
import { useNavigate } from "react-router";
import { RULES_COLUMNS, rulesRenderActions } from "../../utils/config/columns";
import { RULES_SORT_OPTIONS } from "../../utils/config/constants";

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
  const [selectedIds, setSelectedIds] = React.useState([]);

  const { data: rulesCountData } = useInventoryData(
    ["rules-list-count"],
    () => getAllArchiveList(shopDomain, { page: 1, limit: 1 }),
    null,
    { enabled: !!shopDomain },
  );
  const hasRules = (rulesCountData?.data?.pagination?.total ?? 0) > 0;

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

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleToggleSelectAll = (checked, items) => {
    if (checked) {
      const allIds = items.map((item) => item.id).filter(Boolean);
      setSelectedIds((prev) => [...new Set([...prev, ...allIds])]);
    } else {
      const itemIds = items.map((item) => item.id);
      setSelectedIds((prev) => prev.filter((id) => !itemIds.includes(id)));
    }
  };

  const handleClearSelection = () => {
    setSelectedIds([]);
  };

  const deleteRuleMutation = useInventorySubmit(
    ({ shop, id }) => deleteArchiveRule(shop, id),
    setSnackbar,
    {
      invalidateKeys: [["rules-list"]],
      onSuccess: (data) => {
        if (data.success === true) {
          setDeleteDialog(false);
        }
      },
    },
  );

  const matchRuleMutation = useInventorySubmit(
    ({ shop, ruleIds }) => ruleMatch(shop, ruleIds),
    setSnackbar,
    {
      onSuccess: (data) => {
        if (data.success) {
          navigate("/app/rules/match", {
            state: {
              selectedRuleIds: selectedIds,
              totalItems: data.data.pagination.total || data.data.items?.length,
            },
          });
        }
      },
    },
  );

  const handleMatchRule = () => {
    if (!shopDomain) return;

    if (hasRules && selectedIds.length === 0) {
      setSnackbar({
        open: true,
        message: "Please select at least one rule to match.",
        severity: "warning",
      });
      return;
    }

    matchRuleMutation.mutate({ shop: shopDomain, ruleIds: selectedIds });
  };

  const renderActions = rulesRenderActions({
    onEdit: handleEdit,
    onDelete: handleDelete,
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

  React.useEffect(() => {
    if (matchRuleMutation.error) {
      setSnackbar({
        open: true,
        message: matchRuleMutation.error.response?.data?.message,
        severity: "warning",
      });
    }
  }, [matchRuleMutation.error]);

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
          Rules
        </Typography>
        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
          {selectedIds.length > 0 && (
            <Button
              variant="outlined"
              onClick={handleClearSelection}
              sx={{
                borderColor: "#cad0d6",
                color: "#374151",
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
              Clear ({selectedIds.length})
            </Button>
          )}
          <Button
            variant="contained"
            onClick={handleMatchRule}
            disabled={matchRuleMutation.isPending}
            sx={{
              color: "#ffffff",
              backgroundColor: "#000000",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "13px",
              textTransform: "none",
              px: 3,
            }}
          >
            {matchRuleMutation.isPending ? (
              <CircularProgress size={18} sx={{ color: "white" }} />
            ) : (
              "Match Rule"
            )}
          </Button>
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
        enabled={!!shopDomain}
        selectable
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
        onToggleSelectAll={handleToggleSelectAll}
      />

      <ConfirmDialog
        open={openDeleteDialog}
        title="Delete Rule"
        message={`Are you sure you want to delete this '${ruleData.rule_name}'?`}
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
