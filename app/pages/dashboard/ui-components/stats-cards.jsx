import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import { DASHBOARD_CARDS, PLAN_COLORS } from "../../../utils/config/constants";

const StatsCards = ({ dashboardData, plan }) => {
  const data = dashboardData?.data;
  const planName = plan?.plan || "free";
  const rules = plan?.scans || {};
  const planColor = PLAN_COLORS[planName] || PLAN_COLORS.free;
  return (
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
      {DASHBOARD_CARDS.map((card) => {
        const raw = data ? card.getValue(data) : undefined;
        if (raw === undefined || raw === null || raw === "0") return null;
        const val = String(raw);
        return (
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
              {(() => {
                // const len = val.length;
                const valueFontSize = 22;
                const labelFontSize = 14;
                return (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        sx={{
                          color: card.color,
                          fontSize: labelFontSize,
                          fontWeight: 600,
                        }}
                      >
                        {card.label}
                      </Typography>
                      {card.key === "totalProducts" && rules.limit && (
                        <Chip
                          label={`Current plan: ${plan?.planName || "Free"}`}
                          size="small"
                          sx={{
                            backgroundColor: planColor.bg,
                            color: planColor.text,
                            fontWeight: 600,
                            fontSize: 11,
                            height: 22,
                          }}
                        />
                      )}
                    </Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        my: 1.5,
                        color: "#202223",
                        fontSize: valueFontSize,
                        lineHeight: 1.2,
                        wordBreak: "break-word",
                      }}
                    >
                      {val}
                    </Typography>
                    {card.key === "totalProducts" &&
                      rules.limit &&
                      rules.usedToday !== undefined && (
                        <Typography
                          sx={{ fontSize: 12, color: "#9ca3af", mt: -1 }}
                        >
                          {rules.usedToday} / {rules.limit}{" "}
                          {rules.limit == -1
                            ? "Unlimited scans."
                            : "Basic scans."}
                        </Typography>
                      )}
                  </>
                );
              })()}
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default StatsCards;
