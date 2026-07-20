import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { backendGet, backendPost, backendPut, backendDelete } from "./backendClient";

export function useBackendQuery(key, queryFn, options = {}) {
  return useQuery({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn,
    ...options,
  });
}

export function useBackendMutation(mutationFn, options = {}) {
  const qc = useQueryClient();
  const invalidateKeys = options.invalidateKeys || [];

  return useMutation({
    mutationFn,
    onSuccess: () => {
      invalidateKeys.forEach((key) => {
        qc.invalidateQueries({ queryKey: Array.isArray(key) ? key : [key] });
      });
    },
    ...options,
  });
}

export function useRules(shop, options = {}) {
  return useBackendQuery(
    ["rules", shop],
    () => backendGet("/api/rules/rules", { headers: { "x-shopify-shop-domain": shop } }),
    { enabled: !!shop, ...options }
  );
}

export function useCreateRule(shop) {
  return useBackendMutation(
    (rule) =>
      backendPost(
        "/api/rules/rules",
        rule,
        { headers: { "x-shopify-shop-domain": shop } }
      ),
    {
      invalidateKeys: [["rules", shop]],
    }
  );
}

export function useUpdateRule(shop) {
  return useBackendMutation(
    ({ id, rule }) =>
      backendPut(
        `/api/rules/rules/${id}`,
        rule,
        { headers: { "x-shopify-shop-domain": shop } }
      ),
    {
      invalidateKeys: [["rules", shop]],
    }
  );
}

export function useDeleteRule(shop) {
  return useBackendMutation(
    (id) =>
      backendDelete(`/api/rules/rules/${id}`, {
        headers: { "x-shopify-shop-domain": shop },
      }),
    {
      invalidateKeys: [["rules", shop]],
    }
  );
}

export function useInventoryAging(shop, options = {}) {
  return useBackendQuery(
    ["inventory", "aging", shop],
    () =>
      backendGet("/api/inventory/aging", {
        headers: { "x-shopify-shop-domain": shop },
      }),
    { enabled: !!shop, ...options }
  );
}

export function useInventoryAlerts(shop, queryOptions = {}, options = {}) {
  return useBackendQuery(
    ["inventory", "alerts", shop, queryOptions],
    () =>
      backendGet("/api/inventory/alerts", {
        headers: { "x-shopify-shop-domain": shop },
        params: queryOptions,
      }),
    { enabled: !!shop, ...options }
  );
}

export function usePreviewScan(shop, ruleId, options = {}) {
  return useBackendQuery(
    ["scan", "preview", shop, ruleId],
    () =>
      backendPost(`/api/products/scanner/preview?ruleId=${ruleId}`, {}, {
        headers: { "x-shopify-shop-domain": shop },
      }),
    { enabled: !!shop && !!ruleId, ...options }
  );
}

export function useRunScan(shop) {
  return useBackendMutation(
    (ruleId) =>
      backendPost(
        "/api/products/scan/run",
        { ruleId },
        { headers: { "x-shopify-shop-domain": shop } }
      ),
    {
      invalidateKeys: [
        ["rules", shop],
        ["inventory", "aging", shop],
        ["scan", "preview", shop],
      ],
    }
  );
}

export function useProducts(shop, options = {}) {
  return useBackendQuery(
    ["products", shop],
    () =>
      backendGet("/api/products/products", {
        headers: { "x-shopify-shop-domain": shop },
      }),
    { enabled: !!shop, ...options }
  );
}

export function useRule(shop, id, options = {}) {
  return useBackendQuery(
    ["rule", shop, id],
    () =>
      backendGet(`/api/rules/rules/${id}`, {
        headers: { "x-shopify-shop-domain": shop },
      }),
    { enabled: !!shop && !!id, ...options }
  );
}

export function useInventorySnapshots(shop, options = {}) {
  return useBackendQuery(
    ["inventory", "snapshots", shop],
    () =>
      backendGet("/api/inventory/snapshots", {
        headers: { "x-shopify-shop-domain": shop },
      }),
    { enabled: !!shop, ...options }
  );
}


