const catchAsync = require("../utils/catchAsync");
const sendSuccessResponse = require("../utils/sendSuccessResponse");
const SellServices = require("../services/common.service");
const SellSummaryModel = require("../models/sellSummary.model");
const SellModel = require("../models/sell.model");

const createSell = catchAsync(async (req, res) => {
  // service
  const result = await SellServices.multipleCreate(req, SellSummaryModel, SellModel, "SellSummaryId");

  // send response
  sendSuccessResponse(res, {
    statusCode: 201,
    success: true,
    message: "Create Sell Successfully",
    data: result,
  });
});

const sellList = catchAsync(async (req, res) => {
  const searchRegex = { $regex: req.params.searchKeyword, $options: "i" };
  const searchArray = [
    { note: searchRegex },
    { "Customers.name": searchRegex },
    { "Customers.email": searchRegex },
    { "Customers.mobile": searchRegex },
    { "Customers.address": searchRegex },
  ];
  const joinStage1 = {
    $lookup: { from: "customers", localField: "CustomerId", foreignField: "_id", as: "Customers" },
  };

  // service
  const result = await SellServices.list(req, SellSummaryModel, searchArray, [joinStage1]);

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "Sell List Retrieved Successfully",
    data: result,
  });
});

module.exports = {
  createSell,
  sellList,
};
