const Expense = require("../models/expense.model");

const expenseSummary = async (req) => {
  const { email } = req.user;

  const result = await Expense.aggregate([
    {
      $match: { userEmail: email },
    },
    {
      $facet: {
        total: [
          {
            $group: {
              _id: 0,
              totalAmount: { $sum: "$amount" },
            },
          },
        ],
        last30Days: [
          {
            $group: {
              _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
              totalAmount: { $sum: "$amount" },
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
  return {
    total: result[0].total[0]?.totalAmount,
    last30Days: result[0].last30Days,
  };
};

const summaryGenerate = async (req, Model) => {
  const { email } = req.user;

  const result = await Model.aggregate([
    {
      $match: { userEmail: email },
    },
    {
      $facet: {
        total: [
          {
            $group: {
              _id: 0,
              totalAmount: { $sum: "$grantTotal" },
            },
          },
        ],
        last30Days: [
          {
            $group: {
              _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
              totalAmount: { $sum: "$grantTotal" },
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
  return {
    total: result[0].total[0]?.totalAmount,
    last30Days: result[0].last30Days,
  };
};

module.exports = {
  expenseSummary,
  summaryGenerate,
};
