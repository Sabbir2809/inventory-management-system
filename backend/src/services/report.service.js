const Expense = require("../models/expense.model");

const expenseReport = async (req) => {
  const { email } = req.user;
  const { formDate, toDate } = req.params;

  const result = await Expense.aggregate([
    {
      $match: {
        userEmail: email,
        createdAt: {
          $gte: new Date(formDate) || new Date(),
          $lte: new Date(toDate) || new Date(),
        },
      },
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
        rows: [
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
  return {
    total: result[0]?.total[0]?.totalAmount,
    rows: result[0]?.rows,
  };
};

const reportGenerate = async (req, Model) => {
  const { email } = req.user;
  const { formDate, toDate } = req.params;

  const result = await Model.aggregate([
    {
      $match: {
        userEmail: email,
        createdAt: {
          $gte: new Date(formDate) || new Date(),
          $lte: new Date(toDate) || new Date(),
        },
      },
    },
    {
      $facet: {
        total: [
          {
            $group: {
              _id: 0,
              totalAmount: { $sum: "$total" },
            },
          },
        ],
        rows: [
          {
            $lookup: {
              from: "products",
              localField: "ProductId",
              foreignField: "_id",
              as: "Products",
            },
          },
          {
            $unwind: "$Products",
          },
          {
            $lookup: {
              from: "brands",
              localField: "Products.BrandId",
              foreignField: "_id",
              as: "Brands",
            },
          },
          {
            $lookup: {
              from: "categories",
              localField: "Products.CategoryId",
              foreignField: "_id",
              as: "Categories",
            },
          },
        ],
      },
    },
  ]);
  return {
    total: result[0]?.total[0]?.totalAmount,
    rows: result[0]?.rows,
  };
};

module.exports = {
  expenseReport,
  reportGenerate,
};
