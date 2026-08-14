import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { DASHBOARD_CARDS } from "../../utils/config/constants";

const DashboardSkeleton = ({ dashboardData }) => {
  const data = dashboardData?.data;
  const visibleCards = data
    ? DASHBOARD_CARDS.filter((card) => {
        const val = card.getValue(data);
        return val !== undefined && val !== null;
      })
    : DASHBOARD_CARDS;
  const inventoryValueByAge = data?.inventoryValueByAge;
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1450,
        mx: "auto",
        px: { xs: 2, sm: 3 },
        py: 3,
        mb: 5,
        boxSizing: "border-box",
        background: "#f5f7fb",
        borderRadius: "12px",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Skeleton variant="text" width={180} height={40} />
        <Skeleton
          variant="rounded"
          width={100}
          height={36}
          sx={{ borderRadius: "8px" }}
        />
      </Box>

      {/* Stats Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 2,
          mb: 3,
        }}
      >
        {visibleCards.map((card, idx) => (
          <Card
            key={card.key}
            sx={{
              borderRadius: "14px",
              border: "1px solid #ececec",
              boxShadow: "0 8px 24px rgba(0,0,0,.04)",
            }}
          >
            <CardContent
              sx={{ p: { xs: "16px !important", sm: "22px !important" } }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Skeleton variant="text" width="40%" height={16} />
                {idx === 0 && (
                  <Skeleton
                    variant="rounded"
                    width={90}
                    height={22}
                    sx={{ borderRadius: "50px" }}
                  />
                )}
              </Box>
              <Skeleton
                variant="text"
                width="45%"
                height={28}
                sx={{ mt: 1.5 }}
              />
              {idx === 0 && (
                <Skeleton
                  variant="text"
                  width="35%"
                  height={14}
                  sx={{ mt: 0.5 }}
                />
              )}
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Inventory Aging Distribution & Inventory Value By Age */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1.5fr 1fr" },
          gap: 2,
          mb: 3,
        }}
      >
        {/* Inventory Aging Distribution */}
        <Card
          sx={{
            borderRadius: "14px",
            border: "1px solid #ececec",
            boxShadow: "0 8px 24px rgba(0,0,0,.04)",
            height: "100%",
          }}
        >
          <CardContent
            sx={{ p: { xs: "16px !important", sm: "24px !important" } }}
          >
            <Skeleton variant="text" width="60%" height={24} sx={{ mb: 3 }} />
            <Skeleton
              variant="rounded"
              width="100%"
              height={280}
              sx={{ borderRadius: "8px" }}
            />
          </CardContent>
        </Card>

        {/* Inventory Value By Age - Doughnut */}
        <Card
          sx={{
            borderRadius: "14px",
            border: "1px solid #ececec",
            boxShadow: "0 8px 24px rgba(0,0,0,.04)",
            height: "100%",
          }}
        >
          <CardContent
            sx={{ p: { xs: "16px !important", sm: "24px !important" } }}
          >
            <Skeleton variant="text" width="55%" height={24} sx={{ mb: 3 }} />
            <Box sx={{ position: "relative" }}>
              <Skeleton
                variant="circular"
                width={200}
                height={200}
                sx={{ mx: "auto" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                }}
              >
                <Skeleton variant="text" width={40} height={14} sx={{ mx: "auto" }} />
                <Skeleton variant="text" width={60} height={20} sx={{ mx: "auto" }} />
              </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
              {inventoryValueByAge?.map((i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1,
                  }}
                >
                  <Skeleton variant="circular" width={12} height={12} />
                  <Skeleton variant="text" width="30%" height={14} />
                  <Skeleton variant="text" width="10%" height={14} />
                  <Skeleton
                    variant="text"
                    width="20%"
                    height={14}
                    sx={{ ml: "auto" }}
                  />
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Charts Row 2 */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1.4fr 1fr" },
          gap: 2,
        }}
      >
        {/* Dead Stock Trend Skeleton */}
        <Card
          sx={{
            borderRadius: "14px",
            border: "1px solid #ececec",
            boxShadow: "0 8px 24px rgba(0,0,0,.04)",
            alignSelf: "start",
          }}
        >
          <CardContent
            sx={{ p: { xs: "16px !important", sm: "24px !important" } }}
          >
            <Skeleton variant="text" width="20%" height={24} sx={{ mb: 3 }} />
            <Skeleton
              variant="rounded"
              width="100%"
              height={260}
              sx={{ borderRadius: "8px" }}
            />
          </CardContent>
        </Card>

        {/* Top Dead Stock Products */}
        <Card
          sx={{
            borderRadius: "14px",
            border: "1px solid #ececec",
            boxShadow: "0 8px 24px rgba(0,0,0,.04)",
            alignSelf: "start",
          }}
        >
          <CardContent
            sx={{ p: { xs: "16px !important", sm: "24px !important" } }}
          >
            <Skeleton variant="text" width="55%" height={38} sx={{ mb: 2.5 }} />
            {[1, 2, 3].map((i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  py: 1.5,
                  borderBottom: "1px solid #ececec",
                  "&:last-child": { borderBottom: "none" },
                }}
              >
                <Skeleton
                  variant="rounded"
                  width={40}
                  height={40}
                  sx={{ borderRadius: "10px", flexShrink: 0 }}
                />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="70%" height={14} />
                  <Skeleton
                    variant="text"
                    width="20%"
                    height={12}
                    sx={{ mt: 0.5 }}
                  />
                </Box>
                <Skeleton variant="text" width="15%" height={14} />
              </Box>
            ))}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2.5 }}>
              <Skeleton
                variant="rounded"
                width={90}
                height={36}
                sx={{ borderRadius: "8px" }}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default DashboardSkeleton;
