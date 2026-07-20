import { authenticate } from "../shopify.server";
import { InventorySnapshots, InventoryMovements } from "../db.server";

export const action = async ({ request }) => {
  const { shop, payload, topic } = await authenticate.webhook(request);

  console.log(`Received ${topic} webhook for ${shop}`);

  if (payload) {
    const { inventory_item_id, available } = payload;
    const variantId = inventory_item_id.toString();

    // Check if snapshot already exists
    const existing = await InventorySnapshots.findOne({ shopId: shop, variantId });

    if (existing) {
      await InventorySnapshots.updateOne(
        { shopId: shop, variantId },
        { $set: { quantity: available || 0, updatedAt: new Date() } }
      );
    } else {
      await InventorySnapshots.insertOne({
        shopId: shop,
        productId: "unknown_product",
        variantId,
        quantity: available || 0,
        firstStockedAt: new Date(),
        lastSoldAt: null,
      });
    }

    // Log the movement
    await InventoryMovements.insertOne({
      shopId: shop,
      variantId,
      changeType: "update",
      quantity: available || 0,
      createdAt: new Date(),
    });
  }

  return new Response();
};
