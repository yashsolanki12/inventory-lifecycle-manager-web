import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LockIcon from "@mui/icons-material/Lock";
import { usePricingRedirect } from "../utils/helper";

const PlanGate = ({
  requiredPlan = "Pro",
  feature,
  message,
  upgradeUrl,
  children: _children,
}) => {
  const redirectToPricing = usePricingRedirect();
  const handleUpgrade = () => {
    if (upgradeUrl) {
      window.open(upgradeUrl, "_top");
    } else {
      redirectToPricing();
    }
  };

  const content = (
    <Card
      sx={{
        borderRadius: "14px",
        border: "2px dashed #d1d5db",
        backgroundColor: "#fafafa",
        width: "100%",
      }}
    >
      <CardContent
        sx={{
          textAlign: "center",
          py: { xs: 3, sm: 5 },
          px: { xs: 2, sm: 4 },
        }}
      >
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            backgroundColor: "#f3f4f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 2,
          }}
        >
          <LockIcon sx={{ fontSize: 28, color: "#9ca3af" }} />
        </Box>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "#374151", mb: 0.5 }}
        >
          {feature
            ? `${feature} requires ${requiredPlan} plan`
            : `Requires ${requiredPlan} plan`}
        </Typography>
        <Typography
          sx={{
            fontSize: 14,
            color: "#6b7280",
            mb: 2.5,
            maxWidth: 320,
            mx: "auto",
          }}
        >
          {message ||
            `Your current plan does not include this feature. Upgrade to ${requiredPlan} to unlock it.`}
        </Typography>
        <Button
          variant="contained"
          onClick={handleUpgrade}
          sx={{
            backgroundColor: "#008060",
            textTransform: "none",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "13px",
            px: 3,
            "&:hover": { backgroundColor: "#006F60" },
          }}
        >
          Upgrade to {requiredPlan}
        </Button>
      </CardContent>
    </Card>
  );

  return content;
};

export default PlanGate;
