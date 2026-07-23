require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const publicRoutes = require("./routes/public");
const adminRoutes = require("./routes/admin");
const uploadRoutes = require("./routes/upload");
const { authenticateToken } = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: (process.env.CORS_ORIGINS || "http://localhost:5173").split(",").map((s) => s.trim()),
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/public", publicRoutes);
app.use("/api/admin", authenticateToken, adminRoutes);
app.use("/api/admin/uploads", authenticateToken, uploadRoutes);

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

const MONGO_URI = process.env.MONGODB_URI;
const MONGO_DB = process.env.MONGODB_DB || "alumtech";

mongoose
  .connect(MONGO_URI, { dbName: MONGO_DB })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`AlumTech API running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
