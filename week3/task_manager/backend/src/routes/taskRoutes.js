const express = require("express");
const Task = require("../models/taskModel");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Protect every route in this file
router.use(protect);

// Create a task
router.post("/", async (req, res) => {
  try {
    const { title, description, completed, imageUrl } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Task title is required",
      });
    }

    const task = await Task.create({
      title,
      description,
      completed,
      imageUrl,
      userId: req.user.userId,
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create task",
      error: error.message,
    });
  }
});

// Get all tasks of the logged-in user
// Optional filter: ?status=completed
// Optional filter: ?status=pending
// Optional filter: ?status=all
router.get("/", async (req, res) => {
  try {
    const { status = "all" } = req.query;

    const filter = {
      userId: req.user.userId,
    };

    if (status === "completed") {
      filter.completed = true;
    } else if (status === "pending") {
      filter.completed = false;
    } else if (status !== "all") {
      return res.status(400).json({
        message: "Status must be all, completed, or pending",
      });
    }

    const tasks = await Task.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json({
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch tasks",
      error: error.message,
    });
  }
});

// Get one task
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch task",
      error: error.message,
    });
  }
});

// Update a task
router.put("/:id", async (req, res) => {
  try {
    const { title, description, completed, imageUrl } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Task title is required",
      });
    }

    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.userId,
      },
      {
        title,
        description,
        completed,
        imageUrl,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update task",
      error: error.message,
    });
  }
});

// Delete a task
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete task",
      error: error.message,
    });
  }
});

module.exports = router;