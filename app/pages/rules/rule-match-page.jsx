import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useParams, useNavigate } from "react-router";
import { useCurrentShopDomain } from "../../utils/helper";

import { OPERATOR_OPTIONS } from "../../utils/helper";

const RuleMatchPage = () => {
  const { id } = useParams();
  const shopDomain = useCurrentShopDomain();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1450,
        mx: "auto",
        px: { xs: 2, sm: 3 },
        py: 3,
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          mb: 3,
        }}
      >
        <Tooltip title="Back to Rules" arrow>
          <IconButton
            onClick={() => navigate("/app/rules")}
            sx={{
              color: "#6b7280",
              "&:hover": {
                color: "#374151",
                backgroundColor: "#f3f4f6",
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
        <Typography
          variant="h3"
          sx={{ fontWeight: 700, color: "#202223", fontSize: 24 }}
        >
          Rule Match
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          p: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: 14,
            color: "#6b7280",
            textAlign: "center",
            py: 4,
          }}
        >
          Matched products will appear here once the rule is processed.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 3 }}>
        {/* <Button
          variant="outlined"
          onClick={() => navigate("/app/rules")}
          sx={{
            borderColor: "#cad0d6",
            color: "#374151",
            textTransform: "none",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "13px",
            px: 3,
            "&:hover": {
              borderColor: "#9ca3af",
              backgroundColor: "#f9fafb",
            },
          }}
        >
          Back to Rules
        </Button> */}
      </Box>
    </Box>
  );
};

export default RuleMatchPage;
