const catchAsync = require("../utils/catchAsync");
const sendSuccessResponse = require("../utils/sendSuccessResponse");
const ProductServices = require("../services/common.service");
const ProductModel = require("../models/product.model");

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

module.exports = {
  createProduct,
  updateProduct,
  productList,
};
