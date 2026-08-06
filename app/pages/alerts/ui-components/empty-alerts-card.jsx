import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

const EmptyAlertsCard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 10,
        px: 4,
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        border: "1px dashed #e5e7eb",
      }}
    >
      <Box
        sx={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          backgroundColor: "#f3f4f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
        }}
      >
        <NotificationsNoneIcon sx={{ fontSize: 36, color: "#9ca3af" }} />
      </Box>
      <Typography
        sx={{
          fontSize: 18,
          fontWeight: 600,
          color: "#374151",
          mb: 1,
        }}
      >
        No alerts yet
      </Typography>
      <Typography
        sx={{
          fontSize: 14,
          color: "#9ca3af",
          textAlign: "center",
          maxWidth: 360,
          lineHeight: 1.6,
        }}
      >
        When something happens with your inventory, you&apos;ll see alerts here. Run a scan or check back later.
      </Typography>
    </Box>
  );
};

export default EmptyAlertsCard;
