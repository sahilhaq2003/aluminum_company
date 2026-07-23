const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const Product = require("../models/Product");
const ProductCategory = require("../models/ProductCategory");
const ContactMessage = require("../models/ContactMessage");

router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 }).lean();
    res.json(
      projects.map((p) => ({
        id: p._id,
        title: p.title,
        description: p.description,
        coverImageUrl: p.coverImageUrl,
        client: p.client,
        location: p.location,
        year: p.year,
        challenge: p.challenge,
        solution: p.solution,
        scope: p.scope,
        results: p.results,
        productCategories: p.productCategories || [],
        categories: (p.categories || []).map((cat) => ({
          id: cat._id,
          name: cat.name,
          images: (cat.images || []).map((img) => ({
            id: img._id,
            imageUrl: img.imageUrl,
            caption: img.caption,
          })),
        })),
      }))
    );
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

router.get("/projects/:projectId/project-categories", async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId).lean();
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(
      (project.categories || []).map((cat) => ({
        id: cat._id,
        name: cat.name,
        images: (cat.images || []).map((img) => ({
          id: img._id,
          imageUrl: img.imageUrl,
          caption: img.caption,
        })),
      }))
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/projects", async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/projects/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/projects/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/project-categories", async (req, res) => {
  try {
    const { projectId, name } = req.body;
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ error: "Project not found" });
    const cat = { name, images: [] };
    project.categories.push(cat);
    await project.save();
    const saved = project.categories[project.categories.length - 1];
    res.status(201).json({ id: saved._id, name: saved.name, projectId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/project-images", async (req, res) => {
  try {
    const { categoryId, imageUrl, caption } = req.body;
    const project = await Project.findOne({ "categories._id": categoryId });
    if (!project) return res.status(404).json({ error: "Category not found" });
    const category = project.categories.id(categoryId);
    const image = { imageUrl, caption };
    category.images.push(image);
    await project.save();
    const savedImage = category.images[category.images.length - 1];
    res.status(201).json({
      id: savedImage._id,
      imageUrl: savedImage.imageUrl,
      caption: savedImage.caption,
      categoryId,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/product-categories", async (req, res) => {
  try {
    const category = new ProductCategory({ name: req.body.name });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/products", async (req, res) => {
  try {
    const category = await ProductCategory.findById(req.body.categoryId);
    if (!category) return res.status(404).json({ error: "Category not found" });
    const product = new Product({
      ...req.body,
      categoryName: category.name,
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/products/:id", async (req, res) => {
  try {
    if (req.body.categoryId) {
      const category = await ProductCategory.findById(req.body.categoryId);
      if (category) req.body.categoryName = category.name;
    }
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/product-categories/:id", async (req, res) => {
  try {
    const cat = await ProductCategory.findByIdAndDelete(req.params.id);
    if (!cat) return res.status(404).json({ error: "Category not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/project-categories/:id", async (req, res) => {
  try {
    const project = await Project.findOne({ "categories._id": req.params.id });
    if (!project) return res.status(404).json({ error: "Category not found" });
    project.categories.pull(req.params.id);
    await project.save();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/project-images/:id", async (req, res) => {
  try {
    const project = await Project.findOne({
      "categories.images._id": req.params.id,
    });
    if (!project) return res.status(404).json({ error: "Image not found" });
    for (const cat of project.categories) {
      const img = cat.images.id(req.params.id);
      if (img) {
        cat.images.pull(req.params.id);
        break;
      }
    }
    await project.save();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/contacts", async (req, res) => {
  try {
    const contacts = await ContactMessage.find().sort({ createdAt: -1 }).lean();
    res.json(
      contacts.map((c) => ({
        id: c._id,
        fullName: c.fullName,
        email: c.email,
        phone: c.phone,
        company: c.company,
        subject: c.subject,
        message: c.message,
        read: c.read,
        createdAt: c.createdAt,
      }))
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/contacts/:id/read", async (req, res) => {
  try {
    const contact = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/contacts/:id", async (req, res) => {
  try {
    const contact = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/stats", async (req, res) => {
  try {
    const [totalProjects, totalProducts, totalContacts, unreadContacts] =
      await Promise.all([
        Project.countDocuments(),
        Product.countDocuments(),
        ContactMessage.countDocuments(),
        ContactMessage.countDocuments({ read: false }),
      ]);
    res.json({ totalProjects, totalProducts, totalContacts, unreadContacts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
