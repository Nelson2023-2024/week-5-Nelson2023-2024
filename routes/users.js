const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../db");

// User registration route
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = "INSERT INTO Users (username, password) VALUES (?, ?)";
    db.query(query, [username, hashedPassword], (err, result) => {
      if (err) {
        console.error("Error registering user:", err); // Log the actual error
        return res.status(500).send(`Error registering user: ${err.message}`);
      }
      res.send("User registered");
    });
  } catch (err) {
    console.error("Error hashing password:", err);
    res.status(500).send("Error hashing password");
  }
});

// User login route
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM Users WHERE username = ?";
  db.query(query, [username], async (err, results) => {
    if (err) {
      console.error("Error logging in:", err);
      return res.status(500).send(`Error logging in: ${err.message}`);
    }
    if (results.length > 0) {
      const isMatch = await bcrypt.compare(password, results[0].password);
      if (isMatch) {
        // Redirect to the add-expense page
        res.redirect("/add-expense");
      } else {
        res.status(401).send("Invalid credentials");
      }
    } else {
      res.status(404).send("User not found");
    }
  });
});

module.exports = router;
