import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
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
import { VELOCITY_CONFIG } from "../../../utils/config/constants";

const StatCard = ({ label, value, isLast }) => (
  <Box
    sx={{
      px: { xs: 1.5, sm: 2.5 },
      py: 2,
      borderRight: { sm: isLast ? "none" : "1px solid #e5e7eb" },
      borderBottom: { xs: isLast ? "none" : "1px solid #e5e7eb", sm: "none" },
      display: "flex",
      flexDirection: "column",
      gap: 0.5,
    }}
  >
    <Typography
      sx={{ fontSize: { xs: 11, sm: 14 }, fontWeight: 500, color: "#9ca3af" }}
    >
      {label}
    </Typography>
    <Typography
      sx={{ fontSize: { xs: 16, sm: 18 }, fontWeight: 700, color: "#0f1111" }}
    >
      {value}
    </Typography>
  </Box>
);

const ChartTooltip = ({ active, payload, label, data }) => {
  if (!active || !payload?.length) return null;
  const val = payload[0].value;
  const item = data?.find((d) => d.key === label);
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
      <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>
        {item?.label ?? label}
      </Typography>
      <Typography sx={{ fontSize: 12, color: "#e2e8f0" }}>
        {`${val} units`}
      </Typography>
    </Box>
  );
};

const TrendChart = ({ title, data, color, gradientId }) => {
  const hasData = data?.length > 0 && data.some((d) => d.value > 0);

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "14px",
        border: "1px solid #ececec",
        boxShadow: "0 8px 24px rgba(0,0,0,.04)",
        p: { xs: "16px", sm: "24px" },
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, fontSize: 16, mb: 2.5 }}>
        {title}
      </Typography>
      {hasData ? (
        <ResponsiveContainer width="100%" height={240}>
          <ComposedChart
            data={data}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.35} />
                <stop offset="100%" stopColor={color} stopOpacity={0.02} />
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
                const item = data.find((d) => d.key === payload.value);
                return (
                  <text
                    x={x}
                    y={y + 14}
                    textAnchor="middle"
                    fill="#6b7280"
                    fontSize={12}
                  >
                    {item?.label ?? payload.value}
                  </text>
                );
              }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<ChartTooltip data={data} />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="none"
              fill={`url(#${gradientId})`}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2.5}
              dot={{ fill: color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 240,
          }}
        >
          <Typography sx={{ color: "#9ca3af", fontSize: 14 }}>
            No data available
          </Typography>
        </Box>
      )}
    </Box>
  );
};

const OverviewTab = ({ product }) => {
  const velocityConfig =
    VELOCITY_CONFIG[product?.velocity] || VELOCITY_CONFIG.dead;

  const statCards = [
    { label: "Total Sold", value: `${product?.totalSold ?? 0} units` },
    {
      label: "Sell Through Rate",
      value: product?.sellThroughRate || "0 units/day",
    },
    { label: "Days Since Added", value: product?.productAgeDays || "—" },
    {
      label: "Velocity",
      value: (
        <Chip
          label={velocityConfig.label}
          size="small"
          sx={{
            backgroundColor: velocityConfig.bg,
            color: velocityConfig.color,
            fontWeight: 600,
            fontSize: 12,
            height: 26,
            borderRadius: "6px",
            border: `1px solid ${velocityConfig.color}20`,
            px: 0.4,
          }}
        />
      ),
    },
  ];

  return (
    <Box
      sx={{
        p: { xs: 1.5, sm: 3 },
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {/* Stat Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(4, 1fr)" },
          borderRadius: "14px",
          border: "1px solid #ececec",
          boxShadow: "0 8px 24px rgba(0,0,0,.04)",
          overflow: "hidden",
          backgroundColor: "#fff",
        }}
      >
        {statCards.map((card, i) => (
          <StatCard
            key={card.label}
            label={card.label}
            value={card.value}
            isLast={i === statCards.length - 1}
          />
        ))}
      </Box>

      {/* Charts */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
        }}
      >
        <TrendChart
          title="Sales Trend"
          data={product?.salesTrend || []}
          color="#3b82f6"
          gradientId="salesGradient"
        />
        <TrendChart
          title="Inventory Trend"
          data={product?.inventoryTrend || []}
          color="#8b5cf6"
          gradientId="inventoryGradient"
        />
      </Box>
    </Box>
  );
};

export default OverviewTab;
