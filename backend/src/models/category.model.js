const mongoose = require("mongoose");

// Schema
const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userEmail: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

// model
const Category = mongoose.model("categories", CategorySchema);
module.exports = Category;
