const jwt = require("jsonwebtoken");
const JWT_SECRET_ADMIN = "aliraza123";

const authenticateAdmin = (req, res, next) => {
  const tokenadmin = req.header("Authorization")?.replace("Bearer ", "");
  console.log(tokenadmin);

  if (!tokenadmin) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(tokenadmin, JWT_SECRET_ADMIN);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT for admin admin verification error:", error.message);
    res.status(401).json({ message: "Invalid or expired token for admin" });
  }
};

module.exports = authenticateAdmin;
