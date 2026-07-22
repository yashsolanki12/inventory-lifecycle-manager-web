import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const DUMMY_PRODUCTS = [
  { id: 1, title: "Classic Cotton T-Shirt", sku: "TSH-001", quantity: 120, status: "Fresh", value: 1200 },
  { id: 2, title: "Slim Fit Denim Jeans", sku: "JNS-002", quantity: 85, status: "Mild", value: 2550 },
  { id: 3, title: "Running Sneakers Pro", sku: "SNK-003", quantity: 45, status: "Aging", value: 1800 },
  { id: 4, title: "Leather Crossbody Bag", sku: "BAG-004", quantity: 30, status: "Dead", value: 1500 },
  { id: 5, title: "Wool Blend Overcoat", sku: "COT-005", quantity: 15, status: "Dead", value: 2250 },
  { id: 6, title: "Performance Yoga Leggings", sku: "LEG-006", quantity: 200, status: "Fresh", value: 4000 },
  { id: 7, title: "Merino Wool Beanie", sku: "BEN-007", quantity: 95, status: "Fresh", value: 950 },
  { id: 8, title: "Waterproof Hiking Boots", sku: "BT-008", quantity: 10, status: "Dead", value: 1200 },
];

const STATUS_COLORS = { Fresh: "#22c55e", Mild: "#f97316", Aging: "#eab308", Dead: "#ef4444" };

const InventoryPage = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1450,
        mx: "auto",
        px: { xs: 2, sm: 3 },
        py: 3,
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700, color: "#202223", mb: 3 }}>
        Inventory
      </Typography>

      <Card sx={{ borderRadius: "14px", border: "1px solid #ececec", boxShadow: "0 8px 24px rgba(0,0,0,.04)" }}>
        <CardContent sx={{ p: "24px !important" }}>
          <Box component="table" sx={{ width: "100%", borderCollapse: "collapse" }}>
            <Box component="thead">
              <Box component="tr">
                {["Product", "SKU", "Status", "Quantity", "Value"].map((h) => (
                  <Box
                    key={h}
                    component="th"
                    sx={{
                      textAlign: "left",
                      py: 1.5,
                      px: 2,
                      fontWeight: 600,
                      fontSize: 14,
                      color: "#6b7280",
                      borderBottom: "2px solid #e5e7eb",
                    }}
                  >
                    {h}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box component="tbody">
              {DUMMY_PRODUCTS.map((p) => (
                <Box component="tr" key={p.id} sx={{ borderBottom: "1px solid #ececec" }}>
                  <Box component="td" sx={{ py: 2, px: 2, fontSize: 15, fontWeight: 500 }}>
                    {p.title}
                  </Box>
                  <Box component="td" sx={{ py: 2, px: 2, fontSize: 14, color: "#6b7280" }}>
                    {p.sku}
                  </Box>
                  <Box component="td" sx={{ py: 2, px: 2 }}>
                    <Box
                      sx={{
                        display: "inline-block",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: "6px",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#fff",
                        backgroundColor: STATUS_COLORS[p.status],
                      }}
                    >
                      {p.status}
                    </Box>
                  </Box>
                  <Box component="td" sx={{ py: 2, px: 2, fontSize: 15 }}>
                    {p.quantity}
                  </Box>
                  <Box component="td" sx={{ py: 2, px: 2, fontSize: 15 }}>
                    ${p.value.toLocaleString()}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default InventoryPage;
