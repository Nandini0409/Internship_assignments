const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "User Authentication API is running",
  });
});

// Authentication routes
app.use("/api/auth", authRoutes);

// Protected profile route
app.get("/api/profile", protect, async (req, res) => {
  res.status(200).json({
    message: "You accessed a protected route",
    userId: req.user.userId,
  });
});

const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });