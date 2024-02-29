const catchAsync = require("../utils/catchAsync");
const sendSuccessResponse = require("../utils/sendSuccessResponse");
const CustomerServices = require("../services/common.service");
const CustomerModel = require("../models/customer.model");
const AppError = require("../errors/AppError");
const { Types } = require("mongoose");
const SellSummary = require("../models/sellSummary.model");

const createCustomer = catchAsync(async (req, res) => {
  // service
  const result = await CustomerServices.create(req, CustomerModel);

  // send response
  sendSuccessResponse(res, {
    statusCode: 201,
    success: true,
    message: "Create Customer Successfully",
    data: result,
  });
});

const updateCustomer = catchAsync(async (req, res) => {
  // service
  const result = await CustomerServices.update(req, CustomerModel);

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "Customer Update Successfully",
    data: result,
  });
});

const customerList = catchAsync(async (req, res) => {
  const searchRegex = { $regex: req.params.searchKeyword, $options: "i" };
  const searchArray = [
    { name: searchRegex },
    { mobile: searchRegex },
    { email: searchRegex },
    { address: searchRegex },
  ];
  // service
  const result = await CustomerServices.list(req, CustomerModel, searchArray);

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "Customer List Retrieved Successfully",
    data: result,
  });
});

const customerDetails = catchAsync(async (req, res) => {
  // service
  const result = await CustomerServices.details(req, CustomerModel);

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category Details Retrieved Successfully",
    data: result,
  });
});

const customerDropDown = catchAsync(async (req, res) => {
  const projection = { _id: 1, name: 1 };
  // service
  const result = await CustomerServices.dropDown(req, CustomerModel, projection);

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "Customer Dropdown Retrieved Successfully",
    data: result,
  });
});

const deleteCustomer = catchAsync(async (req, res) => {
  // Check if there are associated products
  const isAssociated = await CustomerServices.checkAssociate(
    { CustomerId: new Types.ObjectId(req.params.id) },
    SellSummary
  );
  if (isAssociated) {
    throw new AppError(400, "Associated with Sell Summary Found");
  }
  // Remove the brand
  const result = await CustomerServices.remove(req, CustomerModel);
  // Send success response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "Customer deleted successfully",
    data: result,
  });
});

module.exports = {
  createCustomer,
  updateCustomer,
  customerList,
  customerDetails,
  customerDropDown,
  deleteCustomer,
};
