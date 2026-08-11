import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import useInventoryData from "../../hooks/useInventoryData";
import useInventorySubmit from "../../hooks/useInventorySubmit";
import AgingBucketsSkeleton from "../../ui/skeleton-loader/aging-buckets-skeleton";

import { useCurrentShopDomain } from "../../utils/helper";
import {
  getAgingBuckets,
  updateAgingBuckets,
  resetAgingBuckets,
} from "../../api/aging-buckets";
import {
  AGING_OPTIONS,
  FRESH_OPTIONS,
  MILD_OPTIONS,
} from "../../utils/config/constants";

const AgingBucketsPage = () => {
  const shopDomain = useCurrentShopDomain();

  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [addDialogOpen, setAddDialogOpen] = React.useState(false);
  const [addTarget, setAddTarget] = React.useState(null);
  const [addValue, setAddValue] = React.useState("");

  const { data: bucketData, isLoading } = useInventoryData(
    ["aging-buckets"],
    () => getAgingBuckets(shopDomain),
    null,
    { enabled: !!shopDomain },
  );

  const config = bucketData?.data;

  const [buckets, setBuckets] = React.useState({
    freshMax: "",
    mildMax: "",
    agingMax: "",
  });

  React.useEffect(() => {
    if (config) {
      setBuckets({
        freshMax: config.freshMax ?? 30,
        mildMax: config.mildMax,
        agingMax: config.agingMax,
      });
    }
  }, [config]);

  const updateMutation = useInventorySubmit(
    ({ shop, data }) => updateAgingBuckets(shop, data),
    setSnackbar,
    {
      invalidateKeys: [["aging-buckets"]],
    },
  );

  const resetMutation = useInventorySubmit(
    ({ shop }) => resetAgingBuckets(shop),
    setSnackbar,
    {
      invalidateKeys: [["aging-buckets"]],
      onSuccess: (data) => {
        if (data?.data) {
          setBuckets({
            freshMax: data.data.freshMax,
            mildMax: data.data.mildMax,
            agingMax: data.data.agingMax,
          });
        }
      },
    },
  );

  const handleSave = () => {
    if (!shopDomain) return;
    const payload = { freshMax: Number(buckets.freshMax) };
    if (buckets.mildMax !== null && buckets.mildMax !== "") {
      payload.mildMax = Number(buckets.mildMax);
    }
    if (buckets.agingMax !== null && buckets.agingMax !== "") {
      payload.agingMax = Number(buckets.agingMax);
    }
    updateMutation.mutate({ shop: shopDomain, data: payload });
  };

  const handleReset = () => {
    if (!shopDomain) return;
    resetMutation.mutate({ shop: shopDomain });
  };

  const handleDeleteMild = () => {
    setBuckets((prev) => ({ ...prev, mildMax: null }));
  };

  const handleDeleteAging = () => {
    setBuckets((prev) => ({ ...prev, agingMax: null }));
  };

  const handleOpenAddDialog = (target) => {
    setAddTarget(target);
    setAddValue("");
    setAddDialogOpen(true);
  };

  const handleConfirmAdd = () => {
    if (!addValue) return;
    const val = Number(addValue);
    if (addTarget === "mild") {
      setBuckets((prev) => ({ ...prev, mildMax: val }));
    } else if (addTarget === "aging") {
      setBuckets((prev) => ({ ...prev, agingMax: val }));
    }
    setAddDialogOpen(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  React.useEffect(() => {
    if (updateMutation.error) {
      setSnackbar({
        open: true,
        message: updateMutation.error,
        severity: "error",
      });
    }
  }, [updateMutation.error]);

  if (isLoading) {
    return <AgingBucketsSkeleton />;
  }

  const hasMild = buckets.mildMax !== null && buckets.mildMax !== "";
  const hasAging = buckets.agingMax !== null && buckets.agingMax !== "";

  return (
    <Box
      sx={{
        width: "100%",
        mx: "auto",
        px: { xs: 2, sm: 3 },
        py: 3,
        // maxWidth: 900,
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 1 }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: 700, color: "#202223", fontSize: 24 }}
        >
          Aging Bucket
        </Typography>
      </Box>

      <Card
        sx={{
          borderRadius: "14px",
          border: "1px solid #ececec",
          boxShadow: "0 8px 24px rgba(0,0,0,.04)",
        }}
      >
        <CardContent sx={{ p: "24px" }}>
          <Typography sx={{ fontSize: 14, color: "#6b7280", mb: 3 }}>
            Set custom aging buckets for inventory age.
          </Typography>

          <Box sx={{ mt: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                pb: 1,
                mb: 1,
                borderBottom: "2px solid #e5e7eb",
                gap: 13,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 12,
                  color: "#6b7280",
                  textTransform: "none",
                  letterSpacing: 0.5,
                  width: 220,
                }}
              >
                Bucket Name
              </Typography>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 12,
                  color: "#6b7280",
                  textTransform: "none",
                  letterSpacing: 0.5,
                }}
              >
                Days Range
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                py: 1.5,
                borderBottom: "1px solid #f3f4f6",
                gap: 9,
              }}
            >
              <Box
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  backgroundColor: "#f0fdf4",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#15803d",
                  width: 220,
                }}
              >
                Fresh 0 to {buckets.freshMax} days
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    px: 2,
                    py: 0.75,
                    borderRadius: "6px",
                    border: "1px solid #e5e7eb",
                    backgroundColor: "#f9fafb",
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#374151",
                    minWidth: 70,
                    textAlign: "center",
                  }}
                >
                  0
                </Box>
                <Typography sx={{ fontSize: 13, color: "#9ca3af" }}>
                  to
                </Typography>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select
                    value={buckets.freshMax}
                    onChange={(e) =>
                      setBuckets((prev) => ({
                        ...prev,
                        freshMax: e.target.value,
                      }))
                    }
                    sx={{ fontSize: 14, borderRadius: "8px" }}
                  >
                    {FRESH_OPTIONS.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.value} days
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {hasMild && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  py: 1.5,
                  borderBottom: "1px solid #f3f4f6",
                  gap: 9,
                }}
              >
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    backgroundColor: "#fff7ed",
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#a16207",
                    width: 220,
                  }}
                >
                  Mild {Number(buckets.freshMax) + 1} to {buckets.mildMax} days
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      px: 2,
                      py: 0.75,
                      borderRadius: "6px",
                      border: "1px solid #e5e7eb",
                      backgroundColor: "#f9fafb",
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#374151",
                      minWidth: 70,
                      textAlign: "center",
                    }}
                  >
                    {Number(buckets.freshMax) + 1}
                  </Box>
                  <Typography sx={{ fontSize: 13, color: "#9ca3af" }}>
                    to
                  </Typography>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                      value={buckets.mildMax}
                      onChange={(e) =>
                        setBuckets((prev) => ({
                          ...prev,
                          mildMax: e.target.value,
                        }))
                      }
                      sx={{ fontSize: 14, borderRadius: "8px" }}
                    >
                      {MILD_OPTIONS.filter(
                        (opt) => opt.value > Number(buckets.freshMax),
                      ).map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                          {opt.value} days
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <IconButton
                    onClick={handleDeleteMild}
                    sx={{ color: "#ef4444" }}
                    title="Remove Mild bucket"
                  >
                    <DeleteIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Box>
              </Box>
            )}

            {hasAging && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  py: 1.5,
                  borderBottom: "1px solid #f3f4f6",
                  gap: 9,
                }}
              >
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    backgroundColor: "#fef2f2",
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#c2410c",
                    width: 220,
                  }}
                >
                  Aging{" "}
                  {hasMild
                    ? Number(buckets.mildMax) + 1
                    : Number(buckets.freshMax) + 1}{" "}
                  to {buckets.agingMax} days
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      px: 2,
                      py: 0.75,
                      borderRadius: "6px",
                      border: "1px solid #e5e7eb",
                      backgroundColor: "#f9fafb",
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#374151",
                      minWidth: 70,
                      textAlign: "center",
                    }}
                  >
                    {hasMild
                      ? Number(buckets.mildMax) + 1
                      : Number(buckets.freshMax) + 1}
                  </Box>
                  <Typography sx={{ fontSize: 13, color: "#9ca3af" }}>
                    to
                  </Typography>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                      value={buckets.agingMax}
                      onChange={(e) =>
                        setBuckets((prev) => ({
                          ...prev,
                          agingMax: e.target.value,
                        }))
                      }
                      sx={{ fontSize: 14, borderRadius: "8px" }}
                    >
                      {AGING_OPTIONS.filter(
                        (opt) =>
                          opt.value >
                          (hasMild
                            ? Number(buckets.mildMax)
                            : Number(buckets.freshMax)),
                      ).map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                          {opt.value} days
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <IconButton
                    onClick={handleDeleteAging}
                    sx={{ color: "#ef4444" }}
                    title="Remove Aging bucket"
                  >
                    <DeleteIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Box>
              </Box>
            )}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                py: 1.5,
                gap: 9,
              }}
            >
              <Box
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: "8px",
                  border: "1px solid #fecaca",
                  backgroundColor: "#fef2f2",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#b91c1c",
                  width: 220,
                }}
              >
                Dead{" "}
                {hasAging
                  ? Number(buckets.agingMax) + 1
                  : hasMild
                    ? Number(buckets.mildMax) + 1
                    : Number(buckets.freshMax) + 1}
                + days
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    px: 2,
                    py: 0.75,
                    borderRadius: "6px",
                    border: "1px solid #e5e7eb",
                    backgroundColor: "#f9fafb",
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#374151",
                    minWidth: 70,
                    textAlign: "center",
                  }}
                >
                  {hasAging
                    ? Number(buckets.agingMax) + 1
                    : hasMild
                      ? Number(buckets.mildMax) + 1
                      : Number(buckets.freshMax) + 1}
                </Box>
                <Typography sx={{ fontSize: 13, color: "#9ca3af" }}>
                  to
                </Typography>
                <Typography
                  sx={{ fontSize: 13, color: "#9ca3af", fontStyle: "italic" }}
                >
                  ∞ (auto)
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 4,
              pt: 3,
              borderTop: "1px solid #ececec",
            }}
          >
            <Box sx={{ display: "flex", gap: 1 }}>
              {!hasMild && (
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenAddDialog("mild")}
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
                  Add Mild
                </Button>
              )}
              {hasMild && !hasAging && (
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenAddDialog("aging")}
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
                  Add Aging
                </Button>
              )}
            </Box>
            <Box sx={{ display: "flex", gap: 1.5 }}>
              <Button
                variant="outlined"
                onClick={handleReset}
                disabled={resetMutation.isPending}
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
                {resetMutation.isPending ? (
                  <CircularProgress size={18} />
                ) : (
                  "Reset to Default"
                )}
              </Button>
              <Button
                variant="contained"
                onClick={handleSave}
                disabled={updateMutation.isPending}
                sx={{
                  backgroundColor: "#000000",
                  color: "#ffffff",
                  textTransform: "none",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "13px",
                  px: 3,
                  "&:hover": { backgroundColor: "#1a1a1a" },
                }}
              >
                {updateMutation.isPending ? (
                  <CircularProgress size={18} sx={{ color: "white" }} />
                ) : (
                  "Save Configuration"
                )}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontSize: 16, fontWeight: 600 }}>
          Add {addTarget === "mild" ? "Mild" : "Aging"} Bucket
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ fontSize: 13, color: "#6b7280", mb: 2 }}>
            Select the upper limit for the{" "}
            {addTarget === "mild" ? "Mild" : "Aging"} bucket.
          </Typography>
          <FormControl fullWidth size="small">
            <InputLabel>Upper limit</InputLabel>
            <Select
              value={addValue}
              onChange={(e) => setAddValue(e.target.value)}
              label="Upper limit"
            >
              {(() => {
                const opts =
                  addTarget === "mild" ? MILD_OPTIONS : AGING_OPTIONS;
                const minVal =
                  addTarget === "mild"
                    ? Number(buckets.freshMax)
                    : hasMild
                      ? Number(buckets.mildMax)
                      : Number(buckets.freshMax);
                return opts.filter((opt) => opt.value > minVal);
              })().map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setAddDialogOpen(false)}
            sx={{ textTransform: "none", color: "#6b7280" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmAdd}
            variant="contained"
            disabled={!addValue}
            sx={{
              textTransform: "none",
              backgroundColor: "#000000",
              "&:hover": { backgroundColor: "#1a1a1a" },
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

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

export default AgingBucketsPage;
