const express = require("express");
const toolsRoutes = require("./Routes/tools");
const path = require("path");

// express app
const app = express();

// middleware
app.use(express.json()); // access req.body

app.use((req, res, next) => {
  console.log(req.path, req.method); // Development test information
  next();
});

// API map
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/api.html"));
});

// routes
app.use("/api/tools", toolsRoutes);

module.exports = app;
