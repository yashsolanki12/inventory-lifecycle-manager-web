export const INVENTORY_STATUS_CONFIG = {
  ACTIVE: { label: "Active", color: "#22c55e", bg: "#f0fdf4" },
  DRAFT: { label: "Draft", color: "#f97316", bg: "#fff7ed" },
  ARCHIVED: { label: "Archived", color: "#6b7280", bg: "#f9fafb" },
};

export const INVENTORY_SORT_OPTIONS = [
  { value: "title", label: "Name A-Z" },
  { value: "-title", label: "Name Z-A" },
  { value: "-createdAt", label: "Newest First" },
  { value: "createdAt", label: "Oldest First" },
  { value: "-updatedAt", label: "Recently Updated" },
];

export const INVENTORY_FILTER_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "draft", label: "Draft" },
  { value: "archived", label: "Archived" },
];
