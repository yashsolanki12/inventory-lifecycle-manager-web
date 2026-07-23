import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LockIcon from "@mui/icons-material/Lock";

const UpgradePrompt = ({ feature, description, requiredPlan = "Starter", pricingUrl }) => {
  const handleClick = () => {
    if (pricingUrl) {
      window.open(pricingUrl, "_top");
    } else {
      window.location.href = "/app/plans";
    }
  };

  return (
    <Card
      sx={{
        borderRadius: "14px",
        border: "2px dashed #d1d5db",
        backgroundColor: "#fafafa",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CardContent sx={{ textAlign: "center", py: 4 }}>
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
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#374151", mb: 0.5 }}>
          {feature}
        </Typography>
        <Typography sx={{ fontSize: 14, color: "#6b7280", mb: 2.5, maxWidth: 280, mx: "auto" }}>
          {description}
        </Typography>
        <Button
          variant="contained"
          onClick={handleClick}
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
};

export default UpgradePrompt;
