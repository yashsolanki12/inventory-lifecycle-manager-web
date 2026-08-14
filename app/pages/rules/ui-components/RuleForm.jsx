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
import Tooltip from "@mui/material/Tooltip";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ruleFormSchema,
  defaultRuleValues,
} from "../../../validations/rule-form-schema";
import {
  getProductTypes,
  getProductVendors,
  getProductTags,
} from "../../../api/products";
import {
  ACTION_TYPE_OPTIONS,
  OPERATOR_OPTIONS,
} from "../../../utils/config/constants";
import { buildConditionPreview } from "../../../utils/helper";

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
    watch,
    setValue,
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

  const watched = watch();
  const preview = buildConditionPreview(watched);

  React.useEffect(() => {
    setValue("rule_condition", preview, { shouldValidate: true });
  }, [preview, setValue]);

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
  };

  const formFieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      fontSize: 16,
    },
    "& .MuiOutlinedInput-input": {
      fontSize: 14,
    },
    "& .MuiInputLabel-root": {
      fontSize: 16,
    },
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
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
          padding: "30px",
          borderRadius: 3,
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <Controller
            name="rule_name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Rule Name"
                error={!!errors.rule_name}
                helperText={
                  errors.rule_name?.message ??
                  `${(field.value ?? "").length}/100 characters`
                }
                fullWidth
                slotProps={{ htmlInput: { maxLength: 100 } }}
                sx={formFieldSx}
              />
            )}
          />

          <Controller
            name="rule_condition"
            control={control}
            render={({ field }) => {
              return (
                <Tooltip
                  title={field.value}
                  arrow
                  placement="top"
                  slotProps={{
                    tooltip: {
                      sx: {
                        lineHeight: 1.5,
                        fontSize: "11.5px",
                      },
                    },
                  }}
                >
                  <TextField
                    {...field}
                    label="Rule Condition"
                    error={!!errors.rule_condition}
                    helperText={
                      errors.rule_condition?.message ??
                      "Auto-generated from the given fields"
                    }
                    slotProps={{ htmlInput: { readOnly: true } }}
                    fullWidth
                    title={field.value || ""}
                    sx={{
                      ...formFieldSx,
                      "& .MuiOutlinedInput-input": {
                        fontSize: 14,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      },
                    }}
                  />
                </Tooltip>
              );
            }}
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
                helperText={
                  errors.daysWithoutSales?.message ??
                  `Allowed range: 0-999 (${field.value == null || field.value === "" ? 0 : String(field.value).length}/3 digits)`
                }
                fullWidth
                sx={formFieldSx}
                slotProps={{ htmlInput: { maxLength: 3 } }}

                onChange={(e) => {
                  const raw = e.target.value;
                  if (raw === "") return field.onChange(0);
                  if (!/^\d{1,3}$/.test(raw) || Number(raw) > 999) return;
                  field.onChange(Number(raw));
                }}
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
                sx={formFieldSx}
                helperText={
                  errors.productAgeDays?.message ??
                  `Allowed range: 0-999 (${field.value == null || field.value === "" ? 0 : String(field.value).length}/3 digits)`
                }
                fullWidth
                slotProps={{ htmlInput: { maxLength: 3 } }}
                onChange={(e) => {
                  const raw = e.target.value;
                  if (raw === "") return field.onChange(0);
                  if (!/^\d{1,3}$/.test(raw) || Number(raw) > 999) return;
                  field.onChange(Number(raw));
                }}
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
                sx={formFieldSx}
                helperText={
                  errors.stockThreshold?.message ??
                  `Allowed range: 0-999 (${field.value == null || field.value === "" ? 0 : String(field.value).length}/3 digits)`
                }
                fullWidth
                slotProps={{ htmlInput: { maxLength: 3 } }}
                onChange={(e) => {
                  const raw = e.target.value;
                  if (raw === "") return field.onChange(0);
                  if (!/^\d{1,3}$/.test(raw) || Number(raw) > 999) return;
                  field.onChange(Number(raw));
                }}
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
              <FormControl
                fullWidth
                error={!!errors.actionType}
                sx={formFieldSx}
              >
                <InputLabel shrink>Action Type</InputLabel>
                <Select
                  {...field}
                  label="Action Type"
                  displayEmpty
                  labelId="actionType-label"
                >
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
                  sx={{ pointerEvents: "auto" }}
                />
              }
              label="Only match products with zero stock"
              sx={{
                ml: 0,
                pointerEvents: "none",
                "& .MuiFormControlLabel-label": {
                  cursor: "default",
                },
              }}

              onClick={(e) => {
                if (e.target.tagName !== "INPUT") {
                  e.preventDefault();
                }
              }}
            />
          )}
        />

        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
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
    </>
  );
};

export default RuleForm;
