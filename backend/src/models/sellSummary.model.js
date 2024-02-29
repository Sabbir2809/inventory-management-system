const mongoose = require("mongoose");

const sellSummarySchema = new mongoose.Schema(
  {
    vatTax: { type: Number, required: true },
    discount: { type: Number },
    otherCost: { type: Number },
    shoppingCost: { type: Number, required: true },
    grantTotal: { type: Number, required: true },
    note: { type: String },
    userEmail: { type: String, required: true },
    CustomerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Customer" },
  },
  { timestamps: true, versionKey: false }
);

// model
const SellSummary = mongoose.model("sellsummaries", sellSummarySchema);
module.exports = SellSummary;
