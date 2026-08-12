import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import useAsyncOptions from "../hooks/useAsyncOptions";
import { MenuProps } from "../utils/helper";

const AsyncMultiSelectTags = ({
  label,
  value = [],
  onChange,
  fetchFn,
  error,
  helperText,
}) => {
  const { options, loading, hasMore, loadMore } = useAsyncOptions(fetchFn);
  const loadMoreRef = React.useRef(loadMore);
  loadMoreRef.current = loadMore;
  const hasMoreRef = React.useRef(hasMore);
  hasMoreRef.current = hasMore;
  const cleanupRef = React.useRef(null);

  const handleChange = (event) => {
    const {
      target: { value: newValue },
    } = event;
    onChange(typeof newValue === "string" ? newValue.split(",") : newValue);
  };

  const handleDelete = (tagToDelete) => {
    onChange(value.filter((v) => v !== tagToDelete));
  };

  const handleOpen = () => {
    if (cleanupRef.current) cleanupRef.current();
    cleanupRef.current = null;

    requestAnimationFrame(() => {
      const listbox = document.querySelector(".MuiMenu-list");
      if (!listbox) return;

      let scrollContainer = listbox;
      let el = listbox;
      while (el) {
        const style = window.getComputedStyle(el);
        if (style.overflowY === "auto" || style.overflowY === "scroll") {
          scrollContainer = el;
          break;
        }
        el = el.parentElement;
      }

      const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
        if (
          scrollHeight - scrollTop - clientHeight < 30 &&
          hasMoreRef.current
        ) {
          loadMoreRef.current();
        }
      };

      scrollContainer.addEventListener("scroll", handleScroll, {
        passive: true,
      });
      cleanupRef.current = () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
      };
    });
  };

  const handleClose = () => {
    if (cleanupRef.current) cleanupRef.current();
    cleanupRef.current = null;
  };

  React.useEffect(() => {
    return () => {
      if (cleanupRef.current) cleanupRef.current();
    };
  }, []);

  return (
    <FormControl
      fullWidth
      error={error}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
          fontSize: 14,
        },
        "& .MuiInputLabel-root": {
          fontSize: 14,
        },
      }}
    >
      <InputLabel id="excluded-tags-label">{label}</InputLabel>
      <Select
        labelId="excluded-tags-label"
        id="excluded-tags-select"
        multiple
        value={value}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) =>
          loading
            ? "Loading..."
            : selected.length === 0
              ? "None"
              : selected.join(", ")
        }
        MenuProps={MenuProps}
        onOpen={handleOpen}
        onClose={handleClose}
        endAdornment={
          loading ? <CircularProgress size={16} sx={{ mr: 2 }} /> : null
        }
        fullWidth
      >
        {options.map((option) => {
          const label =
            typeof option === "string"
              ? option
              : option?.name || option?.tag || String(option);
          const val =
            typeof option === "string"
              ? option
              : option?.name || option?.tag || String(option);
          return (
            <MenuItem key={label} value={val}>
              <Checkbox checked={value.indexOf(val) > -1} />
              <ListItemText primary={label} />
            </MenuItem>
          );
        })}
      </Select>
      {value.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
          {value.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              onDelete={() => handleDelete(tag)}
              sx={{
                borderRadius: "6px",
                wordBreak: "break-word",
              }}
            />
          ))}
        </Box>
      )}
      {helperText && (
        <Typography
          variant="caption"
          sx={{ color: error ? "#d32f2f" : "#6b7280", mt: 0.5, ml: 1.5 }}
        >
          {helperText}
        </Typography>
      )}
    </FormControl>
  );
};

export default AsyncMultiSelectTags;
