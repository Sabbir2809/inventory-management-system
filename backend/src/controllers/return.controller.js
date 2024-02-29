const catchAsync = require("../utils/catchAsync");
const sendSuccessResponse = require("../utils/sendSuccessResponse");
const ReturnServices = require("../services/common.service");
const ReturnSummaryModel = require("../models/returnSummary.model");
const ReturnModel = require("../models/return.model");

const createReturn = catchAsync(async (req, res) => {
  // service
  const result = await ReturnServices.multipleCreate(req, ReturnSummaryModel, ReturnModel, "ReturnSummaryId");

  // send response
  sendSuccessResponse(res, {
    statusCode: 201,
    success: true,
    message: "Create Return Successfully",
    data: result,
  });
});

const returnList = catchAsync(async (req, res) => {
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
  const result = await ReturnServices.list(req, ReturnSummaryModel, searchArray, [joinStage1]);

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "Return List Retrieved Successfully",
    data: result,
  });
});

module.exports = {
  createReturn,
  returnList,
};
