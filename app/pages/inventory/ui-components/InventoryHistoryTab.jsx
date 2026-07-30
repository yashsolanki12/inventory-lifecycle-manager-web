import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const InventoryHistoryTab = ({ product }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography sx={{ color: "#9ca3af", fontSize: 14 }}>
        Inventory history will be displayed here.
      </Typography>
    </Box>
  );
};

export default InventoryHistoryTab;
