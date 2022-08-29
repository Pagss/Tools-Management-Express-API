require("dotenv").config();
const express = require("express");
const toolsRoutes = require("./Routes/tools");
const mongoose = require("mongoose");
const path = require("path");

// express app
const app = require("./app");

// middleware
app.use(express.json()); // access req.body

app.use((req, res, next) => {
  console.log(req.path, req.method); // Development test information
  next();
});

// routes
app.use("/api/tools", toolsRoutes);

//MongoDB connection
const db = mongoose
  .connect(process.env.DBSTRING)
  .then(() => {
    //listen port 3000 only when connected
    app.listen(3000, () => {
      console.log("DB on and Listening on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// API map
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/api.html"));
});
