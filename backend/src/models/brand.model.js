const mongoose = require("mongoose");

// Schema
const BrandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userEmail: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

// model
const Brand = mongoose.model("brands", BrandSchema);
module.exports = Brand;
