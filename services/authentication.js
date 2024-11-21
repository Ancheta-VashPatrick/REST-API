const jwt = require("jsonwebtoken");

const SECRET_KEY = "SSL_WIoT2_BEST_CAPSTONE";

const getToken = (username) => {
  return jwt.sign({ userId: username }, SECRET_KEY, {
    expiresIn: "1h",
  });
}

// Middleware for token verification
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).send("Token required");

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).send("Invalid or expired token");
    req.user = user;
    next();
  });
};

module.exports = {
  getToken,
  authenticateToken,
};
