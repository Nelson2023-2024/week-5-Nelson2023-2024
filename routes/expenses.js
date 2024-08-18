const express = require("express");
const router = express.Router();
const db = require("../db");

// Add expense route
router.post("/add", (req, res) => {
  const { user_id, amount, date, category } = req.body;
  const query =
    "INSERT INTO Expenses (user_id, amount, date, category) VALUES (?, ?, ?, ?)";
  db.query(query, [user_id, amount, date, category], (err, result) => {
    if (err) {
      console.error("Error adding expense:", err); // Log the actual error
      return res.status(500).send(`Error adding expense: ${err.message}`);
    }
    res.send("Expense added");
  });
});

// View expenses route
router.get("/:user_id", (req, res) => {
  const { user_id } = req.params;
  const query = "SELECT * FROM Expenses WHERE user_id = ?";
  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error("Error retrieving expenses:", err);
      return res.status(500).send(`Error retrieving expenses: ${err.message}`);
    }
    res.json(results);
  });
});

module.exports = router;
