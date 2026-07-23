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
    <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Typography variant="h4" sx={{ fontWeight: 700, color: "#202223" }}>
        Dashboard
      </Typography>
      <Button
        variant="outlined"
        startIcon={<SyncIcon sx={{ animation: loading ? "spin 1s linear infinite" : "none", "@keyframes spin": { "0%": { transform: "rotate(0deg)" }, "100%": { transform: "rotate(360deg)" } } }} />}
        onClick={handleSync}
        disabled={loading}
        sx={{
          borderColor: "#008060",
          color: "#008060",
          textTransform: "none",
          borderRadius: "8px",
          fontWeight: 600,
          fontSize: "13px",
          px: 2,
          py: 0.75,
          "&:hover": {
            borderColor: "#006F60",
            backgroundColor: "rgba(0,128,96,0.04)",
          },
        }}
      >
        {loading ? "Syncing..." : "Re-sync"}
      </Button>
    </Box>
  );
};

export default DashboardHeader;
