import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import { AGING_OPTIONS, MILD_OPTIONS } from "../../utils/config/constants";

const AddBucketDialog = ({
  open,
  target,
  value,
  onClose,
  onConfirm,
  onChangeValue,
  hasMild,
  buckets,
}) => {
  return (
    <Dialog
      open={open}
      onClose={(reason) => {
        // Only allow closing via Cancel button, not outside click or escape
        if (reason === "backdropClick" || reason === "escapeKeyDown") {
          return;
        }
      }}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle sx={{ fontSize: 18, fontWeight: 600 }}>
        Add {target === "mild" ? "Mild" : "Aging"} Bucket
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ fontSize: 13, color: "#6b7280", mb: 2 }}>
          Select the upper limit for the {target === "mild" ? "Mild" : "Aging"}{" "}
          bucket.
        </Typography>
        <FormControl fullWidth size="small">
          <InputLabel>Upper limit</InputLabel>
          <Select
            value={value}
            onChange={(e) => onChangeValue(e.target.value)}
            label="Upper limit"
          >
            {(() => {
              const opts = target === "mild" ? MILD_OPTIONS : AGING_OPTIONS;
              const minVal =
                target === "mild"
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
          onClick={onClose}
          sx={{ textTransform: "none", color: "#6b7280" }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          disabled={!value}
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
  );
};

export default AddBucketDialog;
