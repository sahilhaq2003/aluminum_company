const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "alumtech_fallback_secret";

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      return next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  }

  if (authHeader && authHeader.startsWith("Basic ")) {
    const decoded = Buffer.from(authHeader.split(" ")[1], "base64").toString("utf-8");
    const [username, password] = decoded.split(":");

    if (
      username === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      req.user = { username, role: "ROLE_ADMIN" };
      return next();
    }
  }

  return res.status(401).json({ error: "Authentication required" });
}

function generateToken(user) {
  return jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

module.exports = { authenticateToken, generateToken };
