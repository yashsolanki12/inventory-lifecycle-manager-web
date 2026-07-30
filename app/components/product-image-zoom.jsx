import React from "react";
import Box from "@mui/material/Box";
import { ZOOM_FACTOR } from "../utils/helper";

const ProductImageZoom = ({ imageUrl, altText, children }) => {
  const [zoom, setZoom] = React.useState({ active: false, x: 50, y: 50 });
  const containerRef = React.useRef(null);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoom({
      active: true,
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y)),
    });
  };

  const handleMouseLeave = () => {
    setZoom((prev) => ({ ...prev, active: false }));
  };

  return (
    <Box sx={{ display: "flex", gap: 2, flex: 1, position: "relative" }}>
      <Box
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        sx={{
          width: 360,
          maxHeight: 320,
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: "#f9fafb",
          border: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          cursor: "crosshair",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          component="img"
          src={imageUrl}
          alt={altText}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            p: 2,
            userSelect: "none",
            pointerEvents: "none",
          }}
        />
      </Box>

      {children}

      {zoom.active && (
        <Box
          sx={{
            position: "absolute",
            left: 376,
            top: 0,
            width: "calc(100% - 376px)",
            height: "100%",
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid #e5e7eb",
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: `${ZOOM_FACTOR * 100}%`,
            backgroundPosition: `${zoom.x}% ${zoom.y}%`,
            backgroundRepeat: "no-repeat",
            zIndex: 10,
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          }}
        />
      )}
    </Box>
  );
};

export default ProductImageZoom;
