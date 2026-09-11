const express = require("express");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Upload one image
router.post("/", protect, (req, res) => {
  upload.single("image")(req, res, (error) => {
    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload an image",
      });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    res.status(201).json({
      message: "Image uploaded successfully",
      imageUrl,
      file: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
      },
    });
  });
});

module.exports = router;