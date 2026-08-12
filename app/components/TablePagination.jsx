import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const TablePagination = ({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
  paginationText,
}) => {
  const start = Math.min((page - 1) * limit + 1, total);
  const end = Math.min(page * limit, total);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        // mt: 3,
        // pt: 2,
        // mb: 2,
        // px: 2,
        p: 2,
        borderTop: "1px solid #ececec",
      }}
    >
      <Typography sx={{ fontSize: 13, color: "#6b7280" }}>
        Showing {start} to {end} of {total} {paginationText}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton
          size="small"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          sx={{
            border: "1px solid #e5e7eb",
            borderRadius: "6px",
            "&:hover": { backgroundColor: "#0056b3", color: "white" },
            "&.Mui-disabled": { opacity: 0.4 },
          }}
        >
          <ChevronLeftIcon sx={{ fontSize: 18 }} />
        </IconButton>
        <Typography
          sx={{ fontSize: 13, color: "#374151", fontWeight: 500, px: 1 }}
        >
          {page} / {totalPages}
        </Typography>
        <IconButton
          size="small"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          sx={{
            border: "1px solid #e5e7eb",
            borderRadius: "6px",
            "&:hover": { backgroundColor: "#0056b3", color: "white" },
            "&.Mui-disabled": { opacity: 0.4 },
          }}
        >
          <ChevronRightIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TablePagination;
