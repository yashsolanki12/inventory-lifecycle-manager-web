import { authenticate } from "../shopify.server";
import { InventorySnapshots } from "../db.server";

export const action = async ({ request }) => {
  const { shop, payload, topic } = await authenticate.webhook(request);

  console.log(`Received ${topic} webhook for ${shop}`);

  if (payload && payload.line_items) {
    const now = new Date();

    // Update lastSoldAt for all variants in the order
    for (const item of payload.line_items) {
      if (item.variant_id) {
        await InventorySnapshots.updateOne(
          { shopId: shop, variantId: item.variant_id.toString() },
          { $set: { lastSoldAt: now } }
        );
      }
    }
  }

  return new Response();
};
