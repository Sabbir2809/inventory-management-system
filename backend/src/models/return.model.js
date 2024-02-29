const mongoose = require("mongoose");

const returnSchema = new mongoose.Schema(
  {
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
    unitCost: { type: Number, required: true },
    ProductId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
    userEmail: { type: String, required: true },
    ReturnSummaryId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "ReturnSummary" },
  },
  { timestamps: true, versionKey: false }
);

// model
const Return = mongoose.model("returns", returnSchema);
module.exports = Return;
