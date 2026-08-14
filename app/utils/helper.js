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

// Open an external billing URL in the admin TOP frame (_top). Tries App Bridge
// redirect.dispatch first (the sanctioned _top navigation via Shopify's
// postMessage), then window.top.location.href, then the iframe itself as a last
// resort. No _blank / new-tab behavior. Returns a diagnostic object describing
// exactly what happened so failures are visible on-screen.
export const openBillingUrl = (url, app) => {
  const log = [];
  if (!url) {
    return { method: "empty", log: ["billingUrl is EMPTY"] };
  }
  log.push("url:" + url);

  log.push("hasApp:" + Boolean(app));
  log.push(
    "hasAppRedirect:" +
      Boolean(app && app.redirect && typeof app.redirect.dispatch === "function"),
  );

  // 1) App Bridge dispatch to the admin path (top frame — correct context).
  try {
    if (app?.redirect?.dispatch) {
      const path = new URL(url).pathname; // /store/<store>/charges/<handle>/pricing_plans
      app.redirect.dispatch("ADMIN_PATH", path);
      log.push("appbridge:dispatched");
    } else {
      log.push("appbridge:unavailable");
    }
  } catch (e) {
    log.push("appbridge:threw:" + e.message);
  }
  // 2) Top-frame navigation (_top) — does not throw when blocked, so we always
  //    continue to the iframe fallback regardless of the outcome.
  try {
    window.top.location.href = url;
    log.push("top:set");
  } catch (e) {
    log.push("top:threw:" + e.message);
  }
  // 3) Last resort: navigate the iframe itself.
  try {
    window.location.href = url;
    log.push("iframe:set");
  } catch (e) {
    log.push("iframe:threw:" + e.message);
  }

  const method = log.includes("appbridge:dispatched")
    ? "appbridge"
    : log.includes("top:set")
      ? "top"
      : "iframe";
  return { method, log };
};

export const usePricingRedirect = () => {
  const app = useAppBridge();
  const routeData = useRouteLoaderData("routes/app");

  return React.useCallback(() => {
    try {
      // Prefer the billing URL computed SERVER-SIDE in the app loader (reads
      // process.env.SHOPIFY_APP_NAME, available on the server but not the
      // browser bundle). openBillingUrl navigates the admin TOP frame (_top).
      const billingUrl = routeData?.billingUrl;
      if (billingUrl) {
        openBillingUrl(billingUrl, app);
        return;
      }

      // Fallback (e.g. billingUrl missing): build from the shop and use _top nav.
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
      openBillingUrl(`https://admin.shopify.com${path}`, app);
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
