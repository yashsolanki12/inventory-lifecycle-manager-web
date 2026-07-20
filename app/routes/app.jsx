/* global process */
import { Outlet, useLoaderData, useRouteError } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { AppProvider as ShopifyAppProvider } from "@shopify/shopify-app-react-router/react";
import { AppProvider as PolarisAppProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import { authenticate } from "../shopify.server";

const queryClient = new QueryClient();

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  return {
    apiKey:
      typeof process !== "undefined" && process?.env?.SHOPIFY_API_KEY
        ? process.env.SHOPIFY_API_KEY
        : "",
    shop: session.shop,
  };
};

export default function App() {
  const { apiKey, shop } = useLoaderData();

  return (
    <ShopifyAppProvider embedded apiKey={apiKey}>
      <PolarisAppProvider i18n={enTranslations}>
        <QueryClientProvider client={queryClient}>
          <ShopDomainProvider shop={shop}>
            <s-app-nav>
              <s-link href="/app">Home</s-link>
            </s-app-nav>
            <Outlet />
          </ShopDomainProvider>
        </QueryClientProvider>
      </PolarisAppProvider>
    </ShopifyAppProvider>
  );
}

function ShopDomainProvider({ shop, children }) {
  if (typeof window !== "undefined" && shop) {
    window.__SHOP_DOMAIN__ = shop;
  }
  return children;
}

export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
