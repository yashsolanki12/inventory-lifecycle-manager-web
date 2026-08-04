import React from "react";
import Box from "@mui/material/Box";

const TabPanel = ({ children, value, index }) => {
  const scrollRef = React.useRef(null);
  const prevChildrenRef = React.useRef(children);

  React.useEffect(() => {
    if (scrollRef.current && prevChildrenRef.current !== children) {
      const el = scrollRef.current;
      const scrollTop = el.scrollTop;
      requestAnimationFrame(() => {
        if (el) el.scrollTop = scrollTop;
      });
    }
    prevChildrenRef.current = children;
  }, [children]);

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box
          ref={scrollRef}
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
