import { boundary } from "@shopify/shopify-app-react-router/server";
import shopify, { sessionStorage } from "../shopify.server";

export const loader = async ({ request }) => {
  const { session } = await shopify.authenticate.admin(request);

  if (session) {
    try {
      const client = new shopify.api.clients.Rest({ session });
      const response = await client.get({ path: "shop" });
      const shopData = response.body.shop;

      if (shopData) {
        const fullName = shopData.shop_owner || "";
        const nameParts = fullName.trim().split(/\s+/);
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        await sessionStorage.updateShopInfo(session.id, {
          firstName,
          lastName,
          email: shopData.email || "",
          accountOwner: true,
          locale: shopData.locale || "",
          collaborator: false,
          emailVerified: true,
        });
      }
    } catch (err) {
      console.error("[Auth] Failed to fetch and store shop info:", err);
    }
  }

  return null;
};

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
