const express = require("express");
const router = express.Router();
const authentication = require("../services/authentication");

const bcrypt = require("bcryptjs");

let users = [];

// Signup route
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 8);

  // Store user
  users.push({ username, password: hashedPassword });

  res.status(201).send("User created");
});

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send("Invalid credentials");
  }

  // Generate token
  const token = authentication.getToken(user.username);

  res.status(200).send({ token });
});

// Protected route example
router.get("/dashboard", authentication.authenticateToken, (req, res) => {
  res.status(200).send("Welcome to the dashboard, " + req.user.userId);
});

module.exports = router;