import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Check from "@mui/icons-material/Check";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import ConfirmDialog from "../../ui/confirmation-dialog";
import useInventorySubmit from "../../hooks/useInventorySubmit";

import { syncPlanToBackend, resetPlanOnBackend } from "../../api/plan";

const PlansPage = ({ shop, subscription, pricingUrl, submit, actionData }) => {
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [cancelPlanDialogOpen, setCancelPlanDialogOpen] = React.useState(false);

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  const handleViewPlan = () => {
    if (pricingUrl) {
      window.open(pricingUrl, "_top");
    } else {
      window.location.href = "/app/plans";
    }
  };

  const handleChangePlan = () => {
    if (pricingUrl) {
      window.open(pricingUrl, "_top");
    } else {
      window.location.href = "/app/plans";
    }
  };

  const createSyncPlanToBackendMutation = useInventorySubmit(
    (payload) =>
      syncPlanToBackend(payload.shop, payload.plan, payload.chargeId),
    null,
    {
      invalidateKeys: [["sync-plan-to-backend"]],
    },
  );
  const payload = {
    shop: shop,
    plan: subscription?.name.toLowerCase(),
    chargeId: subscription?.id,
  };

  React.useEffect(() => {
    if (subscription && shop) {
      createSyncPlanToBackendMutation.mutate(payload);
    }
  }, [subscription, shop]);

  React.useEffect(() => {
    if (actionData) {
      setSnackbar({
        open: true,
        message: actionData.message || "Operation completed",
        severity: actionData.success ? "success" : "error",
      });
      if (actionData.success && shop) {
        resetPlanOnBackend(shop);
      }
    }
  }, [actionData]);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", sm: 600, md: 800 },
        mx: "auto",
        px: { xs: 3, sm: 4 },
        py: { xs: 3, sm: 4 },
        boxSizing: "border-box",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        sx={{ mb: 2, gap: 1 }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#202223",
            fontSize: { xs: 18, sm: 20 },
          }}
        >
          Plans
        </Typography>
      </Stack>

      {subscription ? (
        <Card sx={{ borderRadius: "10px", width: "100%" }}>
          <CardContent>
            <Box
              sx={{
                backgroundColor: "#2b835b",
                p: { xs: 1, sm: 1.5 },
                borderRadius: "6px",
                mb: { xs: 2, sm: 3 },
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              <Check sx={{ color: "white", fontSize: { xs: 16, sm: 20 } }} />
              <Typography
                variant="body2"
                sx={{ color: "white", lineHeight: 1.5 }}
              >
                You are subscribed to{" "}
                <strong style={{ color: "black" }}>
                  &quot;{subscription.name}&quot;
                </strong>{" "}
                plan.
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="contained"
                onClick={handleChangePlan}
                sx={{
                  backgroundColor: "#000000",
                  color: "white",
                  textTransform: "none",
                  borderRadius: "6px",
                  fontWeight: 600,
                  fontSize: "13px",
                  padding: { xs: "10px 18px", sm: "5px 10px" },
                  textDecoration: "none",
                  width: { xs: "100%", sm: "auto" },
                  "&:hover": { backgroundColor: "#303030" },
                }}
              >
                Change plan
              </Button>
              {subscription.name !== "Free" && (
                <Button
                  variant="outlined"
                  onClick={() => setCancelPlanDialogOpen(true)}
                  sx={{
                    backgroundColor: "#ffffff",
                    color: "black",
                    textTransform: "none",
                    borderRadius: "6px",
                    fontWeight: 600,
                    fontSize: "13px",
                    padding: { xs: "10px 18px", sm: "5px 10px" },
                    textDecoration: "none",
                    width: { xs: "100%", sm: "auto" },
                    border: "1px solid #ddd",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  Cancel plan
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Card sx={{ borderRadius: "10px" }}>
          <CardContent>
            <Typography
              variant="body2"
              sx={{
                color: "#6a6f6f",
                fontSize: "14px",
                mb: 2,
                fontWeight: 500,
                lineHeight: 1.5,
              }}
            >
              Click &quot;View Plans&quot; and select your preferred plan.
            </Typography>

            <Button
              variant="contained"
              onClick={handleViewPlan}
              sx={{
                backgroundColor: "#202223",
                textTransform: "none",
                borderRadius: "6px",
                fontWeight: 600,
                padding: { xs: "12px 18px", sm: "5px 10px" },
                fontSize: "14px",
                width: { xs: "100%", sm: "auto" },
                "&:hover": { backgroundColor: "#303030" },
              }}
            >
              View Plans
            </Button>
          </CardContent>
        </Card>
      )}

      <ConfirmDialog
        open={cancelPlanDialogOpen}
        title="Confirm Plan Cancellation?"
        message={`This action cannot be undone. This will cancel your "${subscription?.name}" plan.`}
        onClose={() => setCancelPlanDialogOpen(false)}
        onConfirm={() => {
          setCancelPlanDialogOpen(false);
          submit({}, { method: "POST" });
        }}
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

export default PlansPage;

PlansPage.propTypes = {
  shop: PropTypes.string.isRequired,
  subscription: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }),
  pricingUrl: PropTypes.string,
  submit: PropTypes.func.isRequired,
  actionData: PropTypes.shape({
    success: PropTypes.bool,
    message: PropTypes.string,
  }),
};
