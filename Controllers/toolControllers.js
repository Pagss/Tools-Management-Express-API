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
    const tool = await Tool.create({ title, link, description, tags });
    res.status(201).json(tool);
    return;
  } catch (error) {
    // Return Model error
    res.status(400).json({ error: error.message });
    return;
  }
};

//GET one tool by id
const getTool = async (req, res) => {
  const id = req.params.id;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such tool" });
  }

  const tool = await Tool.findById(id);

  if (!tool) {
    return res.status(404).json({ error: "No such tool" });
  }

  res.status(200).json(tool);
};

//UPDATE one tool by id
const updateTool = async (req, res) => {
  const id = req.params.id;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such tool" });
  }

  try {
    const opts = { runValidators: true, context: "query" };
    const tool = await Tool.findByIdAndUpdate(id, { ...req.body }, opts);

    if (!tool) {
      return res.status(404).json({ error: "No such tool" });
    }
    const updatedTool = await Tool.findById(id);
    res.status(200).json(updatedTool);
  } catch (error) {
    // Return Model error
    res.status(400).json({ error: error.message });
    return;
  }
};

//DELETE one tool by id
const deleteTool = async (req, res) => {
  const id = req.params.id;

  // Validate ObjectId
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
