import React from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import {
  COLOR_MAP,
  ITEM_HEIGHT,
  ITEM_PADDING_TOP,
  PAPER_ID,
} from "./config/constants";

export const APP_HANDLE =
  import.meta.env.SHOPIFY_APP_NAME ?? "inventory-lifecycle-manager";

export const useCurrentShopDomain = () => {
  const app = useAppBridge();
  return app.config.shop;
};

export const usePricingRedirect = () => {
  const app = useAppBridge();

  return React.useCallback(() => {
    try {
      // App Bridge redirect.dispatch is the correct embedded navigation (it moves
      // the admin top frame to the billing page). The shop is taken from the
      // ?shop= URL param (always present in the admin iframe) because
      // app.config.shop is often empty in production — which is why the button
      // did nothing on Render. This matches the local-working behavior exactly.
      const urlShop =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get("shop")
          : null;
      const shop = urlShop || app?.config?.shop;
      if (!shop) {
        console.warn("[PricingRedirect] No shop resolved — aborting");
        return;
      }
      const storeHandle = shop.split(".").at(0);
      const path = `/store/${storeHandle}/charges/${APP_HANDLE}/pricing_plans`;
      if (app?.redirect?.dispatch) {
        app.redirect.dispatch("ADMIN_PATH", path);
      } else {
        window.top.location.href = `https://admin.shopify.com${path}`;
      }
    } catch (err) {
      console.error("[PricingRedirect] error:", err);
    }
  }, [app]);
};

export const getColorHex = (colorName) => {
  const normalized = colorName?.toLowerCase().trim();
  return COLOR_MAP[normalized] || null;
};

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);

  // Format the date part: "Aug 15, 2026"
  const datePart = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  // Format the time part: "3:33 PM"
  const timePart = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });

  // Rearrange to: "15 Aug 2026, 3:33 PM"
  const [month, day, year] = datePart.replace(",", "").split(" ");
  return `${day} ${month} ${year}, ${timePart}`;
};

export const MenuProps = {
  PaperProps: {
    id: PAPER_ID,
    sx: {
      maxHeight: `${ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP}px !important`,
      overflowY: "auto !important",
    },
  },
  slotProps: {
    paper: {
      id: PAPER_ID,
      sx: {
        maxHeight: `${ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP}px !important`,
        overflowY: "auto !important",
      },
    },
  },
};

export const formatPrice = (currency, price) => {
  if (price === null || price === undefined || isNaN(price))
    return `${currency || ""} 0`;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency || "USD",
  }).format(price);
};

export function buildConditionPreview(v) {
  if (!v) return "";
  const opMap = {
    lt: "<",
    lte: "<=",
    gt: ">",
    gte: ">=",
  };
  const clauses = [
    `no sale ${opMap[v.daysWithoutSalesOperator] || "at least"} ${v.daysWithoutSales ?? 0} days`,
  ];
  if (v.productAgeDays > 0)
    clauses.push(`product age ≥ ${v.productAgeDays} days`);
  if (v.stockZero) clauses.push("out of stock");
  else if (v.stockThreshold > 0) clauses.push(`stock ≥ ${v.stockThreshold}`);
  if (v.productType) clauses.push(`product type is "${v.productType}"`);
  if (v.vendor) clauses.push(`vendor is "${v.vendor}"`);
  if (Array.isArray(v.excludedTags) && v.excludedTags.length)
    clauses.push(`exclude tags: ${v.excludedTags.join(", ")}`);
  return `${v.rule_name || "Untitled rule"}: ${clauses.join(" AND ")} → action: ${v.actionType || "—"}`;
}
