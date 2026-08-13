import Box from "@mui/material/Box";
import { Outlet } from "react-router";

export default function InventoryLayout() {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Outlet />
    </Box>
  );
}
