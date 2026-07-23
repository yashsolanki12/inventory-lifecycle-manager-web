import { useAppBridge } from "@shopify/app-bridge-react";

export const useCurrentShopDomain = () => {
  const app = useAppBridge();
  return app.config.shop;
};

export const DASHBOARD_CARDS = [
  {
    key: "totalProducts",
    label: "Total Products",
    color: "#2563eb",
    getValue: (d) => d.totalProducts ?? 0,
  },
  {
    key: "totalStock",
    label: "Total Stock",
    color: "#7c3aed",
    getValue: (d) => d.totalStock ?? 0,
  },
  {
    key: "healthy",
    label: "Fresh Stock",
    color: "#34d399",
    getValue: (d) => d.buckets?.fresh ?? 0,
  },
  {
    key: "mild",
    label: "Mild Stock",
    color: "#84CC16",
    getValue: (d) => d.buckets?.mild ?? 0,
  },
  {
    key: "aging",
    label: "Aging Stock",
    color: "#f97316",
    getValue: (d) => d.buckets?.aging ?? 0,
  },
  {
    key: "dead",
    label: "Dead Stock",
    color: "#fb923c",
    getValue: (d) => d.buckets?.dead ?? 0,
  },
  {
    key: "value",
    label: "Inventory Value",
    color: "#008060",
    getValue: (d) =>
      d.currency === "USD"
        ? `$${d.totalInventoryValue ?? 0}`
        : (d.totalInventoryValue ?? 0),
  },
  {
    key: "deadValue",
    label: "Dead Stock Value",
    color: "#fb493c",
    getValue: (d) =>
      d.currency === "USD"
        ? `$${d.deadStockValue ?? 0}`
        : (d.deadStockValue ?? 0),
  },
];
