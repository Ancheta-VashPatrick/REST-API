const db = require("./db");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "SSL_WIoT2_BEST_CAPSTONE";

async function addUser(user) {
  let message = "Error in creating user account";
  try {
    const result = await db.query(
      `INSERT INTO users 
      (username, password, role, nodes) 
      VALUES 
      ('${user.username}', '${user.password}', '${user.role}', '${user.nodes}')`
    );

    if (result.affectedRows) {
      message = "User account created successfully";
    }
  } catch (err) {}
  return message;
}

async function checkUser(username) {
  const results = await db.query(
    `SELECT * FROM users 
      WHERE \`username\` = '${username}'
      LIMIT 1;`
  );

  let message = "Error in checking user record";

  if (results[0]) {
    message = "User record found";
  }

  return { message, result: results[0] };
}

const getToken = (user) => {
  return jwt.sign(
    { username: user.username, role: user.role, nodes: user.nodes },
    SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
};

// Middleware for token verification
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).send({ message: "Token required" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err)
      return res.status(403).send({ message: "Invalid or expired token" });
    req.user = user;
    next();
  });
};

module.exports = {
  addUser,
  checkUser,
  getToken,
  authenticateToken,
};
