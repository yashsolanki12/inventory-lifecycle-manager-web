import React from "react";
import { useQuery } from "@tanstack/react-query";

export const useInventoryData = (
  queryKey,
  queryFn,
  setSnackBar,
  options = {},
) => {
  const {
    enabled = true,
    staleTime,
    showSuccessToast = false,
    retry = false,
  } = options;

  // Call useQuery at the top level
  const { error, data, isLoading, isFetching, refetch, isSuccess } = useQuery({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn: queryFn,
    enabled: enabled,
    staleTime: staleTime,
    refetchOnMount: true,
    retry: retry,
  });

  const errorMessage = error?.message;
  React.useEffect(() => {
    if (errorMessage && setSnackBar) {
      setSnackBar((prev) => {
        if (prev.message === errorMessage && prev.open) return prev;

        return {
          open: true,
          message: errorMessage,
          severity: "error",
        };
      });
    }
  }, [errorMessage, setSnackBar]);

  // Show success toast when data is successfully fetched (only if setSnackBar is provided)
  React.useEffect(() => {
    if (isSuccess && setSnackBar && data?.message && showSuccessToast) {
      // Add small delay to avoid overlapping with mutation toasts
      setTimeout(() => {
        setSnackBar((prev) => {
          if (prev.message === data.message && prev.open) return prev;

          return {
            open: true,
            message: data.message,
            severity: "success",
          };
        });
      }, 500);
    }
  }, [isSuccess, setSnackBar, data, showSuccessToast]);

  return { error, data, isLoading, isFetching, refetch };
};
export default useInventoryData;
