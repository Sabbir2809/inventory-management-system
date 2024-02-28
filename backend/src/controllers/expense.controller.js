const catchAsync = require("../utils/catchAsync");
const sendSuccessResponse = require("../utils/sendSuccessResponse");
const ExpenseTypeModel = require("../models/expenseType.model");
const ExpenseModel = require("../models/expense.model");
const ExpenseServices = require("../services/common.service");

const createExpenseType = catchAsync(async (req, res) => {
  // service
  const result = await ExpenseServices.create(req, ExpenseTypeModel);

  // send response
  sendSuccessResponse(res, {
    statusCode: 201,
    success: true,
    message: "Create ExpenseType Successfully",
    data: result,
  });
});

const updateExpenseType = catchAsync(async (req, res) => {
  // service
  const result = await ExpenseServices.update(req, ExpenseTypeModel);

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "ExpenseType Update Successfully",
    data: result,
  });
});

const createExpense = catchAsync(async (req, res) => {
  // service
  const result = await ExpenseServices.create(req, ExpenseModel);

  // send response
  sendSuccessResponse(res, {
    statusCode: 201,
    success: true,
    message: "Create Expense Successfully",
    data: result,
  });
});

const updateExpense = catchAsync(async (req, res) => {
  // service
  const result = await ExpenseServices.update(req, ExpenseModel);

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "Expense Update Successfully",
    data: result,
  });
});

const expenseList = catchAsync(async (req, res) => {
  const searchRegex = { $regex: req.params.searchKeyword, $options: "i" };
  const searchArray = [
    { name: searchRegex },
    { amount: searchRegex },
    { note: searchRegex },
    { "ExpenseType.name": searchRegex },
  ];
  const joinState = {
    $lookup: { from: "expensetypes", localField: "ExpenseTypeId", foreignField: "_id", as: "ExpenseType" },
  };
  // service
  const result = await ExpenseServices.listWithOneJoin(req, ExpenseModel, searchArray, joinState);

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "Expense List Retrieved Successfully",
    data: result,
  });
});

module.exports = {
  createExpenseType,
  updateExpenseType,
  createExpense,
  updateExpense,
  expenseList,
};
