const catchAsync = require("../utils/catchAsync");
const sendSuccessResponse = require("../utils/sendSuccessResponse");
const ReportServices = require("../services/report.service");
const PurchaseModel = require("../models/purchase.model");
const ReturnModel = require("../models/return.model");
const SellModel = require("../models/sell.model");

const expenseReport = catchAsync(async (req, res) => {
  // service
  const result = await ReportServices.expenseReport(req);

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "Expense Report Retrieved Successfully",
    data: result,
  });
});

const purchaseReport = catchAsync(async (req, res) => {
  // service
  const result = await ReportServices.reportGenerate(req, PurchaseModel);

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "Purchase Report Retrieved Successfully",
    data: result,
  });
});

const sellReport = catchAsync(async (req, res) => {
  // service
  const result = await ReportServices.reportGenerate(req, SellModel);

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "Sell Report Retrieved Successfully",
    data: result,
  });
});

const returnReport = catchAsync(async (req, res) => {
  // service
  const result = await ReportServices.reportGenerate(req, ReturnModel);

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "Return Report Retrieved Successfully",
    data: result,
  });
});

module.exports = {
  expenseReport,
  purchaseReport,
  sellReport,
  returnReport,
};
