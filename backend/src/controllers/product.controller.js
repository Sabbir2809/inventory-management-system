const catchAsync = require("../utils/catchAsync");
const sendSuccessResponse = require("../utils/sendSuccessResponse");
const ProductServices = require("../services/common.service");
const ProductModel = require("../models/product.model");
const AppError = require("../errors/AppError");
const { Types } = require("mongoose");
const Return = require("../models/return.model");
const Sell = require("../models/sell.model");
const Purchase = require("../models/purchase.model");

const createProduct = catchAsync(async (req, res) => {
  // service
  const result = await ProductServices.create(req, ProductModel);

  // send response
  sendSuccessResponse(res, {
    statusCode: 201,
    success: true,
    message: "Create Product Successfully",
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  // service
  const result = await ProductServices.update(req, ProductModel);

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product Update Successfully",
    data: result,
  });
});

const productList = catchAsync(async (req, res) => {
  const searchRegex = { $regex: req.params.searchKeyword, $options: "i" };
  const searchArray = [
    { name: searchRegex },
    { unit: searchRegex },
    { details: searchRegex },
    { "Brand.name": searchRegex },
    { "Category.name": searchRegex },
  ];
  const joinStage1 = {
    $lookup: { from: "brands", localField: "BrandId", foreignField: "_id", as: "Brand" },
  };
  const joinStage2 = {
    $lookup: { from: "categories", localField: "CategoryId", foreignField: "_id", as: "Category" },
  };
  // service
  const result = await ProductServices.list(req, ProductModel, searchArray, [joinStage1, joinStage2]);

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product List Retrieved Successfully",
    data: result,
  });
});

const productDetails = catchAsync(async (req, res) => {
  // service
  const result = await ProductServices.details(req, ProductModel);

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category Details Retrieved Successfully",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  // Check if there are associated products
  const isReturnAssociated = await ProductServices.checkAssociate(
    { ProductId: new Types.ObjectId(req.params.id) },
    Return
  );
  const isPurchaseAssociated = await ProductServices.checkAssociate(
    { ProductId: new Types.ObjectId(req.params.id) },
    Purchase
  );
  const isSellAssociated = await ProductServices.checkAssociate(
    { ProductId: new Types.ObjectId(req.params.id) },
    Sell
  );
  if (isReturnAssociated) {
    throw new AppError(400, "Associated with Return Found");
  } else if (isPurchaseAssociated) {
    throw new AppError(400, "Associated with Purchase Found");
  } else if (isSellAssociated) {
    throw new AppError(400, "Associated with Sell Found");
  }
  // Remove the brand
  const result = await ProductServices.remove(req, ProductModel);
  // Send success response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "Customer deleted successfully",
    data: result,
  });
});

module.exports = {
  createProduct,
  updateProduct,
  productList,
  productDetails,
  deleteProduct,
};
