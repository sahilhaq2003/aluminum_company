const express = require("express");
const multer = require("multer");
const path = require("path");
const Image = require("../models/Image");
const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|svg/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    cb(null, ext && mime);
  },
});

router.post("/", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  try {
    const image = await Image.create({
      data: req.file.buffer,
      filename: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });
    res.status(201).json({ imageId: image._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
