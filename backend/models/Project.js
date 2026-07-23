const mongoose = require("mongoose");

const projectImageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  caption: { type: String, default: "" },
}, { _id: true });

const projectCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  images: [projectImageSchema],
}, { _id: true });

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  client: { type: String, default: "" },
  location: { type: String, default: "" },
  year: { type: Number },
  description: { type: String, required: true },
  challenge: { type: String, default: "" },
  solution: { type: String, default: "" },
  scope: { type: String, default: "" },
  results: { type: String, default: "" },
  coverImageUrl: { type: String, required: true },
  productCategories: [{ type: String }],
  categories: [projectCategorySchema],
}, { timestamps: true });

projectSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Project", projectSchema);
