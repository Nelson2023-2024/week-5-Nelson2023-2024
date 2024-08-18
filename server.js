const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./db");
const app = express();

// Middleware to parse JSON and urlencoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Routes
const users = require("./routes/users");
const expenses = require("./routes/expenses");

app.use("/users", users);
app.use("/expenses", expenses);

// Serve the add-expense.html file through a specific route
app.get("/add-expense", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "add-expense.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
