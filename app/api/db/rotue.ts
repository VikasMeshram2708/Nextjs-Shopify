import { MongoClient } from "mongodb";

const { NEXT_PUBLIC_MONGO_URI } = process.env;

if (!NEXT_PUBLIC_MONGO_URI) {
  console.log("Please Provide a URI...");
}

const client = new MongoClient(NEXT_PUBLIC_MONGO_URI!);

export const db = client.db("Next-Shopfiy");
