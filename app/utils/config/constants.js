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
  { value: "title", label: "Name A-Z" },
  { value: "-title", label: "Name Z-A" },
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
  // { value: "-updatedAt", label: "Recently Updated" },
];

export const RULES_SORT_OPTIONS = [
  { value: "rule_name", label: "Name A-Z" },
  { value: "-rule_name", label: "Name Z-A" },
  { value: "-createdAt", label: "Newest First" },
  { value: "createdAt", label: "Oldest First" },
  // { value: "daysWithoutSales", label: "Days Without Sales" },
  // { value: "daysWithoutSalesOperator", label: "Days Without Sales Operator" },
  { value: "productType", label: "Product Type" },
  { value: "actionType", label: "Action Type" },
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
