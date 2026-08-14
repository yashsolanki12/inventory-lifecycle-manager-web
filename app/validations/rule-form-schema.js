import { z } from "zod";

export const ruleFormSchema = z.object({
  rule_name: z
    .string()
    .min(1, "Rule name is required")
    .max(255, "Rule name must be 255 characters or less"),

  rule_condition: z
    .string()
    .min(1, "Rule condition is required"),
    // .max(255, "Rule condition must be 255 characters or less"),

  daysWithoutSales: z
    .number()
    .min(0, "Days without sales must be at least 0")
    .int("Days without sales must be a whole number"),

  daysWithoutSalesOperator: z.enum(["lt", "lte", "gt", "gte"], {
    required_error: "Operator is required",
  }),

  stockZero: z.boolean().default(false),

  stockThreshold: z
    .number()
    .min(0, "Stock threshold must be at least 0")
    .int("Stock threshold must be a whole number")
    .default(0),

  productAgeDays: z
    .number()
    .min(0, "Product age days must be at least 0")
    .int("Product age days must be a whole number")
    .default(0),

  productType: z
    .string()
    .min(1, "Product type is required"),

  vendor: z
    .string()
    .optional()
    .or(z.literal("")),

  excludedTags: z
    .array(z.string())
    .optional()
    .default([]),

  actionType: z
    .string()
    .min(1, "Action type is required")
    .refine((val) => ["active", "draft", "unlisted", "email", "tag", "archive"].includes(val), {
      message: "Action type is required",
    }),
});

export const defaultRuleValues = {
  rule_name: "",
  rule_condition: "",
  daysWithoutSales: 0,
  daysWithoutSalesOperator: "gte",
  stockZero: false,
  stockThreshold: 0,
  productAgeDays: 0,
  productType: "",
  vendor: "",
  excludedTags: [],
  actionType: "",
};
