const mongoose = require("mongoose");

// Schema
const expenseTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userEmail: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

// model
const ExpenseType = mongoose.model("expensetypes", expenseTypeSchema);
module.exports = ExpenseType;
