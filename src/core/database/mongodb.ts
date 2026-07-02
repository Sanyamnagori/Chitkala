import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.DATABASE_URL;

let clientPromise: Promise<MongoClient> | null = null;

if (uri) {
  const options = {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  };

  if (process.env.NODE_ENV === "development") {
    let globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
      const client = new MongoClient(uri, options);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    const client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
} else {
  console.warn("WARNING: DATABASE_URL is not set. MongoDB connection is disabled.");
}

export default clientPromise;
