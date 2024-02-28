const mongoose = require("mongoose");
const AppError = require("../errors/AppError");
const Product = require("./product.model");

const purchaseSchema = new mongoose.Schema(
  {
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
    unitCost: { type: Number, required: true },
    ProductId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
    userEmail: { type: String, required: true },
    PurchaseSummaryId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "PurchaseSummary" },
  },
  { timestamps: true, versionKey: false }
);

// Pre hook middleware for the save operation
purchaseSchema.pre("insertMany", async (next, docs) => {
  // Check if ProductId is provided and exists for each document
  for (const item of docs) {
    if (item.ProductId) {
      const product = await Product.findById(item.ProductId);
      if (!product) {
        throw new AppError(404, "Product Not Found!");
      }
    }
  }
  // Call next to proceed with the save operation
  next();
});

// model
const Purchase = mongoose.model("purchases", purchaseSchema);
module.exports = Purchase;
