import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlineOutlined";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const ErrorCard = ({ errorMessage }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
      <Card
        sx={{
          maxWidth: 400,
          width: "100%",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 4,
            textAlign: "center",
          }}
        >
          <ErrorOutlineIcon sx={{ color: "#dc2626", fontSize: 48, mb: 2 }} />

          <Typography
            variant="h6"
            component="h2"
            sx={{ fontWeight: 600, color: "#111827", mb: 1 }}
          >
            An Error Occurred
          </Typography>

          <Typography sx={{ color: "#4b5563", fontSize: 14, mb: 3 }}>
            {errorMessage}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ErrorCard;
