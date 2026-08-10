import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const DetailItem = ({ label, value }) => {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 600,
          color: "#9ca3af",
          mb: 0.5,
          textTransform: "none",
          letterSpacing: "0.5px",
        }}
      >
        {label}
      </Typography>
      <Typography sx={{ fontSize: 14, color: "#0f1111", fontWeight: 500 }}>
        {value}
      </Typography>
    </Box>
  );
};

export default DetailItem;
