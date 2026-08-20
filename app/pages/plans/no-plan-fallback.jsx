import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PropTypes from "prop-types";
import { openBillingUrl, usePricingRedirect } from "../../utils/helper";

function NoPlanFallback({
  message = "Please select a plan to access all features of this app.",
  billingUrl,
}) {
  const redirectToPricing = usePricingRedirect();

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
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1300,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(4px)",
        px: 3,
      }}
    >
      <Card
        sx={{
          maxWidth: 480,
          width: "100%",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <CreditCardIcon sx={{ fontSize: 32, color: "#036906", mb: 1 }} />
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: "#202223", mb: 1 }}
          >
            No Plan Selected
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#6d7175", lineHeight: 1.5, mb: 3 }}
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
