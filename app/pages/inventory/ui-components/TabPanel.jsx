import Box from "@mui/material/Box";

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ py: 1 }}>{children}</Box>}
    </div>
  );
};

export default TabPanel;
