export const formatPrice = (currency, price) => {
  if (price === null || price === undefined || isNaN(price))
    return `${currency || ""} 0`;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency || "USD",
  }).format(price);
};

export const INVENTORY_STATUS_CONFIG = {
  ACTIVE: { label: "Active", color: "#15803d", bg: "#dcfce7" },
  DRAFT: { label: "Draft", color: "#c2410c", bg: "#ffedd5" },
  ARCHIVED: { label: "Archived", color: "#6b7280", bg: "#f3f4f6" },
};

export const STOCK_STATUS_CONFIG = {
  fresh: { label: "Fresh", color: "#15803d", bg: "#dcfce7" },
  mild: { label: "Mild", color: "#a16207", bg: "#fef9c3" },
  aging: { label: "Aging", color: "#c2410c", bg: "#ffedd5" },
  dead: { label: "Dead", color: "#b91c1c", bg: "#fee2e2" },
  never_sold: { label: "Never sold", color: "#6b7280", bg: "#f3f4f6" },
};

export const ORDER_STATUS_CONFIG = {
  OPEN: { label: "Open", color: "#0369a1", bg: "#e0f2fe" },
  CLOSED: { label: "Closed", color: "#15803d", bg: "#dcfce7" },
  CANCELLED: { label: "Cancelled", color: "#b91c1c", bg: "#fee2e2" },
  NOT_CLOSED: { label: "Not closed", color: "#c2410c", bg: "#ffedd5" },
};

export const ORDER_FINANCIAL_STATUS_CONFIG = {
  PAID: { label: "Paid", color: "#15803d", bg: "#dcfce7" },
  PENDING: { label: "Pending", color: "#a16207", bg: "#fef9c3" },
  AUTHORIZED: { label: "Authorized", color: "#1d4ed8", bg: "#dbeafe" },
  PARTIALLY_PAID: { label: "Partially paid", color: "#c2410c", bg: "#ffedd5" },
  PARTIALLY_REFUNDED: {
    label: "Partially refunded",
    color: "#c2410c",
    bg: "#ffedd5",
  },
  REFUNDED: { label: "Refunded", color: "#4b5563", bg: "#f3f4f6" },
  VOIDED: { label: "Voided", color: "#b91c1c", bg: "#fee2e2" },
  EXPIRED: { label: "Expired", color: "#6b7280", bg: "#f9fafb" },
};

export const ORDER_FULFILLMENT_STATUS_CONFIG = {
  UNSHIPPED: { label: "Unshipped", color: "#6b7280", bg: "#f3f4f6" },
  SHIPPED: { label: "Shipped", color: "#1d4ed8", bg: "#dbeafe" },
  FULFILLED: { label: "Fulfilled", color: "#15803d", bg: "#dcfce7" },
  PARTIAL: { label: "Partial", color: "#a16207", bg: "#fef9c3" },
  SCHEDULED: { label: "Scheduled", color: "#6d28d9", bg: "#ede9fe" },
  ON_HOLD: { label: "On hold", color: "#c2410c", bg: "#ffedd5" },
  UNFULFILLED: { label: "Unfulfilled", color: "#b91c1c", bg: "#fee2e2" },
  REQUEST_DECLINED: {
    label: "Request declined",
    color: "#991b1b",
    bg: "#fee2e2",
  },
};

export const INVENTORY_SORT_OPTIONS = [
  { value: "title", label: "Product A-Z" },
  { value: "-title", label: "Product Z-A" },
  { value: "-createdAt", label: "Newest First" },
  { value: "createdAt", label: "Oldest First" },
  // { value: "-updatedAt", label: "Recently Updated" },
];

export const INVENTORY_FILTER_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "draft", label: "Draft" },
  { value: "archived", label: "Archived" },
];

export const ORDERS_SORT_OPTIONS = [
  { value: "-createdAt", label: "Newest First" },
  { value: "createdAt", label: "Oldest First" },
  { value: "name", label: "Order A-Z" },
  { value: "-name", label: "Order Z-A" },
  // { value: "-updatedAt", label: "Recently Updated" },
];

