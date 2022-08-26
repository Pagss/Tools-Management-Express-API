const Tool = require("../Models/toolModel");
const mongoose = require("mongoose");

//GET all tools
const allTools = async (req, res) => {
  const tools = await Tool.find({});
  res.status(200).json(tools);
};

//POST new tool
const newTool = async (req, res) => {
  const { title, link, description, tags } = req.body;

  // add to the database
  try {
    if (tags.length > 8) {
      res.status(400).json({ error: "tags must contain 8 elements at most" });
      return;
    } else {
      const tool = await Tool.create({ title, link, description, tags });
      res.status(200).json(tool);
      return;
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
    return;
  }
};

//GET one tool by id
const getTool = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such tool" });
  }

  const tool = await Tool.findById(id);

  if (!tool) {
    return res.status(404).json({ error: "No such tool" });
  }

  res.json(tool);
};

//UPDATE one tool by id
const updateTool = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such tool" });
  }

  try {
    if (req.body.tags.length > 8) {
      res.status(400).json({ error: "tags must contain 8 elements at most" });
      return;
    } else {
      const tool = await Tool.findByIdAndUpdate(id, { ...req.body });

      if (!tool) {
        return res.status(404).json({ error: "No such tool" });
      }
      const updatedTool = await Tool.findById(id);
      res.status(200).json(updatedTool);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
    return;
  }
};

//DELETE one tool by id
const deleteTool = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such tool" });
  }

  const tool = await Tool.findByIdAndDelete(id);

  if (!tool) {
    return res.status(404).json({ error: "No such tool" });
  }

  res.status(200).json({ tool, msg: "Has been deleted" });
};

module.exports = { allTools, newTool, getTool, updateTool, deleteTool };
