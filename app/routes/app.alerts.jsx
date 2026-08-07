import { Outlet } from "react-router";
import Box from "@mui/material/Box";

export default function AlertsLayout() {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Outlet />
    </Box>
  );
}
