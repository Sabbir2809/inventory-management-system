const mongoose = require("mongoose");

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

// model
const PurchaseSummary = mongoose.model("purchasesummaries", purchaseSummarySchema);
module.exports = PurchaseSummary;
