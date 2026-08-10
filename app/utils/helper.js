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
    getValue: (d) => {
      if (d.totalInventoryValue)
        return formatPrice(d.currency, d.totalInventoryValue);
      return 0;
    },
  },
  {
    key: "deadValue",
    label: "Dead Stock Value",
    color: "#fb493c",
    getValue: (d) => {
      if (d.deadStockValue) return formatPrice(d.currency, d.deadStockValue);
      return 0;
    },
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

export const COLOR_MAP = {
  black: "#000000",
  white: "#ffffff",
  red: "#ef4444",
  blue: "#3b82f6",
  green: "#22c55e",
  yellow: "#eab308",
  orange: "#f97316",
  purple: "#a855f7",
  pink: "#ec4899",
  brown: "#92400e",
  grey: "#6b7280",
  gray: "#6b7280",
  silver: "#c0c0c0",
  gold: "#ffd700",
  navy: "#1e3a5f",
  teal: "#14b8a6",
  cyan: "#06b6d4",
  maroon: "#800000",
  olive: "#808000",
  lime: "#84cc16",
  indigo: "#6366f1",
  violet: "#8b5cf6",
  beige: "#f5f5dc",
  coral: "#ff7f50",
  salmon: "#fa8072",
  turquoise: "#40e0d0",
  lavender: "#e6e6fa",
  peach: "#ffcba4",
  mint: "#98ff98",
  ivory: "#fffff0",
  charcoal: "#36454f",
  alabaster: "#fefaf0",
  alice_blue: "#f0f8ff",
  amber: "#ffbf00",
  amethyst: "#9966cc",
  antique_white: "#faebd7",
  apricot: "#fbceb1",
  aquamarine: "#7fffd4",
  army_green: "#4b5320",
  ash: "#b2beb5",
  avocado: "#568203",
  azure: "#007fff",
  baby_blue: "#89cff0",
  bisque: "#ffe4c4",
  blanched_almond: "#ffebcd",
  blue_violet: "#8a2be2",
  boysenberry: "#873260",
  brick_red: "#cb4154",
  bronze: "#cd7f32",
  buff: "#f0dc82",
  burgundy: "#800020",
  burlywood: "#deb887",
  cadet_blue: "#5f9ea0",
  camel: "#c19a6b",
  canary: "#ffef00",
  cardinal: "#c41e3a",
  celeste: "#b2ffff",
  cerise: "#de3163",
  cerulean: "#007ba7",
  chartreuse: "#7fff00",
  chestnut: "#954535",
  chiffon: "#fbffb7",
  chocolate: "#d2691e",
  cinnamon: "#d2691e",
  claret: "#7f1734",
  coal: "#4c4c4c",
  cobalt: "#0047ab",
  coffee: "#6f4e37",
  copper: "#b87333",
  corn: "#fbec5d",
  cornflower_blue: "#6495ed",
  cornsilk: "#fff8dc",
  cream: "#fffdd0",
  crimson: "#dc143c",
  cyan_blue: "#1f75fe",
  dark_blue: "#00008b",
  dark_cyan: "#008b8b",
  dark_goldenrod: "#b8860b",
  dark_gray: "#a9a9a9",
  dark_green: "#006400",
  dark_khaki: "#bdb76b",
  dark_magenta: "#8b008b",
  dark_olive_green: "#556b2f",
  dark_orange: "#ff8c00",
  dark_orchid: "#9932cc",
  dark_red: "#8b0000",
  dark_salmon: "#e9967a",
  dark_sea_green: "#8fbc8f",
  dark_slate_blue: "#483d8b",
  dark_slate_gray: "#2f4f4f",
  dark_turquoise: "#00ced1",
  dark_violet: "#9400d3",
  deep_pink: "#ff1493",
  deep_sky_blue: "#00bfff",
  denim: "#1560bd",
  dim_gray: "#696969",
  dodger_blue: "#1e90ff",
  ebony: "#555d50",
  ecru: "#c2b280",
  eggplant: "#614051",
  electric_blue: "#7df9ff",
  emerald: "#50c878",
  firebrick: "#b22222",
  flax: "#eedc82",
  floral_white: "#fffaf0",
  forest_green: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghost_white: "#f8f8ff",
  goldenrod: "#daa520",
  grape: "#6f2da8",
  green_yellow: "#adff2f",
  gunmetal: "#2a3439",
  honeydew: "#f0fff0",
  hot_pink: "#ff69b4",
  hunter_green: "#355e3b",
  ice_blue: "#99ffff",
  indian_red: "#cd5c5c",
  jade: "#00a86b",
  kelly_green: "#4cbb17",
  khaki: "#f0e68c",
  lavender_blush: "#fff0f5",
  lawn_green: "#7cfc00",
  lemon: "#fff700",
  lemon_chiffon: "#fffacd",
  light_blue: "#add8e6",
  light_coral: "#f08080",
  light_cyan: "#e0ffff",
  light_goldenrod_yellow: "#fafad2",
  light_gray: "#d3d3d3",
  light_green: "#90ee90",
  light_pink: "#ffb6c1",
  light_salmon: "#ffa07a",
  light_sea_green: "#20b2aa",
  light_sky_blue: "#87cefa",
  light_slate_gray: "#778899",
  light_steel_blue: "#b0c4de",
  light_yellow: "#ffffe0",
  lilac: "#c8a2c8",
  lime_green: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  magenta_haze: "#9f4576",
  mahogany: "#c04000",
  malachite: "#0bda51",
  mauve: "#e0b0ff",
  medium_aquamarine: "#66cdaa",
  medium_blue: "#0000cd",
  medium_orchid: "#ba55d3",
  medium_purple: "#9370db",
  medium_sea_green: "#3cb371",
  medium_slate_blue: "#7b68ee",
  medium_spring_green: "#00fa9a",
  medium_turquoise: "#48d1cc",
  medium_violet_red: "#c71585",
  midnight_blue: "#191970",
  mint_cream: "#f5fffa",
  misty_rose: "#ffe4e1",
  moccasin: "#ffe4b5",
  moss_green: "#8a9a5b",
  mulberry: "#c54b8c",
  mustard: "#ffdb58",
  navajo_white: "#ffdead",
  obsidian: "#0f1115",
  old_lace: "#fdf5e6",
  olive_drab: "#6b8e23",
  onyx: "#353839",
  orange_red: "#ff4500",
  orchid: "#da70d6",
  pale_goldenrod: "#eee8aa",
  pale_green: "#98fb98",
  pale_turquoise: "#afeeee",
  pale_violet_red: "#db7093",
  papaya_whip: "#ffefd5",
  peach_puff: "#ffdab9",
  pear: "#d1e231",
  peru: "#cd853f",
  periwinkle: "#ccccff",
  pewter: "#890000",
  pine_green: "#01796f",
  pistachio: "#93c572",
  platinum: "#e5e4e2",
  plum: "#dda0dd",
  powder_blue: "#b0e0e6",
  raisin: "#242124",
  rose: "#ff007f",
  rosy_brown: "#bc8f8f",
  royal_blue: "#4169e1",
  ruby: "#e0115f",
  rust: "#b7410e",
  saddle_brown: "#8b4513",
  saffron: "#f4c430",
  sage: "#bcb88a",
  sandy_brown: "#f4a460",
  sapphire: "#0f52ba",
  scarlet: "#ff2400",
  sea_green: "#2e8b57",
  seashell: "#fff5ee",
  sepia: "#704214",
  shamrock: "#009e60",
  sienna: "#a0522d",
  sky_blue: "#87ceeb",
  slate: "#708090",
  smoke: "#738276",
  snow: "#fffafa",
  spring_green: "#00ff7f",
  steel_blue: "#4682b4",
  tan: "#d2b48c",
  tangerine: "#f28500",
  taupe: "#483c32",
  tawny: "#cd5700",
  terracotta: "#e2725b",
  thistle: "#d8bfd8",
  titanium: "#878681",
  tomato: "#ff6347",
  ultramarine: "#120a8f",
  umber: "#635147",
  watermelon: "#fc6c85",
  wheat: "#f5deb3",
  white_smoke: "#f5f5f5",
  wisteria: "#c9a0dc",
  yellow_green: "#9acd32",
};

export const getColorHex = (colorName) => {
  const normalized = colorName?.toLowerCase().trim();
  return COLOR_MAP[normalized] || null;
};

export const VELOCITY_CONFIG = {
  fast: { label: "Fast", color: "#15803d", bg: "#dcfce7" },
  moderate: { label: "Moderate", color: "#a16207", bg: "#fef9c3" },
  slow: { label: "Slow", color: "#c2410c", bg: "#ffedd5" },
  dead: { label: "Dead", color: "#b91c1c", bg: "#fee2e2" },
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

export const PAGE_SIZE = 10;

export const MOVEMENT_CONFIG = {
  addition: { label: "Restocked", color: "#15803d", bg: "#dcfce7" },
  removal: { label: "Removed", color: "#b91c1c", bg: "#fee2e2" },
  sale: { label: "Sold", color: "#2563eb", bg: "#dbeafe" },
  adjustment: { label: "Adjusted", color: "#a16207", bg: "#fef9c3" },
  restock: { label: "Restocked", color: "#15803d", bg: "#dcfce7" },
  initial: { label: "Initial", color: "#6b7280", bg: "#f3f4f6" },
};

export const OPERATOR_OPTIONS = [
  { value: "lt", label: "Less than (<)" },
  { value: "lte", label: "Less than or equal (≤)" },
  { value: "gt", label: "Greater than (>)" },
  { value: "gte", label: "Greater than or equal (≥)" },
];

export const ACTION_TYPE_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "draft", label: "Draft" },
  { value: "unlisted", label: "Unlisted" },
  { value: "archive", label: "Archive" },
  { value: "email", label: "Email" },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const PAPER_ID = "async-multiselect-tags-paper";

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

export const INVENTORY_HISTORY_HEADER = [
  "Type",
  "Quantity",
  "Before",
  "After",
  "Reference",
  "Created At",
];

export const SALES_HISTORY_HEADER = [
  "Order",
  "Quantity",
  "Stock After",
  "Created At",
];

export const INVENTORY_VIEW_TABS_LABEL = [
  "Overview",
  "Inventory History",
  "Sales History",
  "Variants",
];

export const INVENTORY_VIEW_TABS_STATS_CARD = [
  "Total Sold",
  "Sell Through Rate",
  "Days Since Added",
  "Velocity",
];

export const formatPrice = (currency, price) => {
  if (price === null || price === undefined || isNaN(price))
    return `${currency || ""} 0`;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency || "USD",
  }).format(price);
};
