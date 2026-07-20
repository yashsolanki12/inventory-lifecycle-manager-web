import { authenticate } from "../shopify.server";

export const action = async ({ request }) => {
  const {  topic, shop } = await authenticate.webhook(request);

  console.log(`Received ${topic} webhook for ${shop}`);
  
  // Session scopes are managed by MongoDBSessionStorage automatically.
  // No manual update needed here.

  return new Response();
};
