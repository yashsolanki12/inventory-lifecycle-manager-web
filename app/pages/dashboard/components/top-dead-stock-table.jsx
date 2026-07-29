import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router";
import { PRODUCT_COLORS } from "../../../utils/helper";

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
        alignSelf: "start",
        // maxHeight: 360,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardContent
        sx={{
          p: "24px !important",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: 18 }}>
            Top Dead Stock Products
          </Typography>
        </Box>

        {items.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Typography sx={{ color: "#9ca3af", fontSize: 14 }}>
              No dead stock products found
            </Typography>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                maxHeight: 220,
                overflowY: "auto",
                borderRadius: "8px",
                "&::-webkit-scrollbar": { width: 6 },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#d1d5db",
                  borderRadius: 3,
                },
                "&::-webkit-scrollbar-track": { backgroundColor: "#f9fafb" },
              }}
            >
              <Box
                component="table"
                sx={{ width: "100%", borderCollapse: "collapse" }}
              >
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
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                          }}
                        >
                          <Box
                            sx={{
                              width: 46,
                              height: 46,
                              borderRadius: "10px",
                              backgroundColor:
                                PRODUCT_COLORS[i % PRODUCT_COLORS.length],
                              backgroundImage: item.image?.url
                                ? `url(${item.image.url})`
                                : "none",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              flexShrink: 0,
                            }}
                          />
                          <Typography sx={{ fontSize: 15, fontWeight: 500 }}>
                            {item.title ?? "Untitled Product."}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        component="td"
                        sx={{
                          py: 2,
                          px: 2,
                          fontSize: 15,
                          borderBottom: "1px solid #ececec",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.quantity} Units
                      </Box>
                      <Box
                        component="td"
                        sx={{
                          py: 2,
                          pl: 2,
                          fontSize: 15,
                          borderBottom: "1px solid #ececec",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {currency}
                        {item.value.toLocaleString()}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2.5 }}>
              <Button
                variant="outlined"
                onClick={() => navigate("/app/inventory")}
                sx={{
                  borderColor: "#000703",
                  color: "#000504",
                  backgroundColor: "#FFFFFF",
                  textTransform: "none",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "13px",
                  px: 3,
                  "&:hover": {
                    borderColor: "#CBD5E1",
                    backgroundColor: "#F8FAFC",
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
