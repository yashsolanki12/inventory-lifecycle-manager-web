import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const PlansShimmer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", sm: 600, md: 800 },
        mx: "auto",
        px: { xs: 3, sm: 4 },
        py: { xs: 3, sm: 4 },
        boxSizing: "border-box",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        sx={{ mb: 2, gap: 1 }}
      >
        <Skeleton variant="text" width={120} height={32} />
      </Stack>

      <Card sx={{ borderRadius: "10px", width: "100%" }}>
        <CardContent>
          <Skeleton
            variant="rounded"
            width="100%"
            height={40}
            sx={{ borderRadius: "6px", mb: { xs: 2, sm: 3 } }}
          />

          <Skeleton variant="text" width="70%" height={20} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="40%" height={20} sx={{ mb: 2 }} />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Skeleton
              variant="rounded"
              width={{ xs: "100%", sm: 140 }}
              height={36}
              sx={{ borderRadius: "6px" }}
            />
            <Skeleton
              variant="rounded"
              width={{ xs: "100%", sm: 140 }}
              height={36}
              sx={{ borderRadius: "6px" }}
            />
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PlansShimmer;
