const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  data: { type: Buffer, required: function () { return !this.externalUrl; } },
  filename: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number },
  externalUrl: { type: String },
}, { timestamps: true });

imageSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Image", imageSchema);
