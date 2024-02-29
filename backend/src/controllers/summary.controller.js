const catchAsync = require("../utils/catchAsync");
const sendSuccessResponse = require("../utils/sendSuccessResponse");
const SummaryServices = require("../services/summary.service");
const PurchaseSummaryModel = require("../models/purchaseSummary.model");
const SellSummaryModel = require("../models/sellSummary.model");
const ReturnSummaryModel = require("../models/returnSummary.model");

const expenseSummary = catchAsync(async (req, res) => {
  // service
  const result = await SummaryServices.expenseSummary(req);

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "Expense Summary Successfully",
    data: result,
  });
});

const purchaseSummary = catchAsync(async (req, res) => {
  // service
  const result = await SummaryServices.summaryGenerate(req, PurchaseSummaryModel);

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "Purchase Summary Successfully",
    data: result,
  });
});

const sellSummary = catchAsync(async (req, res) => {
  // service
  const result = await SummaryServices.summaryGenerate(req, SellSummaryModel);

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "Sell Summary Successfully",
    data: result,
  });
});

const returnSummary = catchAsync(async (req, res) => {
  // service
  const result = await SummaryServices.summaryGenerate(req, ReturnSummaryModel);

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "Return Summary Successfully",
    data: result,
  });
});

module.exports = {
  expenseSummary,
  purchaseSummary,
  sellSummary,
  returnSummary,
};
