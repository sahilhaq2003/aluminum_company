const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const Product = require("../models/Product");
const ProductCategory = require("../models/ProductCategory");

router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 }).lean();
    const summaries = projects.map((p) => ({
      id: p._id,
      title: p.title,
      description: p.description,
      coverImageUrl: p.coverImageUrl,
      client: p.client,
      location: p.location,
      year: p.year,
      productCategories: p.productCategories || [],
      categoryName:
        p.categories && p.categories.length > 0
          ? p.categories[0].name
          : "Uncategorized",
    }));
    res.json(summaries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/projects/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).lean();
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json({
      id: project._id,
      title: project.title,
      description: project.description,
      coverImageUrl: project.coverImageUrl,
      client: project.client,
      location: project.location,
      year: project.year,
      challenge: project.challenge,
      solution: project.solution,
      scope: project.scope,
      results: project.results,
      productCategories: project.productCategories || [],
      categories: (project.categories || []).map((cat) => ({
        id: cat._id,
        name: cat.name,
        images: (cat.images || []).map((img) => ({
          id: img._id,
          imageUrl: img.imageUrl,
          caption: img.caption,
        })),
      })),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).lean();
    res.json(
      products.map((p) => ({
        id: p._id,
        name: p.name,
        description: p.description,
        imageUrl: p.imageUrl,
        categoryId: p.categoryId,
        categoryName: p.categoryName,
        price: p.price,
        stock: p.stock,
      }))
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/product-categories", async (req, res) => {
  try {
    const categories = await ProductCategory.find().lean();
    res.json(categories.map((c) => ({ id: c._id, name: c.name })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/contact", async (req, res) => {
  try {
    const ContactMessage = require("../models/ContactMessage");
    const contact = new ContactMessage(req.body);
    await contact.save();
    res.status(201).json({ message: "Contact message submitted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
