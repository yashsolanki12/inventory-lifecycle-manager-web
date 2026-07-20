import { useAppBridge } from "@shopify/app-bridge-react";

export function useCurrentShopDomain() {
  try {
    const app = useAppBridge();
    return app?.config?.shop || null;
  } catch {
    return null;
  }
}
