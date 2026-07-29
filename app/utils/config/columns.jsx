import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { INVENTORY_STATUS_CONFIG } from "./constants";

const createRenderActions =
  ({ onView, onPreviewUrl }) =>
  (item) => (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Tooltip title="View Details" arrow>
        <IconButton
          size="small"
          onClick={() => onView(item)}
          sx={{
            color: "#4B5563",
            "&:hover": {
              color: "#008060",
              backgroundColor: "#ddfde5",
            },
          }}
        >
          <VisibilityIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Open in Shopify Admin" arrow>
        <IconButton
          size="small"
          onClick={() => onPreviewUrl(item)}
          sx={{
            color: "#6b7280",
            "&:hover": {
              color: "#094799",
              backgroundColor: "#DBEAFE",
            },
          }}
        >
          <OpenInNewIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Tooltip>
    </Box>
  );

const COLUMNS = [
  {
    key: "product",
    label: "Product",
    skeletonWidth: 180,
    render: (item) => (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box
          sx={{
            width: 46,
            height: 46,
            borderRadius: "10px",
            overflow: "hidden",
            flexShrink: 0,
            backgroundColor: "#f3f4f6",
            backgroundImage: `url(${item.image?.url || "/fallback-image.jpg"})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
        <Typography sx={{ fontSize: 15, fontWeight: 500, lineHeight: 1.3 }}>
          {item.title ?? "Untitled"}
        </Typography>
      </Box>
    ),
  },
  {
    key: "sku",
    label: "SKU",
    skeletonWidth: 80,
    render: (item) => {
      const sku = item.variants?.[0]?.sku ?? "—";
      return (
        <Typography sx={{ fontSize: 14, color: "#6b7280" }}>{sku}</Typography>
      );
    },
  },
  {
    key: "stock",
    label: "Stock",
    sortable: false,
    skeletonWidth: 50,
    render: (item) => (
      <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
        {item.inventoryQuantity ?? 0}
      </Typography>
    ),
  },
  {
    key: "lastSoldAt",
    label: "Last Sold At ",
    skeletonWidth: 90,
    render: (item) => (
      <Typography sx={{ fontSize: 14, color: "#6b7280", whiteSpace: "nowrap" }}>
        {item.lastSoldAt
          ? new Date(item.lastSoldAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
              timeZone: "UTC",
            })
          : "—"}
      </Typography>
    ),
  },
  {
    key: "status",
    label: "Status",
    skeletonWidth: 70,
    render: (item) => {
      const config =
        INVENTORY_STATUS_CONFIG[item.status?.toUpperCase()] ||
        INVENTORY_STATUS_CONFIG.ACTIVE;
      return (
        <Chip
          label={config.label}
          size="small"
          sx={{
            backgroundColor: config.bg,
            color: config.color,
            fontWeight: 600,
            fontSize: 12,
            height: 26,
            borderRadius: "6px",
            border: `1px solid ${config.color}20`,
          }}
        />
      );
    },
  },
  {
    key: "tags",
    label: "Tags",
    skeletonWidth: 100,
    render: (item) => {
      const rawTags = item.tags || [];
      const tags = Array.isArray(rawTags)
        ? rawTags
        : typeof rawTags === "string" && rawTags
          ? rawTags.split(",").map((t) => t.trim()).filter(Boolean)
          : [];
      if (tags.length === 0)
        return <Typography sx={{ fontSize: 14, color: "#9ca3af" }}>—</Typography>;
      return (
        <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
          {tags.slice(0, 2).map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                height: 22,
                fontSize: 11,
                fontWeight: 500,
                backgroundColor: "#f3f4f6",
                color: "#374151",
                borderRadius: "4px",
              }}
            />
          ))}
          {tags.length > 2 && (
            <Tooltip title={tags.slice(2).join(", ")} arrow placement="top">
              <Typography
                sx={{ fontSize: 11, color: "#9ca3af", alignSelf: "center", cursor: "default" }}
              >
                +{tags.length - 2}
              </Typography>
            </Tooltip>
          )}
        </Box>
      );
    },
  },
  {
    key: "createdAt",
    label: "Created At",
    sortable: true,
    sortField: "createdAt",
    skeletonWidth: 100,
    render: (item) => {
      if (!item.createdAt) return <Typography sx={{ fontSize: 14, color: "#9ca3af" }}>—</Typography>;
      const date = new Date(item.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "UTC",
      });
      return (
        <Typography sx={{ fontSize: 14, color: "#6b7280", whiteSpace: "nowrap" }}>
          {date}
        </Typography>
      );
    },
  },
];

export { createRenderActions };
export default COLUMNS;
