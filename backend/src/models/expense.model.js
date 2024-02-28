const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userEmail: { type: String, required: true },
    amount: { type: Number, required: true },
    note: { type: String, required: true },
    ExpenseTypeId: { type: mongoose.Schema.Types.ObjectId, ref: "ExpenseType" },
  },
  { timestamps: true, versionKey: false }
);

// model
const Expense = mongoose.model("expenses", expenseSchema);
module.exports = Expense;
