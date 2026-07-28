import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SearchOffIcon from "@mui/icons-material/SearchOff";

const NoDataFound = ({
  title = "No data found",
  description = "Try adjusting your search or filters",
  icon = null,
  height = 300,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height,
        textAlign: "center",
        py: 4,
      }}
    >
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: "16px",
          backgroundColor: "#f9fafb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2.5,
        }}
      >
        {icon || <SearchOffIcon sx={{ fontSize: 32, color: "#9ca3af" }} />}
      </Box>
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 600,
          color: "#374151",
          mb: 0.5,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: 13,
          color: "#9ca3af",
          maxWidth: 280,
          lineHeight: 1.5,
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default NoDataFound;
