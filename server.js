require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");

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
