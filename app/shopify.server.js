import "@shopify/shopify-app-react-router/adapters/node";
import {
  ApiVersion,
  AppDistribution,
  shopifyApp,
} from "@shopify/shopify-app-react-router/server";
import { MySQLDatetimeSessionStorage } from "./session-storage/mysql-datetime.server";

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: ApiVersion.July26,
  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new MySQLDatetimeSessionStorage(process.env.DATABASE_URL, {
    sessionTableName: "shopify_sessions",
    connectionPoolLimit: 1,
  }),
  distribution: AppDistribution.AppStore,
  billing: {
    Free: {
      amount: 0,
      currencyCode: "USD",
      interval: "EVERY_30_DAYS",
    },
    Starter: {
      amount: 9,
      currencyCode: "USD",
      interval: "EVERY_30_DAYS",
    },
    Pro: {
      amount: 19,
      currencyCode: "USD",
      interval: "EVERY_30_DAYS",
    },
  },
  future: {
    expiringOfflineAccessTokens: true,
    unstable_newEmbeddedAuthStrategy: true,
  },
  ...(process.env.SHOP_CUSTOM_DOMAIN
    ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
    : {}),
});

export default shopify;
export const apiVersion = ApiVersion.July26;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;
