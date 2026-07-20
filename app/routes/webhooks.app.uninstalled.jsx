import { authenticate } from "../shopify.server";
import { sessionStorage } from "../shopify.server";

export const action = async ({ request }) => {
  const { shop, session, topic } = await authenticate.webhook(request);

  console.log(`Received ${topic} webhook for ${shop}`);

  // Delete all sessions for this shop from MongoDB when app is uninstalled
  if (session) {
    await sessionStorage.deleteSessions([session.id]);
  }

  return new Response();
};
