import React from "react";
import { useCurrentShopDomain } from "../utils/helper";

const useAsyncOptions = (fetchFn, { enabled = true, limit = 10 } = {}) => {
  const shopDomain = useCurrentShopDomain();
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const pageRef = React.useRef(1);
  const isLoadingMore = React.useRef(false);
  const hasMoreRef = React.useRef(true);
  const hasInitialized = React.useRef(false);

  const fetchPage = React.useCallback(
    async (page) => {
      if (!shopDomain || !enabled) return null;
      try {
        const res = await fetchFn(shopDomain, { page, limit });
        const items = res?.data?.items ?? [];
        const pagination = res?.data?.pagination;
        return { items, pagination };
      } catch (err) {
        console.error("Error fetching options:", err);
        return null;
      }
    },
    [shopDomain, enabled, fetchFn, limit],
  );

  const loadInitial = React.useCallback(async () => {
    setLoading(true);
    pageRef.current = 1;
    hasMoreRef.current = true;
    setHasMore(true);
    const result = await fetchPage(1);
    if (result) {
      setOptions(result.items);
      const nextHasMore = result.pagination?.hasNextPage ?? false;
      hasMoreRef.current = nextHasMore;
      setHasMore(nextHasMore);
    }
    setLoading(false);
  }, [fetchPage]);

  const loadMore = React.useCallback(async () => {
    if (isLoadingMore.current || !hasMoreRef.current) return;
    isLoadingMore.current = true;
    const nextPage = pageRef.current + 1;
    const result = await fetchPage(nextPage);
    if (result) {
      setOptions((prev) => [...prev, ...result.items]);
      const nextHasMore = result.pagination?.hasNextPage ?? false;
      hasMoreRef.current = nextHasMore;
      setHasMore(nextHasMore);
      pageRef.current = nextPage;
    }
    isLoadingMore.current = false;
  }, [fetchPage]);

  React.useEffect(() => {
    if (enabled && !hasInitialized.current) {
      hasInitialized.current = true;
      loadInitial();
    }
  }, [enabled, loadInitial]);

  return { options, loading, hasMore, loadMore, loadInitial };
};

export default useAsyncOptions;
