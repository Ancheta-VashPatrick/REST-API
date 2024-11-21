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
  message = await authentication.addUser({
    username,
    password: hashedPassword,
    role: "consumer",
    nodes: "NULL",
  });

  res.status(201).send({ message });
});

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const { message, result } = await authentication.checkUser(username);
  // console.log(message);
  // console.log(result);
  const user = result;

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send({ message: "Invalid credentials" });
  }

  // Generate token
  const token = authentication.getToken(user);

  res.status(200).send({ message, token });
});

// Protected route example
router.get("/dashboard", authentication.authenticateToken, (req, res) => {
  res
    .status(200)
    .send({ message: "Welcome to the dashboard, " + req.user.username });
});

module.exports = router;
