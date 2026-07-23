require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Project = require("./models/Project");
const Product = require("./models/Product");
const ProductCategory = require("./models/ProductCategory");
const User = require("./models/User");

const MONGO_URI = process.env.MONGODB_URI;
const MONGO_DB = process.env.MONGODB_DB || "alumtech";

const IMAGES = {
  windows: [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80",
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
  ],
  doors: [
    "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
    "https://images.unsplash.com/photo-1509615339222-98e0fdba126e?w=800&q=80",
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
  ],
  facades: [
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
  ],
  curtainWalls: [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
  ],
  projectExterior: [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
  ],
  projectInterior: [
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80",
  ],
  projectConstruction: [
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    "https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?w=800&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
  ],
  heroCover: [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
  ],
};

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function seed() {
  await mongoose.connect(MONGO_URI, { dbName: MONGO_DB });
  console.log("Connected to MongoDB Atlas");

  const existingProjects = await Project.countDocuments();
  if (existingProjects > 0) {
    console.log("Database already seeded. Skipping...");
    await mongoose.disconnect();
    return;
  }

  console.log("Seeding database...");

  const adminExists = await User.findOne({ username: process.env.ADMIN_EMAIL || "admin@gmail.com" });
  if (!adminExists) {
    const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD || "admin@123", 10);
    await User.create({
      username: process.env.ADMIN_EMAIL || "admin@gmail.com",
      password: hash,
      role: "ROLE_ADMIN",
    });
    console.log("  Created admin user");
  }

  const cats = {};
  for (const name of ["Windows", "Doors", "Facades", "Curtain Walls"]) {
    const doc = await ProductCategory.create({ name });
    cats[name] = doc;
    console.log(`  Created category: ${name}`);
  }

  const products = [
    { name: "Premium Sliding Window", price: "Rs 135,000 - Rs 240,000", stock: 45, cat: "Windows",
      desc: "High-performance aluminium sliding window with double-glazed Low-E glass. Features smooth operation, excellent thermal insulation, and superior noise reduction for modern residential and commercial applications.", img: IMAGES.windows[0] },
    { name: "Tilt and Turn Window", price: "Rs 165,000 - Rs 285,000", stock: 32, cat: "Windows",
      desc: "Versatile European-style tilt and turn window offering dual opening modes. Perfect for ventilation control with enhanced security features and energy efficiency rating A+.", img: IMAGES.windows[1] },
    { name: "Fixed Picture Window", price: "Rs 105,000 - Rs 180,000", stock: 50, cat: "Windows",
      desc: "Sleek fixed aluminium window designed to maximize natural light and views. Slim frame profile with thermal break technology for optimal insulation.", img: IMAGES.windows[2] },
    { name: "Aluminium Casement Window", price: "Rs 120,000 - Rs 210,000", stock: 38, cat: "Windows",
      desc: "Traditional casement window with modern aluminium construction. Easy operation with multi-point locking system for enhanced security.", img: IMAGES.windows[3] },

    { name: "Frameless Glass Door", price: "Rs 360,000 - Rs 750,000", stock: 18, cat: "Doors",
      desc: "Stunning frameless glass door with concealed aluminium hardware. Provides seamless indoor-outdoor transition with premium stainless steel fittings.", img: IMAGES.doors[0] },
    { name: "Bi-Fold Aluminium Door", price: "Rs 540,000 - Rs 1,050,000", stock: 12, cat: "Doors",
      desc: "Space-saving bi-fold door system with smooth-fold mechanism. Available in 2 to 8 panel configurations with narrow sightlines.", img: IMAGES.doors[1] },
    { name: "Sliding Patio Door", price: "Rs 270,000 - Rs 480,000", stock: 25, cat: "Doors",
      desc: "Heavy-duty aluminium sliding door engineered for large openings. Features anti-lift technology and adjustable roller system.", img: IMAGES.doors[2] },
    { name: "Double Entrance Door", price: "Rs 600,000 - Rs 1,200,000", stock: 8, cat: "Doors",
      desc: "Grand double entrance door with decorative aluminium panels and glass inserts. Customizable finishes including anodized, powder-coated, and woodgrain effects.", img: IMAGES.doors[3] },

    { name: "Unitized Curtain Wall System", price: "Rs 36,000 - Rs 54,000/sqft", stock: 15, cat: "Curtain Walls",
      desc: "Factory-assembled unitized curtain wall panels for rapid installation. Features structural silicone glazing and thermal break profiles for high-rise buildings.", img: IMAGES.curtainWalls[0] },
    { name: "Stick Curtain Wall", price: "Rs 27,000 - Rs 42,000/sqft", stock: 20, cat: "Curtain Walls",
      desc: "Traditional stick-built curtain wall system offering maximum design flexibility. Ideal for complex geometries and custom architectural requirements.", img: IMAGES.curtainWalls[1] },
    { name: "Structural Glazing System", price: "Rs 45,000 - Rs 66,000/sqft", stock: 10, cat: "Curtain Walls",
      desc: "Advanced structural glazing system for seamless glass facades. Load-bearing glass panels with minimal visible aluminium framing.", img: IMAGES.curtainWalls[2] },

    { name: "Aluminium Composite Panel", price: "Rs 10,500 - Rs 19,500/sqft", stock: 100, cat: "Facades",
      desc: "Lightweight aluminium composite panel for exterior cladding and facades. Fire-rated core with PE or FR mineral core options.", img: IMAGES.facades[0] },
    { name: "Perforated Aluminium Screen", price: "Rs 13,500 - Rs 24,000/sqft", stock: 30, cat: "Facades",
      desc: "Custom perforated aluminium screens for solar shading and aesthetic facade treatments. CNC-cut patterns available in unlimited designs.", img: IMAGES.facades[1] },
    { name: "Thermal Break Facade System", price: "Rs 30,000 - Rs 48,000/sqft", stock: 22, cat: "Facades",
      desc: "High-performance thermal break facade system with polyamide insulation bars. Reduces thermal bridging by up to 90% for energy-efficient buildings.", img: IMAGES.facades[2] },
  ];

  for (const p of products) {
    await Product.create({
      name: p.name, price: p.price, stock: p.stock,
      description: p.desc, imageUrl: p.img,
      categoryId: cats[p.cat]._id, categoryName: p.cat,
    });
  }
  console.log(`  Created ${products.length} products`);

  const projectsData = [
    {
      title: "Meridian Tower Curtain Wall",
      client: "Meridian Development Corp",
      location: "New York, NY", year: 2024,
      desc: "A groundbreaking 52-story commercial tower featuring a fully unitized curtain wall system. The project demanded precision engineering to achieve the building's distinctive twisted form while maintaining structural integrity and thermal performance across 420,000 sqft of glazing.",
      challenge: "The tower's 15-degree twist per floor required custom-engineered mullion connections that could accommodate progressive rotation while maintaining weather-tightness and structural performance at extreme heights.",
      solution: "Our engineering team developed a proprietary rotation joint system using CNC-machined aluminium connectors with 3D-printed prototypes. Each unitized panel was pre-assembled in our facility with tolerance control to within 0.5mm.",
      scope: "Design engineering, fabrication, and installation of the complete unitized curtain wall system including 3,200 panels, integrated solar shading, and maintenance walkway systems.",
      results: "Project completed 3 weeks ahead of schedule. The facade achieved a U-value of 1.0 W/m2K, exceeding energy code requirements by 35%. Won the 2024 Façade Design & Engineering Award.",
      cover: IMAGES.heroCover[0],
      categories: [
        { name: "Exterior Views", images: [
          { imageUrl: IMAGES.projectExterior[0], caption: "Tower exterior - south elevation" },
          { imageUrl: IMAGES.projectExterior[1], caption: "Curtain wall detail at sunset" },
        ]},
        { name: "Construction Process", images: [
          { imageUrl: IMAGES.projectConstruction[0], caption: "Panel installation at level 40" },
          { imageUrl: IMAGES.projectConstruction[1], caption: "Unitized panel rigging operation" },
        ]},
      ],
    },
    {
      title: "Harborview Residences",
      client: "Pacific Living Group",
      location: "San Francisco, CA", year: 2024,
      desc: "Luxury waterfront residential complex featuring 280 units with premium aluminium bi-fold and sliding door systems. The design prioritized panoramic bay views with floor-to-ceiling glazing and seamless indoor-outdoor living spaces.",
      challenge: "Coastal location required materials rated for high wind loads (150 mph), salt air corrosion resistance, and compliance with strict seismic building codes while maintaining slim sightlines.",
      solution: "Specified marine-grade 6063-T6 aluminium alloy with AAMA 2605 anodized finish for superior corrosion resistance. Integrated seismic movement joints within the glazing system to accommodate up to 3 inches of inter-story drift.",
      scope: "Supply and installation of 560 bi-fold door units, 420 sliding door systems, and 1,200 windows across 4 residential towers.",
      results: "Zero warranty claims in first 2 years. Residents report 40% reduction in energy costs compared to conventional glazing. Project achieved LEED Gold certification.",
      cover: IMAGES.heroCover[1],
      categories: [
        { name: "Completed Views", images: [
          { imageUrl: IMAGES.projectExterior[1], caption: "Waterfront elevation panorama" },
          { imageUrl: IMAGES.projectInterior[0], caption: "Interior living space with view" },
        ]},
      ],
    },
    {
      title: "Greenfield Business Park",
      client: "Atlas Commercial Holdings",
      location: "Austin, TX", year: 2023,
      desc: "A sustainable office campus featuring three interconnected buildings with high-performance thermal break facade systems. The project set new standards for energy efficiency in commercial construction across the Texas climate zone.",
      challenge: "Achieving net-zero energy goals in a climate with extreme temperature swings (-5°F to 110°F) while maintaining occupant comfort and maximizing natural daylight across 600,000 sqft of office space.",
      solution: "Implemented triple-sealed thermal break facade with argon-filled double-glazed IGUs and integrated automated exterior shading. Solar-responsive facade orientation reduced cooling loads by 45%.",
      scope: "Complete facade engineering and installation for 3 office buildings including automated solar shading systems, natural ventilation windows, and ETFE skylight atrium.",
      results: "Buildings achieved LEED Platinum certification with 62% energy reduction vs. baseline. Named 'Best Sustainable Commercial Project' at the 2023 Construction Excellence Awards.",
      cover: IMAGES.heroCover[2],
      categories: [
        { name: "Building Exteriors", images: [
          { imageUrl: IMAGES.projectExterior[2], caption: "Main building entrance facade" },
          { imageUrl: IMAGES.projectExterior[3], caption: "Thermal break facade detail" },
        ]},
        { name: "Atrium & Skylights", images: [
          { imageUrl: IMAGES.projectInterior[2], caption: "ETFE skylight atrium interior" },
          { imageUrl: IMAGES.projectExterior[0], caption: "Natural light optimization" },
        ]},
      ],
    },
    {
      title: "Skybridge Mall Renovation",
      client: "Urban Retail Partners",
      location: "Chicago, IL", year: 2023,
      desc: "Complete facade renovation of a 1.2M sqft retail mall, replacing aging precast panels with a modern aluminium composite panel system and floor-to-ceiling storefront glazing to revitalize the shopping experience.",
      challenge: "Phased construction while maintaining 60% tenant occupancy. All work had to be completed during off-hours to minimize disruption to retail operations and customer access.",
      solution: "Developed a modular construction approach with pre-fabricated ACP cassettes that could be installed in overnight shifts. Coordinated with tenant operations for a zero-downtime renovation strategy.",
      scope: "Removal of existing facade and installation of new ACP cladding system, curtain wall storefronts, and illuminated signage band across the entire 2,400-linear-foot exterior.",
      results: "Renovation completed with zero tenant closures. Energy costs reduced by 28%. Foot traffic increased 35% in first year post-renovation. Mall occupancy reached 98%.",
      cover: IMAGES.heroCover[4],
      categories: [
        { name: "Before & After", images: [
          { imageUrl: IMAGES.projectExterior[3], caption: "Completed facade renovation" },
          { imageUrl: IMAGES.projectConstruction[3], caption: "Night illumination effect" },
        ]},
      ],
    },
    {
      title: "Horizon Hotel & Resort",
      client: "Luxe Hospitality Group",
      location: "Miami, FL", year: 2024,
      desc: "Ultra-luxury beachfront resort with custom aluminium frameless glass systems, panoramic elevator enclosures, and integrated smart glass technology across 350 guest rooms and public areas.",
      challenge: "Creating an ultra-premium aesthetic with floor-to-ceiling ocean views while meeting Miami-Dade hurricane code requirements (Miami-Dade NOA) and integrating electrochromic smart glass throughout.",
      solution: "Partnered with smart glass manufacturer to develop custom aluminium frames that house electrochromic glass panels. Structural glazing tested to withstand Category 5 hurricane conditions with missile impact testing.",
      scope: "Design, engineering, and installation of all glazing systems including 350 balcony railings, 12 panoramic elevator enclosures, smart glass partitions, and a 3-story lobby curtain wall.",
      results: "Resort opened to critical acclaim. Smart glass system reduces HVAC costs by 22%. Named one of 'Top 10 Most Innovative Hotel Designs of 2024' by Architectural Digest.",
      cover: IMAGES.heroCover[3],
      categories: [
        { name: "Resort Exterior", images: [
          { imageUrl: IMAGES.projectExterior[1], caption: "Beachfront facade at golden hour" },
          { imageUrl: IMAGES.projectInterior[0], caption: "Pool area glass enclosures" },
        ]},
        { name: "Interior Details", images: [
          { imageUrl: IMAGES.projectInterior[1], caption: "Smart glass room partition" },
          { imageUrl: IMAGES.projectInterior[3], caption: "Panoramic elevator enclosure" },
        ]},
      ],
    },
    {
      title: "Metro Central Office Tower",
      client: "Crestline Properties",
      location: "Denver, CO", year: 2023,
      desc: "A 38-story Class A office tower featuring our signature thermal break curtain wall system with integrated photovoltaic panels. The building's distinctive angular facade maximizes solar energy generation while providing panoramic Rocky Mountain views.",
      challenge: "Integrating building-integrated photovoltaics (BIPV) into a curtain wall system while maintaining structural integrity, thermal performance, and aesthetic coherence across a complex angular geometry.",
      solution: "Developed custom aluminium mullion profiles that house thin-film BIPV modules within the spandrel areas. The angular facade was achieved through parametric design optimization to maximize solar exposure.",
      scope: "Full facade package including 1,800 curtain wall panels with integrated BIPV, automated external venetian blinds, and natural ventilation provisions on 12 floors.",
      results: "Building generates 15% of its total energy consumption through facade-integrated solar panels. Achieved WELL Building Platinum certification. 97% tenant satisfaction rating.",
      cover: IMAGES.heroCover[5],
      categories: [
        { name: "Façade Engineering", images: [
          { imageUrl: IMAGES.projectExterior[0], caption: "Angular curtain wall system" },
          { imageUrl: IMAGES.projectExterior[1], caption: "BIPV panel integration detail" },
        ]},
      ],
    },
  ];

  for (const p of projectsData) {
    await Project.create({
      title: p.title, client: p.client, location: p.location, year: p.year,
      description: p.desc, challenge: p.challenge, solution: p.solution,
      scope: p.scope, results: p.results, coverImageUrl: p.cover,
      categories: p.categories.map((c) => ({
        name: c.name,
        images: c.images.map((img) => ({ imageUrl: img.imageUrl, caption: img.caption })),
      })),
    });
  }
  console.log(`  Created ${projectsData.length} projects with categories and images`);

  console.log("Seed complete!");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
