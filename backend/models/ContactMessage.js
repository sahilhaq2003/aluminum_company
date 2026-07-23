const mongoose = require("mongoose");

const contactMessageSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: "" },
  company: { type: String, default: "" },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
}, { timestamps: true });

contactMessageSchema.index({ createdAt: -1 });

module.exports = mongoose.model("ContactMessage", contactMessageSchema);
