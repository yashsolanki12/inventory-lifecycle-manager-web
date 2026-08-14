import React from "react";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import useAsyncOptions from "../hooks/useAsyncOptions";
import useMergedOptions from "../hooks/useMergedOptions";

const AsyncAutocomplete = ({
  label,
  value,
  onChange,
  fetchFn,
  multiple = false,
  error,
  helperText,
  maxHeight = 250,
}) => {
  const { options, loading, hasMore, loadMore } = useAsyncOptions(fetchFn);
  const [inputValue, setInputValue] = React.useState("");
  const loadMoreRef = React.useRef(loadMore);
  loadMoreRef.current = loadMore;
  const hasMoreRef = React.useRef(hasMore);
  hasMoreRef.current = hasMore;
  const cleanupRef = React.useRef(null);

  const mergedOptions = useMergedOptions(options, value, multiple);

  const handleInputChange = (_, newInputValue) => {
    setInputValue(newInputValue);
  };

  const handleChange = (_, newValue) => {
    onChange(multiple ? newValue : (newValue ?? ""));
  };

  const getSelectedOption = () => {
    if (multiple) {
      return value || [];
    }
    return value || null;
  };

  const handleOpen = () => {
    if (cleanupRef.current) cleanupRef.current();
    cleanupRef.current = null;

    requestAnimationFrame(() => {
      const listbox = document.querySelector(".MuiAutocomplete-listbox");
      if (!listbox) return;

      const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = listbox;
        if (
          scrollHeight - scrollTop - clientHeight < 30 &&
          hasMoreRef.current
        ) {
          loadMoreRef.current();
        }
      };

      listbox.addEventListener("scroll", handleScroll, { passive: true });
      cleanupRef.current = () => {
        listbox.removeEventListener("scroll", handleScroll);
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
    <Autocomplete
      multiple={multiple}
      options={mergedOptions}
      loading={loading}
      value={getSelectedOption()}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onChange={handleChange}
      onOpen={handleOpen}
      onClose={handleClose}
      slotProps={{
        listbox: {
          sx: {
            maxHeight: maxHeight,
            overflowY: "auto",
          },
        },
      }}
      renderTags={
        multiple
          ? (tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip
                  {...getTagProps({ index })}
                  key={option}
                  label={option}
                  size="small"
                  sx={{ borderRadius: "6px" }}
                />
              ))
          : undefined
      }
      renderOption={(props, option) => (
        <li {...props} key={option}>
          {option}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={error}
          helperText={helperText}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              fontSize: 14,
            },
            "& .MuiInputLabel-root": {
              fontSize: 14,
            },
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress size={16} /> : null}
                {params.InputProps?.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default AsyncAutocomplete;
