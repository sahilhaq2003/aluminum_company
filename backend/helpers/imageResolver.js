const Image = require("../models/Image");

const imageCache = { ids: null, map: null };

async function resolveImageUrls(ids) {
  const unique = [...new Set(ids.filter(Boolean).map(String))];
  if (unique.length === 0) return {};

  const images = await Image.find({ _id: { $in: unique } }).lean();
  const map = {};
  for (const img of images) {
    map[img._id.toString()] = img.externalUrl || `/api/images/${img._id}`;
  }
  return map;
}

module.exports = { resolveImageUrls };
