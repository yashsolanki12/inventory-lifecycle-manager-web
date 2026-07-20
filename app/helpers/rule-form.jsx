import { useState, useCallback, useEffect } from "react";
import {
  Page,
  Layout,
  Card,
  Form,
  FormLayout,
  TextField,
  Select,
  Checkbox,
  Button,
  Banner,
  BlockStack,
} from "@shopify/polaris";

const ACTION_TYPE_OPTIONS = [
  { label: "Archive Product", value: "archive" },
  { label: "Move to Draft", value: "draft" },
  { label: "Add Tag (needs external handler)", value: "tag" },
];

export default function RuleForm({
  mode = "create",
  initial = null,
  onSubmit,
  loading = false,
  error = null,
  onCancel,
}) {
  const [name, setName] = useState(initial?.name || "");
  const [actionType, setActionType] = useState(initial?.actionType || "archive");
  const [daysWithoutSales, setDaysWithoutSales] = useState(initial?.daysWithoutSales != null ? String(initial.daysWithoutSales) : "");
  const [productAgeDays, setProductAgeDays] = useState(initial?.productAgeDays != null ? String(initial.productAgeDays) : "");
  const [stockZero, setStockZero] = useState(Boolean(initial?.stockZero));
  const [excludedTags, setExcludedTags] = useState(initial?.excludedTags || "");

  useEffect(() => {
    if (!initial) return;
    setName(initial.name || "");
    setActionType(initial.actionType || "archive");
    setDaysWithoutSales(initial.daysWithoutSales != null ? String(initial.daysWithoutSales) : "");
    setProductAgeDays(initial.productAgeDays != null ? String(initial.productAgeDays) : "");
    setStockZero(Boolean(initial.stockZero));
    setExcludedTags(initial.excludedTags || "");
  }, [initial]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (!name || !actionType) {
        onSubmit({ name, actionType, error: "Name and Action Type are required." });
        return;
      }
      onSubmit({
        name,
        actionType,
        daysWithoutSales: daysWithoutSales ? parseInt(daysWithoutSales, 10) : null,
        productAgeDays: productAgeDays ? parseInt(productAgeDays, 10) : null,
        stockZero,
        excludedTags,
        active: initial?.active ?? true,
      });
    },
    [name, actionType, daysWithoutSales, productAgeDays, stockZero, excludedTags, onSubmit, initial]
  );

  return (
    <Page
      title={mode === "edit" ? "Edit Archive Rule" : "Create Archive Rule"}
      backAction={
        onCancel
          ? {
              content: "Rules",
              onAction: onCancel,
            }
          : undefined
      }
    >
      <Layout>
        <Layout.Section>
          {error && (
            <Banner title="Error" tone="critical">
              <p>{typeof error === "string" ? error : error?.message || "Something went wrong"}</p>
            </Banner>
          )}
          <Card>
            <Form onSubmit={handleSubmit}>
              <FormLayout>
                <TextField
                  label="Rule Name"
                  value={name}
                  onChange={setName}
                  autoComplete="off"
                  helpText="e.g. Archive if no sales for 120 days"
                />

                <Select
                  label="Action to Take"
                  options={ACTION_TYPE_OPTIONS}
                  value={actionType}
                  onChange={setActionType}
                />

                <BlockStack gap="200">
                  <p style={{ fontWeight: "bold" }}>Conditions (Match All)</p>

                  <TextField
                    label="Days Without Sales"
                    type="number"
                    value={daysWithoutSales}
                    onChange={setDaysWithoutSales}
                    autoComplete="off"
                    helpText="Product hasn't sold in this many days"
                  />

                  <TextField
                    label="Product Age (Days)"
                    type="number"
                    value={productAgeDays}
                    onChange={setProductAgeDays}
                    autoComplete="off"
                    helpText="Product was created more than this many days ago"
                  />

                  <Checkbox
                    label="Inventory must be 0"
                    checked={stockZero}
                    onChange={setStockZero}
                  />

                  <TextField
                    label="Exclude Tags (comma separated)"
                    value={excludedTags}
                    onChange={setExcludedTags}
                    autoComplete="off"
                    helpText="Products with these tags will be ignored (e.g. 'never-archive, bestseller')"
                  />
                </BlockStack>

                <Button submit variant="primary" loading={loading}>
                  {mode === "edit" ? "Update Rule" : "Save Rule"}
                </Button>
              </FormLayout>
            </Form>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
