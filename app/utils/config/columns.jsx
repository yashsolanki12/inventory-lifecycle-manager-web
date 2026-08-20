import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import VisibilityIcon from "@mui/icons-material/Visibility";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RuleDetailsPopover from "../../pages/rules/ui-components/rules-list-popover";

import { LineItemsPopover } from "../../pages/orders/ui-components/line-items";
import {
  INVENTORY_STATUS_CONFIG,
  STOCK_STATUS_CONFIG,
  ORDER_STATUS_CONFIG,
  ORDER_FINANCIAL_STATUS_CONFIG,
  ORDER_FULFILLMENT_STATUS_CONFIG,
  ARCHIVE_RULE_CONFIG,
} from "./constants";
import { formatDate, formatPrice } from "../helper";

// Inventory action
export const createRenderActions =
  ({ onView, onPreviewUrl }) =>
  (item) => (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Tooltip
        title="View Details"
        arrow
        slotProps={{
          tooltip: {
            sx: {
              lineHeight: 2,
              fontSize: "12px",
            },
          },
        }}
      >
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
      <Tooltip
        title="Open Preview"
        arrow
        slotProps={{
          tooltip: {
            sx: {
              lineHeight: 2,
              fontSize: "12px",
            },
          },
        }}
      >
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

// Inventory list
export const INVENTORY_COLUMNS = [
  {
    key: "title",
    label: "Product",
    sortable: true,
    skeletonWidth: 180,
    render: (item) => (
      <Tooltip
        title={item.title}
        arrow
        placement="top-start"
        slotProps={{
          tooltip: {
            sx: {
              lineHeight: 2,
              fontSize: "13px",
            },
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: "6px",
              overflow: "hidden",
              flexShrink: 0,
              backgroundColor: "#f3f4f6",
              backgroundImage: `url(${item.image?.url || "/fallback-image.jpg"})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 500,
              lineHeight: 1.3,
              maxWidth: 200,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {item.title ?? "Untitled"}
          </Typography>
        </Box>
      </Tooltip>
    ),
  },

  // {
  //   key: "productType",
  //   label: "Product Type",
  //   skeletonWidth: 80,
  //   render: (item) => {
  //     const productType = item.productType || "—";
  //     return (
  //       <Typography sx={{ fontSize: 14, color: "#6b7280" }}>
  //         {productType}
  //       </Typography>
  //     );
  //   },
  // },

  // {
  //   key: "tags",
  //   label: "Tags",
  //   skeletonWidth: 100,
  //   render: (item) => {
  //     const rawTags = item.tags || [];
  //     const tags = Array.isArray(rawTags)
  //       ? rawTags
  //       : typeof rawTags === "string" && rawTags
  //         ? rawTags
  //             .split(",")
  //             .map((t) => t.trim())
  //             .filter(Boolean)
  //         : [];
  //     if (tags.length === 0)
  //       return (
  //         <Typography sx={{ fontSize: 14, color: "#9ca3af" }}>—</Typography>
  //       );
  //     return (
  //       <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
  //         {tags.slice(0, 2).map((tag) => (
  //           <Chip
  //             key={tag}
  //             label={tag}
  //             size="small"
  //             sx={{
  //               height: 22,
  //               fontSize: 11,
  //               fontWeight: 500,
  //               backgroundColor: "#f3f4f6",
  //               color: "#374151",
  //               borderRadius: "6px",: "4px",
  //             }}
  //           />
  //         ))}
  //         {tags.length > 2 && (
  //           <Tooltip title={tags.slice(2).join(", ")} arrow placement="top">
  //             <Typography
  //               sx={{
  //                 fontSize: 11,
  //                 color: "#9ca3af",
  //                 alignSelf: "center",
  //                 cursor: "default",
  //               }}
  //             >
  //               +{tags.length - 2}
  //             </Typography>
  //           </Tooltip>
  //         )}
  //       </Box>
  //     );
  //   },
  // },

  {
    key: "sku",
    label: "SKU",
    skeletonWidth: 80,
    render: (item) => {
      const sku = item.variants?.[0]?.sku ?? "—";
      return (
        <Tooltip
          title={sku === "—" ? "" : sku}
          arrow
          placement="top-start"
          slotProps={{
            tooltip: {
              sx: {
                lineHeight: 2,
                fontSize: "13px",
              },
            },
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              color: "#6b7280",
              maxWidth: 120,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {sku}
          </Typography>
        </Tooltip>
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
    key: "productAgeDays",
    label: "Age",
    sortable: false,
    skeletonWidth: 50,
    render: (item) => (
      <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
        {item.productAgeDays ?? 0}
      </Typography>
    ),
  },

  {
    key: "status",
    label: "Status",
    skeletonWidth: 70,
    render: (item) => {
      const statusKey = item.status?.toUpperCase();
      const config = statusKey ? INVENTORY_STATUS_CONFIG[statusKey] : null;
      if (!config) {
        return (
          <Typography sx={{ fontSize: 14, color: "#9ca3af" }}>—</Typography>
        );
      }
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
            px: 0.4,
          }}
        />
      );
    },
  },

  {
    key: "stockStatus",
    label: "Stock Status",
    skeletonWidth: 80,
    render: (item) => {
      const statusKey = item.stockStatus?.toLowerCase() || "Never sold";
      const config =
        STOCK_STATUS_CONFIG[statusKey] || STOCK_STATUS_CONFIG.never_sold;
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
            px: 0.4,
          }}
        />
      );
    },
  },

  {
    key: "daysWithoutSales",
    label: "Last Sale",
    sortable: false,
    skeletonWidth: 50,
    render: (item) => (
      <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
        {item.daysWithoutSales ?? 0}
      </Typography>
    ),
  },

  // {
  //   key: "lastSoldAt",
  //   label: "Last Sold At ",
  //   skeletonWidth: 90,
  //   render: (item) => (
  //     <Typography sx={{ fontSize: 14, color: "#6b7280", whiteSpace: "nowrap" }}>
  //       {item.lastSoldAt
  //         ? new Date(item.lastSoldAt).toLocaleDateString("en-US", {
  //             month: "short",
  //             day: "numeric",
  //             year: "numeric",
  //             hour: "numeric",
  //             minute: "2-digit",
  //             hour12: true,
  //             timeZone: "UTC",
  //           })
  //         : "—"}
  //     </Typography>
  //   ),
  // },

  {
    key: "createdAt",
    label: "Created At",
    sortable: true,
    sortField: "createdAt",
    skeletonWidth: 100,
    render: (item) => {
      if (!item.createdAt)
        return (
          <Typography sx={{ fontSize: 14, color: "#9ca3af" }}>—</Typography>
        );

      return (
        <Typography
          sx={{ fontSize: 14, color: "#6b7280", whiteSpace: "nowrap" }}
        >
          {formatDate(item.createdAt)}
        </Typography>
      );
    },
  },
];

// Order action
export const ordersRenderActions =
  ({ onPreviewUrl }) =>
  (item) => (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Tooltip
        title="Open Preview"
        arrow
        slotProps={{
          tooltip: {
            sx: {
              lineHeight: 2,
              fontSize: "12px",
            },
          },
        }}
      >
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

// Orders list
export const ORDERS_COLUMNS = [
  {
    key: "name",
    label: "Order",
    sortable: true,
    skeletonWidth: 80,
    render: (item) => {
      const name = item.name || "—";
      const financialStatus = item.financialStatus;

      return (
        <Typography
          sx={{
            fontSize: 14,
            color: "#6b7280",
            textDecoration:
              financialStatus === "REFUNDED" ? "line-through" : "none",
          }}
        >
          {name}
        </Typography>
      );
    },
  },

  {
    key: "totalPrice",
    label: "Total",
    skeletonWidth: 80,
    render: (item) => {
      const currencyCodeAndPrice = formatPrice(
        item.currencyCode,
        item.totalPrice,
      );
      const financialStatus = item.financialStatus;

      return (
        <Typography
          sx={{
            fontSize: 14,
            color: "#6b7280",
            textDecoration:
              financialStatus === "REFUNDED" ? "line-through" : "none",
          }}
        >
          {currencyCodeAndPrice}
        </Typography>
      );
    },
  },

  {
    key: "status",
    label: "Status",
    skeletonWidth: 70,
    render: (item) => {
      const config =
        ORDER_STATUS_CONFIG[item.status?.toUpperCase()] ||
        ORDER_STATUS_CONFIG.OPEN;
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
            px: 0.4,
          }}
        />
      );
    },
  },

  {
    key: "financialStatus",
    label: "Payment",
    skeletonWidth: 90,
    render: (item) => {
      const config =
        ORDER_FINANCIAL_STATUS_CONFIG[item.financialStatus?.toUpperCase()] ||
        ORDER_FINANCIAL_STATUS_CONFIG.PENDING;
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
            px: 0.4,
          }}
        />
      );
    },
  },

  {
    key: "fulfillmentStatus",
    label: "Fulfillment",
    skeletonWidth: 90,
    render: (item) => {
      const status = item.fulfillmentStatus?.toUpperCase();
      if (!status) {
        return (
          <Chip
            label="Unfulfilled"
            size="small"
            sx={{
              backgroundColor: ORDER_FULFILLMENT_STATUS_CONFIG.UNFULFILLED.bg,
              color: ORDER_FULFILLMENT_STATUS_CONFIG.UNFULFILLED.color,
              fontWeight: 600,
              fontSize: 12,
              height: 26,
              borderRadius: "6px",
              border: `1px solid ${ORDER_FULFILLMENT_STATUS_CONFIG.UNFULFILLED.color}20`,
              px: 0.4,
            }}
          />
        );
      }
      const config =
        ORDER_FULFILLMENT_STATUS_CONFIG[status] ||
        ORDER_FULFILLMENT_STATUS_CONFIG.UNFULFILLED;
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
            px: 0.4,
          }}
        />
      );
    },
  },

  {
    key: "lineItems",
    label: "Items",
    skeletonWidth: 60,
    render: (item) => {
      const lineItems = item.lineItems || [];
      const financialStatus = item.financialStatus;

      return (
        <LineItemsPopover lineItems={lineItems}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
              cursor: "pointer",
              color: "#374151",
              "&:hover .arrow-icon": { opacity: 1 },
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 500,
                textDecoration:
                  financialStatus === "REFUNDED" ? "line-through" : "none",
              }}
            >
              {lineItems.length}
            </Typography>
            <KeyboardArrowDownIcon
              className="arrow-icon"
              sx={{
                fontSize: 16,
                color: "#9ca3af",
                opacity: 0,
                transition: "opacity 0.15s",
              }}
            />
          </Box>
        </LineItemsPopover>
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
      if (!item.createdAt)
        return (
          <Typography sx={{ fontSize: 14, color: "#9ca3af" }}>—</Typography>
        );

      return (
        <Typography
          sx={{ fontSize: 14, color: "#6b7280", whiteSpace: "nowrap" }}
        >
          {formatDate(item.createdAt)}
        </Typography>
      );
    },
  },
];

// Rules action
export const rulesRenderActions =
  ({ onEdit, onDelete }) =>
  (item) => (
    <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
      {/* Edit Action */}
      <Tooltip
        title="Edit"
        arrow
        slotProps={{
          tooltip: {
            sx: {
              lineHeight: 2,
              fontSize: "12px",
            },
          },
        }}
      >
        <IconButton
          size="small"
          onClick={() => onEdit(item)}
          sx={{
            color: "#6b7280",
            "&:hover": {
              color: "#094799",
              backgroundColor: "#DBEAFE",
            },
          }}
        >
          <EditIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Tooltip>

      {/* Delete Action */}
      <Tooltip
        title="Delete"
        arrow
        slotProps={{
          tooltip: {
            sx: {
              lineHeight: 2,
              fontSize: "12px",
            },
          },
        }}
      >
        <IconButton
          size="small"
          onClick={() => onDelete(item)}
          sx={{
            color: "#6b7280",
            "&:hover": {
              color: "#dc2626",
              backgroundColor: "#FEE2E2",
            },
          }}
        >
          <DeleteIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Tooltip>
    </Box>
  );

// Rules list
export const RULES_COLUMNS = [
  {
    key: "rule_name",
    label: "Rule Name",
    sortable: true,
    skeletonWidth: 80,
    render: (item) => {
      const ruleName = item.rule_name ?? "—";
      return (
        <Tooltip
          title={ruleName}
          arrow
          placement="top-start"
          slotProps={{
            tooltip: {
              sx: {
                lineHeight: 2,
                fontSize: "13px",
              },
            },
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              color: "#6b7280",
              maxWidth: 200,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {ruleName}
          </Typography>
        </Tooltip>
      );
    },
  },

  {
    key: "rule_condition",
    label: "Conditions",
    skeletonWidth: 80,
    render: (item) => {
      const conditions = item.rule_condition ?? "—";
      return (
        <Tooltip
          title={conditions}
          arrow
          placement="top-start"
          slotProps={{
            tooltip: {
              sx: {
                lineHeight: 2,
                fontSize: "13px",
              },
            },
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              color: "#6b7280",
              maxWidth: 250,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {conditions}
          </Typography>
        </Tooltip>
      );
    },
  },

  {
    key: "details",
    label: "Details",
    skeletonWidth: 80,
    render: (item) => <RuleDetailsPopover item={item} />,
  },

  {
    key: "actionType",
    label: "Action",
    sortable: true,
    skeletonWidth: 80,
    render: (item) => {
      const statusKey = item.actionType.toUpperCase();
      const config = ARCHIVE_RULE_CONFIG[statusKey];
      return (
        <Chip
          label={config?.label}
          size="small"
          sx={{
            backgroundColor: config.bg,
            color: config.color,
            fontWeight: 600,
            fontSize: 12,
            height: 26,
            borderRadius: "6px",
            border: `1px solid ${config.color}20`,
            px: 0.4,
          }}
        />
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
      if (!item.createdAt)
        return (
          <Typography sx={{ fontSize: 14, color: "#9ca3af" }}>—</Typography>
        );
      return (
        <Typography
          sx={{ fontSize: 14, color: "#6b7280", whiteSpace: "nowrap" }}
        >
          {formatDate(item.createdAt)}
        </Typography>
      );
    },
  },
];

// Run rule list
export const MATCH_COLUMNS = [
  {
    key: "title",
    label: "Product",
    skeletonWidth: 120,
    render: (item) => (
      <Tooltip
        title={item.title}
        arrow
        placement="top-start"
        slotProps={{
          tooltip: {
            sx: {
              lineHeight: 2,
              fontSize: "13px",
            },
          },
        }}
      >
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 500,
            color: "#374151",
            maxWidth: 200,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.title}
        </Typography>
      </Tooltip>
    ),
  },
  {
    key: "sku",
    label: "SKU",
    skeletonWidth: 80,
    render: (item) => {
      const sku = item.variants?.[0]?.sku || "—";
      return (
        <Tooltip
          title={sku === "—" ? "" : sku}
          arrow
          placement="top-start"
          slotProps={{
            tooltip: {
              sx: {
                lineHeight: 2,
                fontSize: "13px",
              },
            },
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              color: "#6B7280",
              maxWidth: 200,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {sku}
          </Typography>
        </Tooltip>
      );
    },
  },
  {
    key: "reason",
    label: "Reason",
    skeletonWidth: 100,
    render: (item) => (
      <Tooltip
        title={item.reason}
        arrow
        placement="top-start"
        slotProps={{
          tooltip: {
            sx: {
              lineHeight: 2,
              fontSize: "13px",
            },
          },
        }}
      >
        <Typography
          sx={{
            fontSize: 14,
            color: "#6B7280",
            maxWidth: 200,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.reason || "—"}
        </Typography>
      </Tooltip>
    ),
  },
  {
    key: "productAgeDays",
    label: "Age (Days)",
    skeletonWidth: 80,
    render: (item) => (
      <Typography sx={{ fontSize: 14, color: "#6B7280" }}>
        {item.productAgeDays ?? "—"}
      </Typography>
    ),
  },
  {
    key: "stockQuantity",
    label: "Stock",
    skeletonWidth: 60,
    render: (item) => (
      <Typography sx={{ fontSize: 14, color: "#6B7280" }}>
        {item.stockQuantity}
      </Typography>
    ),
  },

  {
    key: "actionType",
    label: "Action Taken",
    skeletonWidth: 80,
    render: (item) => {
      const statusKey = item.actionType.toUpperCase();
      const config = ARCHIVE_RULE_CONFIG[statusKey];
      return (
        <Chip
          label={config?.label}
          size="small"
          sx={{
            backgroundColor: config.bg,
            color: config.color,
            fontWeight: 600,
            fontSize: 12,
            height: 26,
            borderRadius: "6px",
            border: `1px solid ${config.color}20`,
            px: 0.4,
          }}
        />
      );
    },
  },

  {
    key: "createdAt",
    label: "Created At",
    // sortable: true,
    sortField: "createdAt",
    skeletonWidth: 100,
    render: (item) => {
      if (!item.createdAt)
        return (
          <Typography sx={{ fontSize: 14, color: "#9ca3af" }}>—</Typography>
        );
      return (
        <Typography
          sx={{ fontSize: 14, color: "#6b7280", whiteSpace: "nowrap" }}
        >
          {formatDate(item.createdAt)}
        </Typography>
      );
    },
  },
];

// Archive history action
export const archiveHistoryRenderActions =
  ({ onPreviewUrl }) =>
  (item) => (
    <Box>
      <Tooltip
        title="Open Preview"
        arrow
        slotProps={{
          tooltip: {
            sx: {
              lineHeight: 2,
              fontSize: "12px",
            },
          },
        }}
      >
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

// Archive history list
export const ARCHIVE_HISTORY_COLUMN = [
  {
    key: "productTitle",
    label: "Product",
    sortable: true,
    skeletonWidth: 120,
    render: (item) => (
      <Tooltip
        title={item.productTitle}
        arrow
        placement="top-start"
        slotProps={{
          tooltip: {
            sx: {
              lineHeight: 2,
              fontSize: "13px",
            },
          },
        }}
      >
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 500,
            color: "#374151",
            maxWidth: 200,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.productTitle ?? "—"}
        </Typography>
      </Tooltip>
    ),
  },

  {
    key: "sku",
    label: "SKU",
    skeletonWidth: 80,
    render: (item) => {
      const sku = item.sku ?? "—";
      return (
        <Tooltip
          title={sku === "—" ? "" : sku}
          arrow
          placement="top-start"
          slotProps={{
            tooltip: {
              sx: {
                lineHeight: 2,
                fontSize: "13px",
              },
            },
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              color: "#6B7280",
              maxWidth: 200,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {sku}
          </Typography>
        </Tooltip>
      );
    },
  },
  {
    key: "reason",
    label: "Reason",
    sortable: true,
    skeletonWidth: 100,
    render: (item) => (
      <Tooltip
        title={item.reason}
        arrow
        placement="top-start"
        slotProps={{
          tooltip: {
            sx: {
              lineHeight: 2,
              fontSize: "13px",
            },
          },
        }}
      >
        <Typography
          sx={{
            fontSize: 14,
            color: "#6B7280",
            maxWidth: 200,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.reason ?? "—"}
        </Typography>
      </Tooltip>
    ),
  },

  // {
  //   key: "ruleCondition",
  //   label: "Condition",
  //   skeletonWidth: 100,
  //   render: (item) => (
  //     <Typography sx={{ fontSize: 14, color: "#6B7280", maxWidth: 250 }}>
  //       {item.ruleCondition ?? "—"}
  //     </Typography>
  //   ),
  // },

  {
    key: "actionTaken",
    label: "Action Taken",
    sortable: true,
    skeletonWidth: 80,
    render: (item) => {
      const statusKey = item.actionTaken.toUpperCase();
      const config = ARCHIVE_RULE_CONFIG[statusKey];
      return (
        <Chip
          label={config?.label}
          size="small"
          sx={{
            backgroundColor: config.bg,
            color: config.color,
            fontWeight: 600,
            fontSize: 12,
            height: 26,
            borderRadius: "6px",
            border: `1px solid ${config.color}20`,
            px: 0.4,
          }}
        />
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
      if (!item.createdAt)
        return (
          <Typography sx={{ fontSize: 14, color: "#9ca3af" }}>—</Typography>
        );
      return (
        <Typography
          sx={{ fontSize: 14, color: "#6b7280", whiteSpace: "nowrap" }}
        >
          {formatDate(item.createdAt)}
        </Typography>
      );
    },
  },
];
