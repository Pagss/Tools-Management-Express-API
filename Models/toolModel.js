const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const toolSchema = new Schema({
  //"deve ser unico, independente do case sensitive",
  title: { type: String, required: true, lowercase: true, unique: true },
  //"obrigatorio",
  link: { type: String, required: true },
  //"max 256 char",
  description: { type: String, required: true, maxLength: 256 },
  //"array de min 0, max 8",
  tags: { type: [{ type: String }] },
});

module.exports = mongoose.model("Tool", toolSchema);
