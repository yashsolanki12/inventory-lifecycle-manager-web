import React from "react";
import { useRouteLoaderData } from "react-router";
import {
  COLOR_MAP,
  ITEM_HEIGHT,
  ITEM_PADDING_TOP,
  PAPER_ID,
} from "./config/constants";

export const APP_HANDLE =
  import.meta.env.SHOPIFY_APP_NAME ?? "inventory-lifecycle-manager";

let _cachedShopDomain = "";

export function setShopDomain(domain) {
  if (domain) {
    _cachedShopDomain = domain;
  }
}

export const ShopDomainContext = React.createContext("");

export const useCurrentShopDomain = () => {
  const routeData = useRouteLoaderData("routes/app");
  const routeShop = routeData?.shop || "";

  const ctxShop = React.useContext(ShopDomainContext);

  if (ctxShop) return ctxShop;
  if (routeShop) return routeShop;

  if (typeof window === "undefined") return _cachedShopDomain || "";

  // In App Bridge v4, the shop domain is always available globally
  if (window.shopify?.config?.shop) {
    _cachedShopDomain = window.shopify.config.shop;
    return _cachedShopDomain;
  }

  const urlShop = new URLSearchParams(window.location.search).get("shop") || "";
  if (urlShop) {
    _cachedShopDomain = urlShop;
    return urlShop;
  }

  return _cachedShopDomain || "";
};
// export const useCurrentShopDomain = () => {
//   const app = useAppBridge();
//   const routeData = useRouteLoaderData("routes/app");
//   if (typeof window === "undefined") return _cachedShopDomain;

//   const routeShop = routeData?.shop || "";
//   const bridgeShop = app?.config?.shop || "";
//   const urlShop = new URLSearchParams(window.location.search).get("shop") || "";

//   const shop = routeShop || bridgeShop || urlShop || _cachedShopDomain;

//   if (shop && !_cachedShopDomain) {
//     _cachedShopDomain = shop;
//   }

//   if (!shop) {
//     console.warn(
//       "[useCurrentShopDomain] No shop found — routeData:",
//       routeData,
//       "appBridge:",
//       app?.config,
//     );
//   }

//   return shop || "";
// };

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

  try {
    // In App Bridge v4, open with _top is automatically intercepted and handled securely
    if (typeof open !== 'undefined') {
      open(url, '_top');
      log.push("window.open(_top)");
    } else {
      window.top.location.href = url;
      log.push("top:set");
    }
  } catch (e) {
    log.push("error:" + e.message);
  }

  return { method: "appbridge_v4", log };
};

export const usePricingRedirect = () => {
  const routeData = useRouteLoaderData("routes/app");

  return React.useCallback(() => {
    const billingUrl = routeData?.billingUrl;
    if (billingUrl) {
      // In Shopify App Bridge v4 with embedded apps, we can just use the global shopify object
      if (typeof window !== "undefined" && window.shopify && window.shopify.config) {
        openBillingUrl(billingUrl, window.shopify);
      } else {
        openBillingUrl(billingUrl, null);
      }
      return;
    }

    if (typeof window === "undefined") {
      console.warn("[PricingRedirect] No shop resolved — aborting");
      return;
    }

    const urlShop = new URLSearchParams(window.location.search).get("shop");
    if (!urlShop) {
      console.warn("[PricingRedirect] No shop resolved — aborting");
      return;
    }
    const storeHandle = urlShop.split(".").at(0);
    const path = `/store/${storeHandle}/charges/${APP_HANDLE}/pricing_plans`;
    
    if (typeof window !== "undefined" && window.shopify && window.shopify.config) {
      openBillingUrl(`https://admin.shopify.com${path}`, window.shopify);
    } else {
      openBillingUrl(`https://admin.shopify.com${path}`, null);
    }
  }, [routeData]);
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
