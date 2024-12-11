const jwt = require("jsonwebtoken");
const JWT_SECRET_HOST = "alirazabilal";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1]; // Extract the token

  try {
    const decoded = jwt.verify(token, JWT_SECRET_HOST); // Verify the token
    req.user = decoded; // Attach the decoded token (which contains `id`) to req.user
    next();
  } catch (err) {
    console.log("wrong");

    return res.status(403).json({ error: "Invalid or expired token." });
  }
};

module.exports = authMiddleware;
