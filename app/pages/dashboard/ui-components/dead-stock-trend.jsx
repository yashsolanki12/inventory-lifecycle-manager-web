import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import useInventoryData from "../../../hooks/useInventoryData";
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatPrice, useCurrentShopDomain } from "../../../utils/helper";
import { getDeadStockTrend } from "../../../api/dead-stock-trend";

const EmptyState = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flexGrow: 1,
      minHeight: 260,
    }}
  >
    <Typography sx={{ color: "#9ca3af", fontSize: 14 }}>
      No dead stock trend data available
    </Typography>
  </Box>
);

const DeadStockTrend = () => {
  const shopDomain = useCurrentShopDomain();

  const { data: trendData } = useInventoryData(
    ["dead-stock-trend-data"],
    () => getDeadStockTrend(shopDomain),
    null,
    { enabled: !!shopDomain },
  );

  const trend = trendData?.data?.trend ?? [];
  const currency = trendData?.data.currency;
  const hasData = trend.length > 0;

  return (
    <Card
      sx={{
        borderRadius: "14px",
        border: "1px solid #ececec",
        boxShadow: "0 8px 24px rgba(0,0,0,.04)",
        alignSelf: "start",
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
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, fontSize: { xs: 15, sm: 18 }, mb: 3 }}
        >
          Dead Stock Trend
        </Typography>
        {hasData ? (
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart
              data={trend}
              margin={{ top: 5, right: 10, bottom: 5, left: -10 }}
            >
              <defs>
                <linearGradient
                  id="deadStockGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#ef4444" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 13, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 13, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const val = payload[0].value;
                  return (
                    <Box
                      sx={{
                        background: "#1e293b",
                        color: "#fff",
                        borderRadius: "10px",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                        px: 1.5,
                        py: 1,
                      }}
                    >
                      <Typography
                        sx={{ fontSize: 13, fontWeight: 600, color: "#fff" }}
                      >
                        {label}
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: "#e2e8f0" }}>
                        {formatPrice(currency, val)} units
                      </Typography>
                    </Box>
                  );
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="none"
                fill="url(#deadStockGradient)"
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#ef4444"
                strokeWidth={3}
                dot={{ fill: "#ef4444", strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        ) : (
          <EmptyState />
        )}
      </CardContent>
    </Card>
  );
};

export default DeadStockTrend;
