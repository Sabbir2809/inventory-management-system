const catchAsync = require("../utils/catchAsync");
const sendSuccessResponse = require("../utils/sendSuccessResponse");
const PurchaseServices = require("../services/common.service");
const PurchaseSummaryModel = require("../models/purchaseSummary.model");
const PurchaseModel = require("../models/purchase.model");

const createPurchase = catchAsync(async (req, res) => {
  // service
  const result = await PurchaseServices.multipleCreate(
    req,
    PurchaseSummaryModel,
    PurchaseModel,
    "PurchaseSummaryId"
  );

  // send response
  sendSuccessResponse(res, {
    statusCode: 201,
    success: true,
    message: "Create Purchase Successfully",
    data: result,
  });
});

const purchaseList = catchAsync(async (req, res) => {
  const searchRegex = { $regex: req.params.searchKeyword, $options: "i" };
  const searchArray = [
    { note: searchRegex },
    { "Suppliers.name": searchRegex },
    { "Suppliers.email": searchRegex },
    { "Suppliers.mobile": searchRegex },
    { "Suppliers.address": searchRegex },
  ];
  const joinStage1 = {
    $lookup: { from: "suppliers", localField: "SupplierId", foreignField: "_id", as: "Suppliers" },
  };

  // service
  const result = await PurchaseServices.list(req, PurchaseSummaryModel, searchArray, [joinStage1]);

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "Purchase List Retrieved Successfully",
    meta: result.meta,
    data: result.data,
  });
});

const deletePurchase = catchAsync(async (req, res) => {
  // service
  const result = await PurchaseServices.multipleDelete(
    req,
    PurchaseSummaryModel,
    PurchaseModel,
    "PurchaseSummaryId"
  );

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "Delete Purchase Successfully",
    data: result,
  });
});

module.exports = {
  createPurchase,
  purchaseList,
  deletePurchase,
};
