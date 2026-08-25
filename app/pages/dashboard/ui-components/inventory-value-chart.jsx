import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { formatPrice } from "../../../utils/helper";
import { BUCKET_COLOR_MAP, COLORS } from "../../../utils/config/constants";

const InventoryValueChart = ({ dashboardData, _agingData }) => {
  const inventoryByAge = dashboardData?.data?.inventoryValueByAge ?? [];
  const currency = dashboardData?.data?.currency;
  const totalValue = dashboardData?.data?.totalInventoryValue ?? "0";
  const chartData = inventoryByAge.map((item) => ({
    name: item.label,
    value: item.value,
    valueFormatted: item.valueFormatted,
    percentage: item.percentage,
    color: BUCKET_COLOR_MAP[item.bucket] ?? COLORS[4],
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const data = payload[0];
    return (
      <Box
        sx={{
          background: "#1e293b",
          borderRadius: "10px",
          px: 2,
          py: 1.5,
          zIndex: 100,
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
          border: "none",
          pointerEvents: "none",
        }}
      >
        <Typography
          sx={{ fontSize: 13, fontWeight: 600, color: data.payload.color }}
        >
          {data.name}
        </Typography>
        <Typography sx={{ fontSize: 12, color: "#e2e8f0", mt: 0.5 }}>
          {formatPrice(currency, data.value)}
        </Typography>
        <Typography sx={{ fontSize: 11, color: "#94a3b8" }}>
          {`${data.payload.percentage}%`}
        </Typography>
      </Box>
    );
  };

  return (
    <Card
      sx={{
        borderRadius: "14px",
        border: "1px solid #ececec",
        boxShadow: "0 8px 24px rgba(0,0,0,.04)",
        height: "100%",
      }}
    >
      <CardContent sx={{ p: { xs: "16px !important", sm: "24px !important" } }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, mb: 3, fontSize: { xs: 15, sm: 18 } }}
        >
          Inventory Value By Age
        </Typography>
        <Box sx={{ position: "relative" }}>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={<CustomTooltip />}
                wrapperStyle={{ zIndex: 1000, pointerEvents: "none" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              pointerEvents: "none",
            }}
          >
            <Typography
              sx={{ fontSize: 12, color: "#6b7280", fontWeight: 500 }}
            >
              Total
            </Typography>
            <Typography
              sx={{ fontSize: 16, fontWeight: 700, color: "#202223" }}
            >
              {formatPrice(currency, totalValue)}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 2 }}>
          {chartData
            .filter(
              (ele) => Number(ele.percentage) > 0 && Number(ele.value) > 0,
            )
            .map((item, i) => {
              return (
                <Box
                  key={i}
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      backgroundColor: item.color,
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    sx={{ fontSize: { xs: 12, sm: 14 }, color: "#374151" }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: 11, sm: 13 },
                      color: item.color,
                      fontWeight: 600,
                      ml: 0.5,
                    }}
                  >
                    {item.percentage}%
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: 12, sm: 14 },
                      color: "#6b7280",
                      ml: "auto",
                    }}
                  >
                    {formatPrice(currency, item.valueFormatted)}
                  </Typography>
                </Box>
              );
            })}
        </Box>
      </CardContent>
    </Card>
  );
};

export default InventoryValueChart;
