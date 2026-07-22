import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#34d399", "#84cc16", "#f97316", "#fb923c", "#ef4444"];

const InventoryValueChart = ({ dashboardData, agingData }) => {
  const inventoryByAge = dashboardData?.data?.inventoryValueByAge ?? [];
  const currency = dashboardData?.data?.currency === "USD" ? "$" : "";
  const totalValue = dashboardData?.data?.totalInventoryValue ?? "0";

  const chartData = inventoryByAge.map((item, i) => ({
    name: item.label,
    value: item.value,
    percentage: item.percentage,
    color: COLORS[i],
  }));

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent === 0) return null;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);
    return (
      <text x={x} y={y} fill="#202223" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={600}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

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
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
          border: "none",
        }}
      >
        <Typography sx={{ fontSize: 13, fontWeight: 600, color: data.payload.color }}>
          {data.name}
        </Typography>
        <Typography sx={{ fontSize: 12, color: "#e2e8f0", mt: 0.5 }}>
          {`${currency}${data.value.toLocaleString()}`}
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
      <CardContent sx={{ p: "24px !important" }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, fontSize: 18 }}>
          Inventory Value By Age
        </Typography>
        <Box sx={{ position: "relative" }}>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                labelLine={false}
                label={renderCustomLabel}
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </Box>
        <Box sx={{ textAlign: "center", mt: 1 }}>
          <Typography sx={{ fontSize: 13, color: "#6b7280", fontWeight: 500 }}>
            Total
          </Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#202223" }}>
            {currency}{totalValue}
          </Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          {chartData.map((item, i) => (
            <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
              <Box sx={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: item.color, flexShrink: 0 }} />
              <Typography sx={{ fontSize: 14, color: "#374151" }}>{item.name}</Typography>
              <Typography sx={{ fontSize: 13, color: item.color, fontWeight: 600, ml: 0.5 }}>
                {item.percentage}%
              </Typography>
              <Typography sx={{ fontSize: 14, color: "#6b7280", ml: "auto" }}>
                {currency}{item.value.toLocaleString()}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default InventoryValueChart;
