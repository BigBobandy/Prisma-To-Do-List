const express = require("express");
const bodyParser = require("body-parser");

// Create Express app
const app = express();

// Use body-parser middleware to parse incoming JSON
app.use(bodyParser.json());

// Define a simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to your To-Do list app!" });
});

// Set the port that the server will listen on
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