export const RULES_SORT_OPTIONS = [
  { value: "rule_name", label: "Rule Name A-Z" },
  { value: "-rule_name", label: "Rule Name Z-A" },
  { value: "-createdAt", label: "Newest First" },
  { value: "createdAt", label: "Oldest First" },
  // { value: "daysWithoutSales", label: "Days Without Sales" },
  // { value: "daysWithoutSalesOperator", label: "Days Without Sales Operator" },
  { value: "productType", label: "Product Type" },
  { value: "actionType", label: "Action A-Z" },
  { value: "-actionType", label: "Action Z-A" },
];

export const ORDER_STATUS_FILTER_OPTIONS = [
  { value: "open", label: "Open" },
  { value: "closed", label: "Closed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "not_closed", label: "Not closed" },
];

export const ORDER_FINANCIAL_STATUS_FILTER_OPTIONS = [
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "authorized", label: "Authorized" },
  { value: "partially_paid", label: "Partially paid" },
  { value: "partially_refunded", label: "Partially refunded" },
  { value: "refunded", label: "Refunded" },
  { value: "voided", label: "Voided" },
  { value: "expired", label: "Expired" },
];

export const ORDER_FULFILLMENT_STATUS_FILTER_OPTIONS = [
  { value: "unshipped", label: "Unshipped" },
  { value: "shipped", label: "Shipped" },
  { value: "fulfilled", label: "Fulfilled" },
  { value: "partial", label: "Partial" },
  { value: "scheduled", label: "Scheduled" },
  { value: "on_hold", label: "On hold" },
  { value: "unfulfilled", label: "Unfulfilled" },
  { value: "request_declined", label: "Request declined" },
];

export const ARCHIVE_RULE_CONFIG = {
  ACTIVE: { label: "Active", color: "#16a34a", bg: "#dcfce7" },
  DRAFT: { label: "Draft", color: "#4b5563", bg: "#f3f4f6" },
  UNLISTED: { label: "Unlisted", color: "#d97706", bg: "#fef3c7" },
  ARCHIVE: { label: "Archive", color: "#dc2626", bg: "#fee2e2" },
  EMAIL: { label: "Email", color: "#2563eb", bg: "#dbeafe" },
};

export const ARCHIVE_HISTORY_SORT_OPTIONS = [
  { value: "productTitle", label: "Product A-Z" },
  { value: "-productTitle", label: "Product Z-A" },
  { value: "-createdAt", label: "Newest First" },
  { value: "createdAt", label: "Oldest First" },
  { value: "reason", label: "Reason A-Z" },
  { value: "-reason", label: "Reason Z-A" },
  { value: "actionTaken", label: "Action A-Z" },
  { value: "-actionTaken", label: "Action Z-A" },
];

export const ALERT_TYPE_CONFIG = {
  dead_stock: {
    color: "#dc2626",
    bg: "#fef2f2",
    label: "Dead Stock",
  },
  inventory_age: {
    color: "#d97706",
    bg: "#fffbeb",
    label: "Inventory Age",
  },
  archive_rule: {
    color: "#7c3aed",
    bg: "#f5f3ff",
    label: "Archive Rule",
  },
  low_stock: {
    color: "#2563eb",
    bg: "#eff6ff",
    label: "Low Stock",
  },
  inventory_not_tracked: {
    color: "#6b7280",
    bg: "#f3f4f6",
    label: "Inventory Not Tracked",
  },
};

export const ALERT_ACTION_CONFIG = {
  active: { color: "#16a34a", bg: "#f0fdf4", label: "Active" },
  draft: { color: "#d97706", bg: "#fffbeb", label: "Draft" },
  unlisted: { color: "#6b7280", bg: "#f3f4f6", label: "Unlisted" },
  archive: { color: "#dc2626", bg: "#fef2f2", label: "Archived" },
  archived: { color: "#dc2626", bg: "#fef2f2", label: "Archived" },
  tag: { color: "#7c3aed", bg: "#f5f3ff", label: "Tagged" },
  inventory_not_tracked: {
    color: "#6b7280",
    bg: "#f3f4f6",
    label: "Not Tracked",
  },
  inventory_age: {
    color: "#d97706",
    bg: "#fffbeb",
    label: "Aging",
  },
  dead_stock: {
    color: "#dc2626",
    bg: "#fef2f2",
    label: "Dead Stock",
  },
  low_stock: {
    color: "#ea580c",
    bg: "#fff7ed",
    label: "Low Stock",
  },
};

