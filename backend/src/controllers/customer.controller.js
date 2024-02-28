const catchAsync = require("../utils/catchAsync");
const sendSuccessResponse = require("../utils/sendSuccessResponse");
const CustomerServices = require("../services/common.service");
const CustomerModel = require("../models/customer.model");

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

const brandList = catchAsync(async (req, res) => {
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

const brandDropDown = catchAsync(async (req, res) => {
  const projection = { _id: 1, name: 1 };
  // service
  const result = await CustomerServices.dropDown(req, CustomerModel, projection);

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "Customer Drop Down Retrieved Successfully",
    data: result,
  });
});

module.exports = {
  createCustomer,
  updateCustomer,
  brandList,
  brandDropDown,
};
