const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: String, default: "" },
  stock: { type: Number, default: 0 },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "ProductCategory", required: true },
  categoryName: { type: String, required: true },
}, { timestamps: true });

productSchema.index({ createdAt: -1 });
productSchema.index({ categoryId: 1 });

module.exports = mongoose.model("Product", productSchema);
