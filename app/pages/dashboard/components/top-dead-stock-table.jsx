import React from "react";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const PRODUCT_COLORS = ["#2563eb", "#8b5e3c", "#facc15", "#059669", "#7c3aed"];

const TopDeadStockTable = ({ agingData }) => {
  const navigate = useNavigate();
  const items = agingData?.data?.items ?? [];
  const currency = agingData?.data?.currency === "USD" ? "$" : "";

  return (
    <Card
      sx={{
        borderRadius: "14px",
        border: "1px solid #ececec",
        boxShadow: "0 8px 24px rgba(0,0,0,.04)",
        height: "100%",
        maxHeight: 360,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ p: "24px !important", flex: 1, overflow: "auto" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: 18 }}>
            Top Dead Stock Products
          </Typography>
        </Box>

        {items.length === 0 ? (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography sx={{ color: "#9ca3af", fontSize: 14 }}>
              No dead stock products found
            </Typography>
          </Box>
        ) : (
          <>
            <Box component="table" sx={{ width: "100%", borderCollapse: "collapse" }}>
              <Box component="tbody">
                {items.map((item, i) => (
                  <Box
                    component="tr"
                    key={item.id}
                    sx={{ borderBottom: "1px solid #ececec" }}
                  >
                    <Box
                      component="td"
                      sx={{ py: 2, pr: 2, borderBottom: "1px solid #ececec" }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Box
                          sx={{
                            width: 46,
                            height: 46,
                            borderRadius: "10px",
                            backgroundColor: PRODUCT_COLORS[i % PRODUCT_COLORS.length],
                            backgroundImage: item.image?.url ? `url(${item.image.url})` : "none",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            flexShrink: 0,
                          }}
                        />
                        <Typography sx={{ fontSize: 15, fontWeight: 500 }}>
                          {item.title}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      component="td"
                      sx={{ py: 2, px: 2, fontSize: 15, borderBottom: "1px solid #ececec", whiteSpace: "nowrap" }}
                    >
                      {item.quantity} Units
                    </Box>
                    <Box
                      component="td"
                      sx={{ py: 2, pl: 2, fontSize: 15, borderBottom: "1px solid #ececec", whiteSpace: "nowrap" }}
                    >
                      {currency}{item.value.toLocaleString()}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2.5 }}>
              <Button
                variant="outlined"
                onClick={() => navigate("/app/inventory")}
                sx={{
                  borderColor: "#008060",
                  color: "#008060",
                  textTransform: "none",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "13px",
                  px: 3,
                  "&:hover": {
                    borderColor: "#006F60",
                    backgroundColor: "rgba(0,128,96,0.04)",
                  },
                }}
              >
                View All
              </Button>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TopDeadStockTable;
