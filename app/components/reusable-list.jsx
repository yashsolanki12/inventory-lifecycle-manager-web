import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import SearchIcon from "@mui/icons-material/Search";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import useInventoryData from "../hooks/useInventoryData";
import NoDataFound from "./no-data-found";
import {
  ReusableListSkeleton,
  PaginationSkeleton,
} from "../ui/skeleton-loader/reusable-list-skeleton";
import { MIN_SEARCH_CHARS } from "../utils/config/constants";

const ReusableList = ({
  fetchFn,
  queryKey,
  columns = [],
  actions = null,
  searchPlaceholder = "Search...",
  sortOptions = [],
  defaultSort = "",
  filters = [],
  defaultLimit = 10,
  paginationText = "items",
  handleProductStatus,
  selectable = false,
  selectedIds = [],
  onToggleSelect,
  onToggleSelectAll,
  hideSearch = false,
  maxHeight = "calc(100vh - 300px)",
  enabled = true,
}) => {
  const allColumns = actions
    ? [
        ...columns,
        {
          key: "actions",
          label: "Actions",
          skeletonWidth: 70,
          render: actions,
        },
      ]
    : columns;
  const [search, setSearch] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");
  const [sort, setSort] = React.useState(defaultSort);
  const [filterValues, setFilterValues] = React.useState(() => {
    const initial = {};
    filters.forEach((f) => {
      initial[f.param] = f.defaultValue || "";
    });
    return initial;
  });
  const [page, setPage] = React.useState(1);
  const tableRef = React.useRef(null);

  React.useEffect(() => {
    if (tableRef.current)
      tableRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (search.length === 0 || search.length >= MIN_SEARCH_CHARS) {
        setDebouncedSearch(search);
        setPage(1);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  React.useEffect(() => {
    setPage(1);
  }, [sort, filterValues]);

  const filterParams = {};
  filters.forEach((f) => {
    if (filterValues[f.param]) {
      filterParams[f.param] = filterValues[f.param];
    }
  });

  const params = {
    page,
    limit: defaultLimit,
    ...(debouncedSearch && { search: debouncedSearch }),
    ...(sort && { sort }),
    ...filterParams,
  };

  const filterKey = filters.map((f) => filterValues[f.param]).join(",");

  const {
    data: responseData,
    isLoading,
    isFetching,
  } = useInventoryData(
    [queryKey, page, debouncedSearch, sort, filterKey],
    () => fetchFn(params),
    null,
    { enabled: enabled },
  );

  const items = responseData?.data?.items ?? [];
  const pagination = responseData?.data?.pagination ?? {};
  const {
    total = 0,
    totalPages = 0,
    hasNextPage = false,
    hasPreviousPage = false,
  } = pagination;

  const isInitialLoading = isLoading;
  const isReloading = isFetching && !isLoading;
  const hasActiveFilters =
    search ||
    sort !== defaultSort ||
    filters.some((f) => filterValues[f.param] !== (f.defaultValue || "")) ||
    page > 1;
  const hasError = search.length > 0 && search.length < MIN_SEARCH_CHARS;

  const handleClear = () => {
    setSearch("");
    setDebouncedSearch("");
    setSort(defaultSort);
    const resetFilters = {};
    filters.forEach((f) => {
      resetFilters[f.param] = f.defaultValue || "";
    });
    setFilterValues(resetFilters);
    setPage(1);
  };

  const handleFilterChange = (param, value) => {
    setFilterValues((prev) => ({ ...prev, [param]: value }));
  };

  const handleSort = (field) => {
    if (!field) return;
    const ascending = field;
    const descending = `-${field}`;
    if (sort === ascending) {
      setSort(descending);
    } else if (sort === descending) {
      setSort(ascending);
    } else {
      setSort(ascending);
    }
  };

  const getSortIcon = (field) => {
    if (!field) return null;
    if (sort === field)
      return <KeyboardArrowUpIcon sx={{ fontSize: 16, color: "#008060" }} />;
    if (sort === `-${field}`)
      return <KeyboardArrowDownIcon sx={{ fontSize: 16, color: "#9ca3af" }} />;
    return <UnfoldMoreIcon sx={{ fontSize: 16, color: "#9ca3af" }} />;
  };

  const tableWrapper = (content) => (
    <Box
      ref={tableRef}
      sx={{
        flex: 1,
        minHeight: 0,
        maxHeight: maxHeight,
        overflowY: "auto",
        borderRadius: "8px",
        "&::-webkit-scrollbar": { width: 6 },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#d1d5db",
          borderRadius: 3,
        },
        "&::-webkit-scrollbar-track": { backgroundColor: "#f9fafb" },
      }}
    >
      {content}
    </Box>
  );

  const renderEmpty = () => <NoDataFound />;

  const renderPagination = () => (
    <>
      {totalPages > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
            pt: 2,
            borderTop: "1px solid #ececec",
          }}
        >
          <Typography sx={{ fontSize: 13, color: "#6b7280" }}>
            Showing {Math.min((page - 1) * defaultLimit + 1, total)} to{" "}
            {Math.min(page * defaultLimit, total)} of {total} {paginationText}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              size="small"
              disabled={!hasPreviousPage}
              onClick={() => setPage((p) => p - 1)}
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
              disabled={!hasNextPage}
              onClick={() => setPage((p) => p + 1)}
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
      )}
    </>
  );

  const renderTable = () =>
    tableWrapper(
      <Box component="table" sx={{ width: "100%", borderCollapse: "collapse" }}>
        <Box
          component="thead"
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            backgroundColor: "#FCFDFD",
          }}
        >
          <Box component="tr">
            {selectable && (
              <Box
                component="th"
                sx={{
                  textAlign: "left",
                  py: 1.5,
                  px: 2,
                  fontWeight: 600,
                  fontSize: 14,
                  color: "#6b7280",
                  borderBottom: "2px solid #eceef1",
                  width: 48,
                }}
              >
                <Checkbox
                  size="small"
                  checked={
                    items.length > 0 &&
                    items.every((item) => selectedIds.includes(item.id))
                  }
                  indeterminate={
                    items.some((item) => selectedIds.includes(item.id)) &&
                    !items.every((item) => selectedIds.includes(item.id))
                  }
                  onChange={(e) =>
                    onToggleSelectAll &&
                    onToggleSelectAll(e.target.checked, items)
                  }
                  sx={{ p: 0 }}
                />
              </Box>
            )}
            {allColumns.map((col) => (
              <Box
                key={col.key}
                component="th"
                sx={{
                  textAlign: "left",
                  py: 1.5,
                  px: 2,
                  fontWeight: 600,
                  fontSize: 14,
                  color: "#6b7280",
                  borderBottom: "2px solid #eceef1",
                  cursor: col.sortable ? "pointer" : "default",
                  userSelect: "none",
                  whiteSpace: "nowrap",
                  "&:hover": col.sortable ? { color: "#374151" } : {},
                }}
                onClick={() =>
                  col.sortable && handleSort(col.sortField || col.key)
                }
              >
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  {col.label}
                  {col.sortable && getSortIcon(col.sortField || col.key)}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Box component="tbody">
          {items.map((item, idx) => (
            <Box
              component="tr"
              key={item.id || idx}
              sx={{
                borderBottom: "1px solid #ececec",
                "&:hover": { backgroundColor: "#f9fafb" },
              }}
            >
              {selectable && (
                <Box
                  component="td"
                  sx={{
                    py: 1.2,
                    px: 2,
                    fontSize: 14,
                    verticalAlign: "middle",
                    width: 48,
                  }}
                >
                  <Checkbox
                    size="small"
                    checked={selectedIds.includes(item.id)}
                    onChange={() => onToggleSelect && onToggleSelect(item.id)}
                    sx={{ p: 0 }}
                  />
                </Box>
              )}
              {allColumns.map((col) => (
                <Box
                  component="td"
                  key={col.key}
                  sx={{ py: 1.2, px: 2, fontSize: 14, verticalAlign: "middle" }}
                >
                  {col.render ? col.render(item, idx) : item[col.key]}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>,
    );

  return (
    <Card
      sx={{
        borderRadius: "14px",
        border: "1px solid #ececec",
        boxShadow: "0 8px 24px rgba(0,0,0,.04)",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
      }}
    >
      <CardContent
        sx={{
          p: "24px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: hideSearch ? "end" : "space-between",
            alignItems: "center",
            mb: 3,
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          {!hideSearch && (
            <TextField
              size="small"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                minWidth: 280,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  backgroundColor: "#ffffff",
                  fontSize: 14,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#d1d5db",
                },
              }}

              helperText={
                hasError
                  ? `Min ${MIN_SEARCH_CHARS} characters to search`
                  : undefined
              }
              FormHelperTextProps={{
                sx: {
                  fontSize: 11,
                  position: "absolute",
                  bottom: "-20px",
                  left: 0,
                  color: hasError ? "error.main" : "#9ca3af",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#9ca3af", fontSize: 20 }} />
                  </InputAdornment>
                ),
                endAdornment: search ? (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => setSearch("")}
                      sx={{ p: 0.5 }}
                    >
                      <CloseIcon sx={{ fontSize: 16, color: "#9ca3af" }} />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              }}
            />
          )}
          <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
            {filters.map((f) => (
              <Select
                key={f.param}
                size="small"
                value={filterValues[f.param] || ""}
                onChange={(e) => {
                  handleFilterChange(f.param, e.target.value);
                  if (handleProductStatus) handleProductStatus(e.target.value);
                }}
                displayEmpty
                sx={{
                  minWidth: 140,
                  borderRadius: "8px",
                  fontSize: 14,
                  backgroundColor: "#ffffff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#e5e7eb",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#d1d5db",
                  },
                }}
              >
                <MenuItem value="" disabled>
                  <Typography sx={{ fontSize: 14, color: "#00040a" }}>
                    All {f.label}
                  </Typography>
                </MenuItem>
                {f.options.map((opt) => (
                  <MenuItem
                    key={opt.value}
                    value={opt.value}
                    sx={{ fontSize: 14 }}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            ))}

            {sortOptions.length > 0 && (
              <Select
                size="small"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                sx={{
                  minWidth: 160,
                  borderRadius: "8px",
                  fontSize: 14,
                  backgroundColor: "#ffffff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#e5e7eb",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#d1d5db",
                  },
                }}
              >
                <MenuItem value="" disabled>
                  <Typography sx={{ fontSize: 14, color: "#6b7280" }}>
                    Default Sort
                  </Typography>
                </MenuItem>
                {sortOptions.map((opt) => (
                  <MenuItem
                    key={opt.value}
                    value={opt.value}
                    sx={{ fontSize: 14 }}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            )}
            {hasActiveFilters && (
              <IconButton
                size="small"
                onClick={handleClear}
                sx={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  px: 1,
                  color: "#6b7280",
                  fontSize: 12,
                  "&:hover": {
                    backgroundColor: "#ffebee",
                    borderColor: "#d1d5db",
                  },
                }}
              >
                <CloseIcon sx={{ fontSize: 16, mr: 0.5 }} />
                <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                  Clear
                </Typography>
              </IconButton>
            )}
          </Box>
        </Box>

        {isInitialLoading ? (
          <>
            <ReusableListSkeleton
              columns={allColumns}
              skeletonCount={defaultLimit}
            />
            <PaginationSkeleton />
          </>
        ) : items.length === 0 && !isReloading ? (
          renderEmpty()
        ) : (
          <>
            {isReloading ? (
              <ReusableListSkeleton
                columns={allColumns}
                skeletonCount={defaultLimit}
              />
            ) : (
              renderTable()
            )}
            {total > 0 && renderPagination()}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ReusableList;
