const express = require("express");

const router = express.Router();

const {
  allTools,
  newTool,
  getTool,
  updateTool,
  deleteTool,
} = require("../Controllers/toolControllers");

//GET all tools
router.get("/", allTools);

//POST new tool
router.post("/", newTool);

//GET one tool by id
router.get("/:id", getTool);

//UPDATE one tool by id
router.patch("/:id", updateTool);

//DELETE one tool by id
router.delete("/:id", deleteTool);

module.exports = router;
