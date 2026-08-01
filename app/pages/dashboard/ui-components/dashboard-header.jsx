import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SyncIcon from "@mui/icons-material/Sync";

const DashboardHeader = ({ onSync }) => {
  const [loading, setLoading] = React.useState(false);

  const handleSync = async () => {
    if (!onSync) return;
    setLoading(true);
    try {
      await onSync();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        mb: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      <Typography
        variant="h3"
        sx={{ fontWeight: 700, color: "#202223", fontSize: { xs: 22, sm: 26, md: 30 } }}
      >
        Dashboard
      </Typography>
      <Button
        variant="outlined"
        startIcon={
          <SyncIcon
            sx={{
              animation: loading ? "spin 1s linear infinite" : "none",
              "@keyframes spin": {
                "0%": { transform: "rotate(0deg)" },
                "100%": { transform: "rotate(360deg)" },
              },
            }}
          />
        }
        onClick={handleSync}
        disabled={loading}
        sx={{
          borderColor: "#fafdfc",
          color: "#000000",
          backgroundColor: "#FFFFFF",
          textTransform: "none",
          borderRadius: "8px",
          fontWeight: 600,
          fontSize: { xs: 12, sm: "13px" },
          px: { xs: 1.5, sm: 2 },
          py: 0.75,
          "&:hover": {
            borderColor: "#CBD5E1",
            backgroundColor: "#F8FAFC",
          },
        }}
      >
        {loading ? "Syncing..." : "Re-sync"}
      </Button>
    </Box>
  );
};

export default DashboardHeader;
