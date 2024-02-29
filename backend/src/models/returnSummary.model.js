const mongoose = require("mongoose");

const returnSummarySchema = new mongoose.Schema(
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
const ReturnSummary = mongoose.model("returnsummaries", returnSummarySchema);
module.exports = ReturnSummary;
