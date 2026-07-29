import React from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useRouteLoaderData } from "react-router";

export const APP_HANDLE =
  import.meta.env.SHOPIFY_APP_NAME ?? "inventory-lifecycle-manager";

export const useCurrentShopDomain = () => {
  const routeData = useRouteLoaderData("routes/app");
  return routeData?.shop || null;
};

export const usePricingRedirect = () => {
  const app = useAppBridge();

  return React.useCallback(() => {
    try {
      const shop = app?.config?.shop;
      if (!shop) return;
      const storeHandle = shop.split(".").at(0);
      const path = `/store/${storeHandle}/charges/${APP_HANDLE}/pricing_plans`;
      if (app?.redirect?.dispatch) {
        app.redirect.dispatch("ADMIN_PATH", path);
      } else {
        window.top.location.href = `https://admin.shopify.com${path}`;
      }
    } catch {
      // SSR or App Bridge not ready
    }
  }, [app]);
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

export const COLORS = ["#34d399", "#84cc16", "#f97316", "#fb923c", "#ef4444"];

export const MIN_SEARCH_CHARS = 3;

export const PERIOD_OPTIONS = [
  { label: "7D", days: 7 },
  { label: "14D", days: 14 },
  { label: "30D", days: 30 },
];

export const PLAN_COLORS = {
  free: { bg: "#f3f4f6", text: "#6b7280" },
  starter: { bg: "#ecfdf5", text: "#008060" },
  pro: { bg: "#eff6ff", text: "#2563eb" },
};

export const PRODUCT_COLORS = [
  "#2563eb",
  "#8b5e3c",
  "#facc15",
  "#059669",
  "#7c3aed",
];

export const PLAN_SKU_TEXT = {
  free: "Sync up to 100 products",
  starter: "Sync up to 1,000 products",
  pro: "Sync unlimited products",
};

export const FEATURES = [
  { icon: "\u{1F4E6}", label: "Import all products" },
  { icon: "\u{1F4CA}", label: "Track inventory levels" },
  { icon: "\u{1F504}", label: "Auto-sync updates" },
];

export const ZOOM_FACTOR = 2.5;
