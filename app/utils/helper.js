import React from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useRouteLoaderData } from "react-router";
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
  const routeData = useRouteLoaderData("routes/app");

  return React.useCallback(() => {
    try {
      // Primary path: use the billing URL computed SERVER-SIDE in the app
      // loader (it reads process.env.SHOPIFY_APP_NAME, which is available on the
      // server but NOT in the browser bundle). Opening it with window.open(...,
      // "_blank") always launches the billing page — no App Bridge, no React
      // Router loader interception, no cross-origin top-navigation block.
      const billingUrl = routeData?.billingUrl;
      if (billingUrl) {
        const popped = window.open(billingUrl, "_top");
        // If the popup is blocked by the iframe sandbox, navigate the iframe
        // itself to the billing page as a guaranteed fallback.
        if (!popped) {
          window.location.href = billingUrl;
        }
        return;
      }

      // Fallback (e.g. billingUrl missing): App Bridge dispatch, deriving the
      // shop from the ?shop= URL param since app.config.shop can be empty in
      // production.
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
  }, [app, routeData]);
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
