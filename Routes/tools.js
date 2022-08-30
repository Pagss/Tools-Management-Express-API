const express = require("express");

const router = express.Router();

const {
  allTools,
  newTool,
  getTool,
  deleteTool,
} = require("../Controllers/toolControllers");

//GET all tools
router.get("/", allTools);

//POST new tool
router.post("/", newTool);

//GET one tool by id
router.get("/:id", getTool);

//DELETE one tool by id
router.delete("/:id", deleteTool);

module.exports = router;
