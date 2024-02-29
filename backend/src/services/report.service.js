const Expense = require("../models/expense.model");

const expenseReport = async (req) => {
  const { email } = req.user;
  const { formDate, toDate } = req.body;

  const result = await Expense.aggregate([
    {
      $match: {
        userEmail: email,
        createdAt: { $gte: new Date(formDate), $lte: new Date(toDate) },
      },
    },
    {
      $facet: {
        Total: [
          {
            $group: {
              _id: 0,
              TotalAmount: { $sum: "$amount" },
            },
          },
        ],
        Rows: [
          {
            $lookup: {
              from: "expensetypes",
              localField: "ExpenseTypeId",
              foreignField: "_id",
              as: "ExpenseType",
            },
          },
        ],
      },
    },
  ]);
  return result;
};

module.exports = {
  expenseReport,
};
