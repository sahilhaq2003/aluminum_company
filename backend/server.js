require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const publicRoutes = require("./routes/public");
const adminRoutes = require("./routes/admin");
const uploadRoutes = require("./routes/upload");
const imageRoutes = require("./routes/images");
const { authenticateToken } = require("./middleware/auth");

const app = express();

const allowedOrigins = (process.env.CORS_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean);

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.length === 0 || (origin && allowedOrigins.includes(origin))) {
    res.setHeader("Access-Control-Allow-Origin", origin || allowedOrigins[0] || "*");
  } else if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    const MONGO_URI = process.env.MONGODB_URI;
    const MONGO_DB = process.env.MONGODB_DB || "alumtech";
    cached.promise = mongoose.connect(MONGO_URI, { dbName: MONGO_DB }).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("MongoDB connection error:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.use("/api/public", publicRoutes);
app.use("/api/admin", authenticateToken, adminRoutes);
app.use("/api/admin/uploads", authenticateToken, uploadRoutes);
app.use("/api/images", imageRoutes);

app.get("/", (req, res) => {
  res.json({ status: "AlumTech API is running" });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

module.exports = app;
