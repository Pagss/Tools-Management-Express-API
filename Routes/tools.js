const express = require("express");

const router = express.Router();

const Tool = require("../Models/toolModel");

//GET all tools
router.get("/", (req, res) => {
  res.json({ mssg: "all tools GET" });
});

//POST new tool
router.post("/", async (req, res) => {
  const { title, link, description, tags } = req.body;
  console.log(title, link, description, tags);

  // add to the database
  try {
    if (tags.length > 8) {
      res.status(400).json({ error: "tags must have 8 elements at most" });
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
});

//GET one tool by id
router.get("/:id", (req, res) => {
  res.json({ mssg: "one tool GET" });
});

//UPDATE one tool by id
router.patch("/:id", (req, res) => {
  res.json({ mssg: "one tool UPDATE" });
});

//DELETE one tool by id
router.delete("/:id", (req, res) => {
  res.json({ mssg: "one tool DELETE" });
});

module.exports = router;
