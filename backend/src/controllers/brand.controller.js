const catchAsync = require("../utils/catchAsync");
const sendSuccessResponse = require("../utils/sendSuccessResponse");
const BrandServices = require("../services/common.service");
const BrandModel = require("../models/brand.model");
const Product = require("../models/product.model");
const AppError = require("../errors/AppError");
const { Types } = require("mongoose");

const createBrand = catchAsync(async (req, res) => {
  // service
  const result = await BrandServices.create(req, BrandModel);

  // send response
  sendSuccessResponse(res, {
    statusCode: 201,
    success: true,
    message: "Create Brand Successfully",
    data: result,
  });
});

const updateBrand = catchAsync(async (req, res) => {
  // service
  const result = await BrandServices.update(req, BrandModel);

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "Brand Update Successfully",
    data: result,
  });
});

const brandList = catchAsync(async (req, res) => {
  const searchRegex = { $regex: req.params.searchKeyword, $options: "i" };
  const searchArray = [{ name: searchRegex }];
  // service
  const result = await BrandServices.list(req, BrandModel, searchArray);

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "Brand List Retrieved Successfully",
    data: result,
  });
});

const brandDropDown = catchAsync(async (req, res) => {
  const projection = { _id: 1, name: 1 };
  // service
  const result = await BrandServices.dropDown(req, BrandModel, projection);

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "Brand Drop Down Retrieved Successfully",
    data: result,
  });
});

const deleteBrand = catchAsync(async (req, res) => {
  // Check if there are associated products
  const isAssociated = await BrandServices.checkAssociate(
    { BrandId: new Types.ObjectId(req.params.id) },
    Product
  );
  if (isAssociated) {
    throw new AppError(400, "Associated with Product Found");
  }
  // Remove the brand
  const result = await BrandServices.remove(req, BrandModel);
  // Send success response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "Brand deleted successfully",
    data: result,
  });
});

module.exports = {
  createBrand,
  updateBrand,
  brandList,
  brandDropDown,
  deleteBrand,
};
