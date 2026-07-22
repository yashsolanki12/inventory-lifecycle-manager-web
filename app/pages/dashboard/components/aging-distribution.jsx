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

const COLORS = ["#34d399", "#84cc16", "#f97316", "#fb923c", "#ef4444"];

const CustomXAxisTick = ({ x, y, payload, chartData }) => {
  const index = chartData.findIndex((d) => d.name === payload.value);
  const color = index >= 0 ? COLORS[index] : "#6b7280";
  return (
    <text x={x} y={y + 12} textAnchor="middle" fill={color} fontSize={13} fontWeight={500}>
      {payload.value}
    </text>
  );
};

const AgingDistributionChart = ({ agingData }) => {
  const buckets = agingData?.data?.buckets;
  const total = (buckets?.fresh ?? 0) + (buckets?.mild ?? 0) + (buckets?.aging ?? 0) + (buckets?.dead ?? 0) || 1;

  const chartData = [
    { name: "Fresh", value: buckets?.fresh ?? 0, pct: Math.round(((buckets?.fresh ?? 0) / total) * 100) },
    { name: "Mild", value: buckets?.mild ?? 0, pct: Math.round(((buckets?.mild ?? 0) / total) * 100) },
    { name: "Aging", value: buckets?.aging ?? 0, pct: Math.round(((buckets?.aging ?? 0) / total) * 100) },
    { name: "Dead", value: buckets?.dead ?? 0, pct: Math.round(((buckets?.dead ?? 0) / total) * 100) },
  ];

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
          Inventory Aging Distribution
        </Typography>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData} margin={{ top: 5, right: 20, bottom: 10, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={(props) => <CustomXAxisTick {...props} chartData={chartData} />}
            />
            <YAxis tick={{ fontSize: 13, fill: "#6b7280" }} axisLine={false} tickLine={false} />
            <Tooltip
              formatter={(value, name) => [`${value} units`, name]}
              contentStyle={{
                background: "#1e293b",
                color: "#fff",
                borderRadius: "10px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
              }}
              itemStyle={{ color: "#e2e8f0" }}
              labelStyle={{ color: "#fff", fontWeight: 600 }}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={60}>
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AgingDistributionChart;
