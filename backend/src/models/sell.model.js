const mongoose = require("mongoose");

const sellSchema = new mongoose.Schema(
  {
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
    unitCost: { type: Number, required: true },
    ProductId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
    userEmail: { type: String, required: true },
    SellSummaryId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "SellSummary" },
  },
  { timestamps: true, versionKey: false }
);

// model
const Sell = mongoose.model("sells", sellSchema);
module.exports = Sell;
