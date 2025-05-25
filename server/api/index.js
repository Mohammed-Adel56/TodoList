const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

// Database connection (using environment variable)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Database connected"))
  .catch(err => console.log(err));

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Test endpoint
app.get("/testing", (req, res) => {
  res.send("<h1>TESTING....</h1>");
});

// Routes
app.use("/", require("./routes/authRoutes"));

module.exports = app;