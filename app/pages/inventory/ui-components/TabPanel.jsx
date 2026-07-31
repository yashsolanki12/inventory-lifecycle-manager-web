import Box from "@mui/material/Box";

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box
          sx={{
            py: 1,
            maxHeight: "calc(100vh - 230px)",
            overflowY: "auto",
            "&::-webkit-scrollbar": { width: 4 },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#d1d5db",
              borderRadius: 3,
            },
            "&::-webkit-scrollbar-track": { backgroundColor: "#f9fafb" },
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
};

export default TabPanel;
