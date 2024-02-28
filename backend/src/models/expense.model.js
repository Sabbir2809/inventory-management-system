const mongoose = require("mongoose");
const AppError = require("../errors/AppError");
const ExpenseType = require("./expenseType.model");

const expenseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userEmail: { type: String, required: true },
    amount: { type: Number, required: true },
    note: { type: String },
    ExpenseTypeId: { type: mongoose.Schema.Types.ObjectId, ref: "ExpenseType" },
  },
  { timestamps: true, versionKey: false }
);

// Pre hook middleware for the save operation
expenseSchema.pre("save", async function (next) {
  // Check if ExpenseTypeId is provided and exists
  if (this.ExpenseTypeId) {
    const brand = await ExpenseType.findById(this.ExpenseTypeId);
    if (!brand) {
      throw new AppError(404, "Expense Type Not Found!");
    }
  }
  // Call next to proceed with the save operation
  next();
});

// model
const Expense = mongoose.model("expenses", expenseSchema);
module.exports = Expense;
