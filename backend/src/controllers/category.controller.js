const catchAsync = require("../utils/catchAsync");
const sendSuccessResponse = require("../utils/sendSuccessResponse");
const CategoryServices = require("../services/common.service");
const CategoryModel = require("../models/category.model");
const { Types } = require("mongoose");
const AppError = require("../errors/AppError");
const Product = require("../models/product.model");

const createCategory = catchAsync(async (req, res) => {
  // service
  const result = await CategoryServices.create(req, CategoryModel);

  // send response
  sendSuccessResponse(res, {
    statusCode: 201,
    success: true,
    message: "Create Category Successfully",
    data: result,
  });
});

const updateCategory = catchAsync(async (req, res) => {
  // service
  const result = await CategoryServices.update(req, CategoryModel);

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category Update Successfully",
    data: result,
  });
});

const brandList = catchAsync(async (req, res) => {
  const searchRegex = { $regex: req.params.searchKeyword, $options: "i" };
  const searchArray = [{ name: searchRegex }];
  // service
  const result = await CategoryServices.list(req, CategoryModel, searchArray);

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category List Retrieved Successfully",
    data: result,
  });
});

const brandDropDown = catchAsync(async (req, res) => {
  const projection = { _id: 1, name: 1 };
  // service
  const result = await CategoryServices.dropDown(req, CategoryModel, projection);

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category Drop Down Retrieved Successfully",
    data: result,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  // Check if there are associated products
  const isAssociated = await CategoryServices.checkAssociate(
    { CategoryId: new Types.ObjectId(req.params.id) },
    Product
  );
  if (isAssociated) {
    throw new AppError(400, "Associated with Product Found");
  }
  // Remove the brand
  const result = await CategoryServices.remove(req, CategoryModel);
  // Send success response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category deleted successfully",
    data: result,
  });
});

module.exports = {
  createCategory,
  updateCategory,
  brandList,
  brandDropDown,
  deleteCategory,
};
