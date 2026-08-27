import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PropTypes from "prop-types";
import { openBillingUrl } from "../../utils/helper";

function NoPlanFallback({
  message = "Please select a plan to access all features of this app.",
  billingUrl,
}) {
  // const _redirectToPricing = usePricingRedirect();

  // const handleClick = React.useCallback(() => {
  //   redirectToPricing();
  // }, []);
  const handleSelectPlan = () => {
    openBillingUrl(billingUrl);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1300,
        p: 2,
        backgroundColor: "rgba(255, 255, 255, 0.98)",
        borderTop: "1px solid #e5e7eb",
        boxShadow: "0 -4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          mx: "auto",
          borderRadius: "10px",
          textAlign: "center",
          boxShadow: "none",
          border: "1px solid #e5e7eb",
        }}
      >
        <CardContent sx={{ py: 2, px: 3, display: "flex", alignItems: "center", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
          <CreditCardIcon sx={{ fontSize: 24, color: "#036906" }} />
          <Typography
            variant="body2"
            sx={{ color: "#6d7175", lineHeight: 1.5, fontWeight: 500 }}
          >
            {message}
          </Typography>
          <Button
            variant="contained"
            component="a"
            href={billingUrl || "#"}
            target="_top"
            rel="noopener noreferrer"
            onClick={handleSelectPlan}
            sx={{
              backgroundColor: "#202223",
              textTransform: "none",
              borderRadius: "6px",
              fontWeight: 600,
              px: 3,
              textDecoration: "none",
              "&:hover": { backgroundColor: "#303030" },
            }}
          >
            Select Plan
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

NoPlanFallback.propTypes = {
  message: PropTypes.string,
  billingUrl: PropTypes.string,
};

export default NoPlanFallback;
