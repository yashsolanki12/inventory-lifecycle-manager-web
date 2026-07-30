import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const OverviewTab = ({ product }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography sx={{ color: "#9ca3af", fontSize: 14 }}>
        Product overview information will be displayed here.
      </Typography>
    </Box>
  );
};

export default OverviewTab;
