const mongoose = require("mongoose");

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

// model
const Purchase = mongoose.model("purchases", purchaseSchema);
module.exports = Purchase;