export const FRESH_OPTIONS = [
  { value: 5, label: "5 days" },
  { value: 10, label: "10 days" },
  { value: 15, label: "15 days" },
  { value: 20, label: "20 days" },
  { value: 25, label: "25 days" },
  { value: 30, label: "30 days" },
  { value: 45, label: "45 days" },
  { value: 60, label: "60 days" },
  { value: 90, label: "90 days" },
];

export const MILD_OPTIONS = [
  { value: 10, label: "10 days" },
  { value: 15, label: "15 days" },
  { value: 20, label: "20 days" },
  { value: 25, label: "25 days" },
  { value: 30, label: "30 days" },
  { value: 45, label: "45 days" },
  { value: 60, label: "60 days" },
  { value: 75, label: "75 days" },
  { value: 90, label: "90 days" },
  { value: 120, label: "120 days" },
  { value: 150, label: "150 days" },
  { value: 180, label: "180 days" },
];

export const AGING_OPTIONS = [
  { value: 30, label: "30 days" },
  { value: 45, label: "45 days" },
  { value: 60, label: "60 days" },
  { value: 75, label: "75 days" },
  { value: 90, label: "90 days" },
  { value: 120, label: "120 days" },
  { value: 150, label: "150 days" },
  { value: 180, label: "180 days" },
  { value: 240, label: "240 days" },
  { value: 365, label: "365 days" },
];

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
    getValue: (d) => d.buckets?.fresh,
  },
  {
    key: "mild",
    label: "Mild Stock",
    color: "#84CC16",
    getValue: (d) => d.buckets?.mild,
  },
  {
    key: "aging",
    label: "Aging Stock",
    color: "#f97316",
    getValue: (d) => d.buckets?.aging,
  },
  {
    key: "dead",
    label: "Dead Stock",
    color: "#fb923c",
    getValue: (d) => d.buckets?.dead,
  },
  {
    key: "value",
    label: "Inventory Value",
    color: "#008060",
    getValue: (d) => {
      if (d.totalInventoryValue)
        return formatPrice(d.currency, d.totalInventoryValue);
    },
  },
  {
    key: "deadValue",
    label: "Dead Stock Value",
    color: "#fb493c",
    getValue: (d) => {
      if (d.deadStockValue) return formatPrice(d.currency, d.deadStockValue);
      return;
    },
  },
];

export const COLORS = ["#34d399", "#84cc16", "#f97316", "#fb923c", "#ef4444"];

export const MIN_SEARCH_CHARS = 3;

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
  free: "Sync up to 100 random products",
  starter: "Sync up to 1,000 random products",
  pro: "Sync all products",
};

export const FEATURES = [
  { icon: "\u{1F4E6}", label: "Import all products" },
  { icon: "\u{1F4CA}", label: "Track inventory levels" },
  { icon: "\u{1F504}", label: "Auto-sync updates" },
];

export const ZOOM_FACTOR = 2.5;

export const VELOCITY_CONFIG = {
  fast: { label: "Fast", color: "#15803d", bg: "#dcfce7" },
  moderate: { label: "Moderate", color: "#a16207", bg: "#fef9c3" },
  slow: { label: "Slow", color: "#c2410c", bg: "#ffedd5" },
  dead: { label: "Dead", color: "#b91c1c", bg: "#fee2e2" },
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

export const ITEM_HEIGHT = 48;
export const ITEM_PADDING_TOP = 8;
export const PAPER_ID = "async-multiselect-tags-paper";

export const BUCKET_COLOR_MAP = {
  fresh: COLORS[0],
  mild: COLORS[1],
  aging: COLORS[2],
  dead: COLORS[3],
};
