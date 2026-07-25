const Image = require("../models/Image");

const backendUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.BACKEND_URL || "";

async function resolveImageUrls(ids) {
  const unique = [...new Set(ids.filter(Boolean).map(String))];
  if (unique.length === 0) return {};

  const images = await Image.find({ _id: { $in: unique } }).lean();
  const map = {};
  for (const img of images) {
    map[img._id.toString()] = img.externalUrl || `${backendUrl}/api/images/${img._id}`;
  }
  return map;
}

module.exports = { resolveImageUrls };
