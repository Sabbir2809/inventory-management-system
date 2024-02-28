const mongoose = require("mongoose");
const Brand = require("./brand.model");
const AppError = require("../errors/AppError");
const Category = require("./category.model");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userEmail: { type: String, required: true },
    unit: { type: String, required: true },
    details: { type: String, required: true },
    BrandId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Brand" },
    CategoryId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Category" },
  },
  { timestamps: true, versionKey: false }
);

// Pre hook middleware for the save operation
productSchema.pre("save", async function (next) {
  // Check if BrandId is provided and exists
  if (this.BrandId) {
    const brand = await Brand.findById(this.BrandId);
    if (!brand) {
      throw new AppError(404, "Brand Not Found!");
    }
  }
  // Check if CategoryId is provided and exists
  if (this.CategoryId) {
    const category = await Category.findById(this.CategoryId);
    if (!category) {
      throw new AppError(404, "Category Not Found!");
    }
  }
  // Call next to proceed with the save operation
  next();
});

// model
const Product = mongoose.model("products", productSchema);
module.exports = Product;
