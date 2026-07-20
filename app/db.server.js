import { MongoClient } from "mongodb";

let client;
let dbPromise;

async function getClient() {
  if (client) return client;

  client = new MongoClient(process.env.DATABASE_URL);
  await client.connect();
  return client;
}

async function getDb() {
  if (dbPromise) return dbPromise;

  dbPromise = (async () => {
    const c = await getClient();
    const database = c.db(process.env.DB_NAME || "inventory-lifecycle-manager");

    const existingCollections = (await database.listCollections().toArray()).map(c => c.name);

    const required = ["archiverules", "archivelogs", "inventorysnapshots", "inventorymovements"];
    for (const name of required) {
      if (!existingCollections.includes(name)) {
        await database.createCollection(name);
        console.log(`[DB] Created collection: ${name}`);
      }
    }

    return database;
  })();

  return dbPromise;
}

function makeCollection(name) {
  function chain(findPromise) {
    let promise = findPromise;
    return {
      sort(...args) {
        promise = promise.then(c => c.sort(...args));
        return this;
      },
      toArray() {
        return promise.then(c => c.toArray());
      },
    };
  }

  return {
    find(...args) {
      return chain(getDb().then(d => d.collection(name).find(...args)));
    },
    findOne(...args) {
      return getDb().then(d => d.collection(name).findOne(...args));
    },
    insertOne(...args) {
      return getDb().then(d => d.collection(name).insertOne(...args));
    },
    updateOne(...args) {
      return getDb().then(d => d.collection(name).updateOne(...args));
    },
    deleteOne(...args) {
      return getDb().then(d => d.collection(name).deleteOne(...args));
    },
  };
}

export const ArchiveRules = makeCollection("archiverules");
export const ArchiveLogs = makeCollection("archivelogs");
export const InventorySnapshots = makeCollection("inventorysnapshots");
export const InventoryMovements = makeCollection("inventorymovements");

export default getDb();
