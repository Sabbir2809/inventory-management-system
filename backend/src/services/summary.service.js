const Expense = require("../models/expense.model");

const expenseSummary = async (req) => {
  const { email } = req.user;

  const result = await Expense.aggregate([
    {
      $match: { userEmail: email },
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
        Last30Days: [
          {
            $group: {
              _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
              TotalAmount: { $sum: "$amount" },
            },
          },
          {
            $sort: { _id: -1 },
          },
          { $limit: 30 },
        ],
      },
    },
  ]);
  return result;
};

const summaryGenerate = async (req, Model) => {
  const { email } = req.user;

  const result = await Model.aggregate([
    {
      $match: { userEmail: email },
    },
    {
      $facet: {
        Total: [
          {
            $group: {
              _id: 0,
              TotalAmount: { $sum: "$grantTotal" },
            },
          },
        ],
        Last30Days: [
          {
            $group: {
              _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
              TotalAmount: { $sum: "$grantTotal" },
            },
          },
          {
            $sort: { _id: -1 },
          },
          { $limit: 30 },
        ],
      },
    },
  ]);
  return result;
};

module.exports = {
  expenseSummary,
  summaryGenerate,
};
