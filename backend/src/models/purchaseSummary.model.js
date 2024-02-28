const mongoose = require("mongoose");
const Supplier = require("./supplier.model");
const AppError = require("../errors/AppError");

const purchaseSummarySchema = new mongoose.Schema(
  {
    vatTax: { type: Number, required: true },
    discount: { type: Number },
    otherCost: { type: Number },
    shoppingCost: { type: Number, required: true },
    grantTotal: { type: Number, required: true },
    note: { type: String },
    userEmail: { type: String, required: true },
    SupplierId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Supplier" },
  },
  { timestamps: true, versionKey: false }
);

// Pre hook middleware for the save operation
purchaseSummarySchema.pre("save", async function (next) {
  // Check if SupplierId is provided and exists
  if (this.SupplierId) {
    const product = await Supplier.findById(this.SupplierId);
    if (!product) {
      throw new AppError(404, "Supplier Not Found!");
    }
  }
  // Call next to proceed with the save operation
  next();
});

// model
const PurchaseSummary = mongoose.model("purchaseSummary", purchaseSummarySchema);
module.exports = PurchaseSummary;
