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

module.exports = {
  createProduct,
  updateProduct,
};
