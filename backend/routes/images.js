const express = require("express");
const Image = require("../models/Image");
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ error: "Image not found" });

    if (image.externalUrl) {
      return res.redirect(image.externalUrl);
    }

    res.set("Content-Type", image.mimetype);
    res.set("Cache-Control", "public, max-age=31536000");
    res.send(image.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
