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

const reportGenerate = async (req, Model) => {
  const { email } = req.user;
  const { formDate, toDate } = req.body;

  const result = await Model.aggregate([
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
              TotalAmount: { $sum: "$total" },
            },
          },
        ],
        Rows: [
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
  return result;
};

module.exports = {
  expenseReport,
  reportGenerate,
};
