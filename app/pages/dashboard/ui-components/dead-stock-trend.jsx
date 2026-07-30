import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
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
import useInventoryData from "../../../hooks/useInventoryData";
import { PERIOD_OPTIONS, useCurrentShopDomain } from "../../../utils/helper";
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
  const [selectedDays, setSelectedDays] = React.useState(7);

  const { data: trendData } = useInventoryData(
    ["dead-stock-trend-data", selectedDays],
    () => getDeadStockTrend(shopDomain, { days: selectedDays }),
    null,
    { enabled: !!shopDomain },
  );

  const trend = trendData?.data?.trend ?? [];
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
            mb: 3,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: 18 }}>
            Dead Stock Trend
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            {PERIOD_OPTIONS.map((opt) => (
              <Box
                key={opt.days}
                onClick={() => setSelectedDays(opt.days)}
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "6px",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "1px solid",
                  borderColor:
                    selectedDays === opt.days ? "#008060" : "#e5e7eb",
                  backgroundColor:
                    selectedDays === opt.days
                      ? "rgba(0,128,96,0.08)"
                      : "transparent",
                  color: selectedDays === opt.days ? "#008060" : "#6b7280",
                  transition: "all 0.15s ease",
                  "&:hover": {
                    borderColor: "#008060",
                    color: "#008060",
                  },
                }}
              >
                {opt.label}
              </Box>
            ))}
          </Box>
        </Box>
        {hasData ? (
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart
              data={trend}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
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
                dataKey="key"
                tick={({ x, y, payload }) => {
                  const item = trend.find((t) => t.key === payload.value);
                  return (
                    <text
                      x={x}
                      y={y + 14}
                      textAnchor="middle"
                      fill="#6b7280"
                      fontSize={13}
                    >
                      {item?.label ?? payload.value}
                    </text>
                  );
                }}
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
                  const item = trend.find((t) => t.key === label);
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
                        {item?.label ?? label}
                      </Typography>
                      <Typography
                        sx={{ fontSize: 12, color: "#e2e8f0" }}
                      >{`${val} units`}</Typography>
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
