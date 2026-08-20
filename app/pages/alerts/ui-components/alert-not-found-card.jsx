import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { useNavigate } from "react-router";

const AlertNotFoundCard = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <IconButton
            onClick={() => navigate("/app/alerts")}
            sx={{ color: "#374151" }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: "#0f1111",
              fontSize: { xs: 20, sm: 24 },
            }}
          >
            Alert Details
          </Typography>
        </Box>
      </Box>
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
          <SearchOffIcon sx={{ fontSize: 36, color: "#9ca3af" }} />
        </Box>
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 600,
            color: "#374151",
            mb: 1,
          }}
        >
          Alert not found
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
          The alert you&apos;re looking for doesn&apos;t exist or may have been removed. Go back to the alerts list to see available alerts.
        </Typography>
      </Box>
    </>
  );
};

export default AlertNotFoundCard;
