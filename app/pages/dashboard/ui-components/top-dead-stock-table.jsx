import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router";
import { formatPrice } from "../../../utils/helper";
import { PRODUCT_COLORS } from "../../../utils/config/constants";

const TopDeadStockTable = ({ agingData }) => {
  const navigate = useNavigate();
  const items = agingData?.data?.items ?? [];
  const currency = agingData?.data?.currency;

  return (
    <Card
      sx={{
        borderRadius: "14px",
        border: "1px solid #ececec",
        boxShadow: "0 8px 24px rgba(0,0,0,.04)",
        alignSelf: "start",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardContent
        sx={{
          p: { xs: "16px !important", sm: "24px !important" },
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: 18, mb: 1 }}>
          Top Dead Stock Products
        </Typography>

        {items.length === 0 ? (
          <Box
            sx={{
              display: "flex",
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
                maxHeight: 200,
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
              {items.map((item, i) => (
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    py: 1.5,
                    px: 1,
                    borderBottom: "1px solid #ececec",
                    "&:last-child": { borderBottom: "none" },
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
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
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 500,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.title ?? "Untitled Product."}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: "#6b7280" }}>
                      {item.quantity} Units
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {formatPrice(currency, item.value)}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2.5 }}>
              <Button
                variant="outlined"
                onClick={() => navigate("/app/inventory")}
                sx={{
                  borderColor: "#cad0d6",
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
