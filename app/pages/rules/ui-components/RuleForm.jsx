import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CircularProgress from "@mui/material/CircularProgress";
import AsyncAutocomplete from "../../../components/AsyncAutocomplete";
import AsyncMultiSelectTags from "../../../components/AsyncMultiSelectTags";

import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ruleFormSchema,
  defaultRuleValues,
} from "../../../validations/rule-form-schema";
import { ACTION_TYPE_OPTIONS, OPERATOR_OPTIONS } from "../../../utils/helper";
import {
  getProductTypes,
  getProductVendors,
  getProductTags,
} from "../../../api/products";

const RuleForm = ({
  initialData,
  onSubmit,
  isEdit = false,
  isSubmitting = false,
}) => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(ruleFormSchema),
    defaultValues: initialData || defaultRuleValues,
    mode: "onBlur",
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
  };

  const formFieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      fontSize: 14,
    },
    "& .MuiInputLabel-root": {
      fontSize: 14,
    },
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        // maxWidth: 700,
        mx: "auto",
        backgroundColor: "white",
        padding: "20px 30px",
        borderRadius: 3,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton
          onClick={() => navigate("/app/rules")}
          sx={{ color: "#202223" }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 600, color: "#202223" }}>
          {isEdit ? "Edit Rule" : "Create Rule"}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Controller
          name="rule_name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Rule Name"
              error={!!errors.rule_name}
              helperText={errors.rule_name?.message}
              fullWidth
              sx={formFieldSx}
            />
          )}
        />

        <Controller
          name="rule_condition"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Rule Condition"
              error={!!errors.rule_condition}
              helperText={errors.rule_condition?.message}
              fullWidth
              sx={formFieldSx}
            />
          )}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Controller
          name="daysWithoutSales"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Days Without Sales"
              type="number"
              error={!!errors.daysWithoutSales}
              helperText={errors.daysWithoutSales?.message}
              fullWidth
              sx={formFieldSx}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          )}
        />

        <Controller
          name="daysWithoutSalesOperator"
          control={control}
          render={({ field }) => (
            <FormControl
              fullWidth
              error={!!errors.daysWithoutSalesOperator}
              sx={formFieldSx}
            >
              <InputLabel>Operator</InputLabel>
              <Select {...field} label="Operator">
                {OPERATOR_OPTIONS.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Controller
          name="productAgeDays"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Product Age (Days)"
              type="number"
              error={!!errors.productAgeDays}
              helperText={errors.productAgeDays?.message}
              fullWidth
              sx={formFieldSx}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          )}
        />

        <Controller
          name="stockThreshold"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Stock Threshold"
              type="number"
              error={!!errors.stockThreshold}
              helperText={errors.stockThreshold?.message}
              fullWidth
              sx={formFieldSx}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          )}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2, "& > *": { flex: 1 } }}>
        <Controller
          name="productType"
          control={control}
          render={({ field }) => (
            <AsyncAutocomplete
              label="Product Type"
              value={field.value}
              onChange={field.onChange}
              fetchFn={getProductTypes}
              error={!!errors.productType}
              helperText={errors.productType?.message}
            />
          )}
        />
        <Controller
          name="vendor"
          control={control}
          render={({ field }) => (
            <AsyncAutocomplete
              label="Vendor"
              value={field.value}
              onChange={field.onChange}
              fetchFn={getProductVendors}
              error={!!errors.vendor}
              helperText={errors.vendor?.message}
            />
          )}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Controller
          name="excludedTags"
          control={control}
          render={({ field }) => (
            <AsyncMultiSelectTags
              label="Excluded Tags"
              value={field.value}
              onChange={field.onChange}
              fetchFn={getProductTags}
              error={!!errors.excludedTags}
              helperText={errors.excludedTags?.message}
            />
          )}
        />

        <Controller
          name="actionType"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.actionType} sx={formFieldSx}>
              <InputLabel shrink>Action Type</InputLabel>
              <Select {...field} label="Action Type" displayEmpty labelId="actionType-label">
                <MenuItem value="" disabled>
                  <Typography sx={{ fontSize: 14, color: "#00040a" }}>
                    All type
                  </Typography>
                </MenuItem>
                {ACTION_TYPE_OPTIONS.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.actionType && (
                <FormHelperText>{errors.actionType.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Box>

      <Controller
        name="stockZero"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Switch
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                color="primary"
              />
            }
            label="Only match products with zero stock"
            sx={{ ml: 0 }}
          />
        )}
      />

      <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}>
        <Button
          type="button"
          variant="outlined"
          onClick={() => navigate("/app/rules")}
          disabled={isSubmitting}
          sx={{
            borderColor: "#cad0d6",
            color: "#374151",
            textTransform: "none",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "13px",
            px: 2,
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          sx={{
            bgcolor: "#202223",
            color: "white",
            textTransform: "none",
            padding: "4px 20px",
            "&.Mui-disabled": {
              bgcolor: "#202223",
              color: "white",
            },
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={20} color="inherit" />
          ) : isEdit ? (
            "Save"
          ) : (
            "Create"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default RuleForm;
