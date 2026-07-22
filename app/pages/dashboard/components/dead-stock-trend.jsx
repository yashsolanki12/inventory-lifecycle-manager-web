import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DeadStockTrend = () => {
  const trendData = [
    { day: "Mon", value: 150 },
    { day: "Tue", value: 120 },
    { day: "Wed", value: 135 },
    { day: "Thu", value: 85 },
    { day: "Fri", value: 95 },
    { day: "Sat", value: 70 },
    { day: "Sun", value: 60 },
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
          Dead Stock Trend
        </Typography>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={trendData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 13, fill: "#6b7280" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 13, fill: "#6b7280" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: "#1e293b",
                color: "#fff",
                borderRadius: "10px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
              }}
              itemStyle={{ color: "#e2e8f0" }}
              labelStyle={{ color: "#fff", fontWeight: 600 }}
              formatter={(value) => [`${value} units`, "Dead Stock"]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ fill: "#ef4444", strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DeadStockTrend;
