import React from "react";
import {
  COLOR_MAP,
  ITEM_HEIGHT,
  ITEM_PADDING_TOP,
  PAPER_ID,
} from "./config/constants";
import { AppContext } from "./app-context";

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
  const { shop } = React.useContext(AppContext);
  const result = shop || "";
  if (typeof window !== "undefined") {
    console.log("[DEBUG] useCurrentShopDomain:", result);
  }
  return result;
};

// export const useCurrentShopDomain = () => {
//   const routeData = useRouteLoaderData("routes/app");
//   const routeShop = routeData?.shop || "";
//   const ctxShop = React.useContext(ShopDomainContext);

//   if (ctxShop) return ctxShop;

//   if (typeof window !== "undefined") {
//     const urlShop = new URLSearchParams(window.location.search).get("shop");
//     if (urlShop) {
//       _cachedShopDomain = urlShop;
//       return urlShop;
//     }

//     if (window.shopify?.config?.shop) {
//       _cachedShopDomain = window.shopify.config.shop;
//       return _cachedShopDomain;
//     }
//   }

//   if (routeShop) {
//     _cachedShopDomain = routeShop;
//     return routeShop;
//   }

//   if (typeof window === "undefined") return _cachedShopDomain || "";

//   return _cachedShopDomain || "";
// };

export const openBillingUrl = (url) => {
  const log = [];
  if (!url) {
    return { method: "empty", log: ["billingUrl is EMPTY"] };
  }
  log.push("url:" + url);

  try {
    if (typeof window !== "undefined") {
      window.open(url, "_top");
      log.push("window.open(_top)");
    }
  } catch (e) {
    log.push("error:" + e.message);
  }

  return { method: "appbridge_v4", log };
};

export const usePricingRedirect = () => {
  const { billingUrl } = React.useContext(AppContext);

  return React.useCallback(() => {
    console.log("billing url", billingUrl);
    if (billingUrl) {
      openBillingUrl(billingUrl);
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

    openBillingUrl(`https://admin.shopify.com${path}`);
  }, [billingUrl]);
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
