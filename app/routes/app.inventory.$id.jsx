import Box from "@mui/material/Box";
import { useParams } from "react-router";

const InventoryViewPage = () => {
  const { id } = useParams();
  console.log("id", id);
  return <Box sx={{ p: { xs: 2, sm: 3, md: 2 } }}>Hello</Box>;
};
export default InventoryViewPage;
