import React from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useRouteLoaderData } from "react-router";
import { COLOR_MAP, ITEM_HEIGHT, ITEM_PADDING_TOP, PAPER_ID } from "./config/constants";

export const APP_HANDLE_FALLBACK = "inventory-lifecycle-manager";

export const useCurrentShopDomain = () => {
  const routeData = useRouteLoaderData("routes/app");
  return routeData?.shop || null;
};

export const usePricingRedirect = () => {
  const app = useAppBridge();
  const routeData = useRouteLoaderData("routes/app");

  return React.useCallback(() => {
    try {
      // Prefer values from the route loader — reliable in every environment
      // and avoids any async/network dependency (which silently fails on
      // some deployments). app.config.* is used only as a fallback.
      const shop = routeData?.shop || app?.config?.shop;
      const appHandle = routeData?.appName || APP_HANDLE_FALLBACK;
      console.log(
        "[PricingRedirect] shop=",
        shop,
        "| routeShop=",
        routeData?.shop,
        "| appShop=",
        app?.config?.shop,
        "| appHandle=",
        appHandle,
        "| hasDispatch=",
        !!app?.redirect?.dispatch,
      );
      if (!shop) {
        console.warn("[PricingRedirect] No shop resolved — aborting redirect");
        return;
      }
      const storeHandle = shop.split(".").at(0);
      const path = `/store/${storeHandle}/charges/${appHandle}/pricing_plans`;
      console.log("[PricingRedirect] redirecting ->", `https://admin.shopify.com${path}`);
      if (app?.redirect?.dispatch) {
        app.redirect.dispatch("ADMIN_PATH", path);
      } else {
        window.top.location.href = `https://admin.shopify.com${path}`;
      }
      console.log("[PricingRedirect] redirect dispatched");
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
  if (v.productAgeDays > 0) clauses.push(`product age ≥ ${v.productAgeDays} days`);
  if (v.stockZero) clauses.push("out of stock");
  else if (v.stockThreshold > 0) clauses.push(`stock ≥ ${v.stockThreshold}`);
  if (v.productType) clauses.push(`product type is "${v.productType}"`);
  if (v.vendor) clauses.push(`vendor is "${v.vendor}"`);
  if (Array.isArray(v.excludedTags) && v.excludedTags.length)
    clauses.push(`exclude tags: ${v.excludedTags.join(", ")}`);
  return `${v.rule_name || "Untitled rule"}: ${clauses.join(" AND ")} → action: ${v.actionType || "—"}`;
}
