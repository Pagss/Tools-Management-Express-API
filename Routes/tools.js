const express = require("express");

const router = express.Router();

const Tool = require("../Models/toolModel");

//GET all tools
router.get("/", (req, res) => {
  res.json({ mssg: "all tools GET" });
});

//POST new tool
router.post("/", (req, res) => {
  console.log(req.body);
  res.json({ mssg: "new tool POST" });
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
