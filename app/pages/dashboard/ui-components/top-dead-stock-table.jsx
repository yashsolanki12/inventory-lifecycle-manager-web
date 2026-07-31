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
                      sx={{
                        borderBottom: "1px solid #ececec",
                        display: { xs: "flex", md: "table-row" },
                        flexWrap: "wrap",
                        py: { xs: 1, md: 0 },
                      }}
                    >
                      <Box
                        component="td"
                        sx={{
                          py: { xs: 1, md: 2 },
                          pr: 2,
                          borderBottom: { xs: "none", md: "1px solid #ececec" },
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          flex: 1,
                          minWidth: 0,
                        }}
                      >
                        <Box
                          sx={{
                            width: { xs: 36, sm: 46 },
                            height: { xs: 36, sm: 46 },
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
                        <Typography
                          sx={{
                            fontSize: { xs: 13, sm: 15 },
                            fontWeight: 500,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.title ?? "Untitled Product."}
                        </Typography>
                      </Box>
                      <Box
                        component="td"
                        sx={{
                          py: { xs: 0, md: 2 },
                          px: { xs: 0, sm: 2 },
                          fontSize: { xs: 12, sm: 15 },
                          borderBottom: { xs: "none", md: "1px solid #ececec" },
                          whiteSpace: "nowrap",
                          display: { xs: "inline-block", md: "table-cell" },
                          mr: { xs: 2, md: 0 },
                          textAlign: { xs: "right", md: "left" },
                        }}
                      >
                        {item.quantity} Units
                      </Box>
                      <Box
                        component="td"
                        sx={{
                          py: { xs: 0, md: 2 },
                          pl: { xs: 0, sm: 2 },
                          fontSize: { xs: 12, sm: 15 },
                          borderBottom: { xs: "none", md: "1px solid #ececec" },
                          whiteSpace: "nowrap",
                          display: { xs: "inline-block", md: "table-cell" },
                          textAlign: { xs: "right", md: "left" },
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
