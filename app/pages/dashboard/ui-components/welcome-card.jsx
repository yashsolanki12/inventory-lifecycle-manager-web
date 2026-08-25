import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import InventoryIcon from "@mui/icons-material/Inventory";
import SyncIcon from "@mui/icons-material/Sync";
import { usePricingRedirect } from "../../../utils/helper";
import { FEATURES, PLAN_SKU_TEXT } from "../../../utils/config/constants";

const WelcomeCard = ({ onSync, plan, isSyncing }) => {
  const planName = plan?.plan || "free";
  const skuLabel = PLAN_SKU_TEXT[planName] || PLAN_SKU_TEXT.free;
  const redirectToPricing = usePricingRedirect();
  const handleUpgrade = () => {
    redirectToPricing();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "65vh",
        px: { xs: 1.5, sm: 3 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 480,
          borderRadius: { xs: "12px", sm: "16px" },
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.06)",
          backgroundColor: "#fff",
        }}
      >
        <Box
          sx={{
            background:
              "linear-gradient(135deg, #008060 0%, #006F60 50%, #004C3F 100%)",
            px: { xs: 2.5, sm: 4 },
            py: { xs: 3.5, sm: 5 },
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: -40,
              right: -40,
              width: 120,
              height: 120,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.08)",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -30,
              left: -20,
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.05)",
            },
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.15)",
              border: "2px solid rgba(255,255,255,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
            }}
          >
            <InventoryIcon sx={{ fontSize: 32, color: "#fff" }} />
          </Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: "#fff", mb: 0.5 }}
          >
            Welcome to Inventory Manager
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "rgba(255,255,255,0.8)", maxWidth: 320, mx: "auto" }}
          >
            Sync your Shopify products to start tracking inventory and managing
            stock levels.
          </Typography>
        </Box>

        <Box sx={{ px: { xs: 2.5, sm: 4 }, pt: 3, pb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
            <Chip
              label={`'${plan?.planName}' plan.` || "Free"}
              size="small"
              sx={{
                backgroundColor: "#ecfdf5",
                color: "#008060",
                fontWeight: 600,
                fontSize: 12,
              }}
            />
            <Typography sx={{ fontSize: 13, color: "#6b7280" }}>
              {skuLabel}
            </Typography>
          </Box>
          {FEATURES.map((feat, i) => (
            <Box
              key={i}
              sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 1 }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "8px",
                  backgroundColor: "#F4F6F8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  flexShrink: 0,
                }}
              >
                {feat.icon}
              </Box>
              <Typography
                variant="body2"
                sx={{ color: "#303030", fontWeight: 500 }}
              >
                {feat.label}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ px: { xs: 2.5, sm: 4 }, pb: 4, pt: 2 }}>
          <Typography
            sx={{
              fontSize: 12,
              color: "#9ca3af",
              textAlign: "center",
              lineHeight: 1.4,
              mb: 2,
            }}
          >
            {planName !== "pro"
              ? "A random subset of products will be synced based on your plan limit."
              : "All products will be synced."}
          </Typography>
          <Button
            fullWidth
            variant="contained"
            startIcon={<SyncIcon />}
            onClick={onSync}
            disabled={isSyncing}
            sx={{
              backgroundColor: "#008060",
              textTransform: "none",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "15px",
              py: 1.5,
              boxShadow: "0 2px 6px rgba(0,128,96,0.3)",
              "&:hover": {
                backgroundColor: "#006F60",
                boxShadow: "0 4px 12px rgba(0,128,96,0.4)",
              },
            }}
          >
            {isSyncing ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Sync Products"
            )}
          </Button>

          {planName === "free" && (
            <Button
              fullWidth
              variant="text"
              onClick={handleUpgrade}
              sx={{
                mt: 1,
                textTransform: "none",
                color: "#008060",
                fontWeight: 600,
                fontSize: "13px",
              }}
            >
              View Plans & Upgrade
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default WelcomeCard;
