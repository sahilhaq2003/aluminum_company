require("dotenv").config();
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGODB_URI;
const MONGO_DB = process.env.MONGODB_DB || "alumtech";

async function reset() {
  await mongoose.connect(MONGO_URI, { dbName: MONGO_DB });
  console.log("Connected to MongoDB Atlas");

  const db = mongoose.connection.db;
  const collections = ["projects", "products", "productcategories", "images", "users", "contactmessages"];
  
  for (const name of collections) {
    const result = await db.collection(name).deleteMany({});
    console.log(`  Dropped ${name}: ${result.deletedCount} documents`);
  }

  console.log("Database cleared. Run 'npm run seed' next.");
  await mongoose.disconnect();
}

reset().catch((err) => {
  console.error("Reset error:", err);
  process.exit(1);
});
