const express = require("express");
const Note = require("../models/noteModel");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Protect all routes in this file
router.use(protect);

// Create a new note
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const note = await Note.create({
      title,
      content,
      userId: req.user.userId,
    });

    res.status(201).json({
      message: "Note created successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create note",
      error: error.message,
    });
  }
});

// Get all notes of the logged-in user
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find({
      userId: req.user.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      count: notes.length,
      notes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch notes",
      error: error.message,
    });
  }
});

// Get one note of the logged-in user
router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch note",
      error: error.message,
    });
  }
});

// Update a note
router.put("/:id", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const note = await Note.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.userId,
      },
      {
        title,
        content,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json({
      message: "Note updated successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update note",
      error: error.message,
    });
  }
});

// Delete a note
router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete note",
      error: error.message,
    });
  }
});

module.exports = router;