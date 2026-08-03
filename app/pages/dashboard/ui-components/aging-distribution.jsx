import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { COLORS } from "../../../utils/helper";

const CustomXAxisTick = ({ x, y, payload, chartData }) => {
  const index = chartData.findIndex((d) => d.name === payload.value);
  const color = index >= 0 ? COLORS[index] : "#6b7280";
  return (
    <text
      x={x}
      y={y + 12}
      textAnchor="middle"
      fill={color}
      fontSize={13}
      fontWeight={500}
    >
      {payload.value}
    </text>
  );
};

const AgingDistributionChart = ({ agingData }) => {
  const buckets = agingData?.data?.buckets;
  const total =
    (buckets?.fresh ?? 0) +
      (buckets?.mild ?? 0) +
      (buckets?.aging ?? 0) +
      (buckets?.dead ?? 0) || 1;

  const chartData = [
    {
      name: "Fresh",
      value: buckets?.fresh ?? 0,
      pct: Math.round(((buckets?.fresh ?? 0) / total) * 100),
    },
    {
      name: "Mild",
      value: buckets?.mild ?? 0,
      pct: Math.round(((buckets?.mild ?? 0) / total) * 100),
    },
    {
      name: "Aging",
      value: buckets?.aging ?? 0,
      pct: Math.round(((buckets?.aging ?? 0) / total) * 100),
    },
    {
      name: "Dead",
      value: buckets?.dead ?? 0,
      pct: Math.round(((buckets?.dead ?? 0) / total) * 100),
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    const dataItem = payload[0].payload;
    const colorIndex = chartData.findIndex((d) => d.name === dataItem.name);
    const bgColor = colorIndex >= 0 ? COLORS[colorIndex] : "#1e293b";
    return (
      <Box
        sx={{
          background: bgColor,
          color: "#000000",
          borderRadius: "6px",
          border: "none",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
          px: 1.5,
          py: 1,
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: 13 }}>{dataItem.name}</Typography>
        <Typography sx={{ fontSize: 12 }}>{dataItem.value} units</Typography>
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
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent
        sx={{
          p: { xs: "16px !important", sm: "24px !important" },
          display: "flex",
          flexDirection: "column",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, fontSize: { xs: 15, sm: 18 } }}>
          Inventory Aging Distribution
        </Typography>
        <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ResponsiveContainer width="100%" height="100%" minHeight={280}>
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 20, bottom: 10, left: -10 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={(props) => (
                  <CustomXAxisTick {...props} chartData={chartData} />
                )}
              />
              <YAxis
                tick={{ fontSize: 13, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={60}>
                {chartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AgingDistributionChart;
