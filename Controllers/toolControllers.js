const Tool = require("../Models/toolModel");

//GET all tools
router.get("/", (req, res) => {
  res.json({ mssg: "all tools GET" });
});

//POST new tool
router.post("/", (req, res) => {
  const { title, link, description, tags } = req.body;
  console.log(title, link, description, tags);
  res.json({ mssg: req.body });
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
