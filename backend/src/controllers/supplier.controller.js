const catchAsync = require("../utils/catchAsync");
const sendSuccessResponse = require("../utils/sendSuccessResponse");
const SupplierServices = require("../services/common.service");
const SupplierModel = require("../models/supplier.model");

const createSupplier = catchAsync(async (req, res) => {
  // service
  const result = await SupplierServices.create(req, SupplierModel);

  // send response
  sendSuccessResponse(res, {
    statusCode: 201,
    success: true,
    message: "Create Supplier Successfully",
    data: result,
  });
});

const updateSupplier = catchAsync(async (req, res) => {
  // service
  const result = await SupplierServices.update(req, SupplierModel);

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "Supplier Update Successfully",
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
  const result = await SupplierServices.list(req, SupplierModel, searchArray);

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "Supplier List Retrieved Successfully",
    data: result,
  });
});

const brandDropDown = catchAsync(async (req, res) => {
  const projection = { _id: 1, name: 1 };
  // service
  const result = await SupplierServices.dropDown(req, SupplierModel, projection);

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "Supplier Drop Down Retrieved Successfully",
    data: result,
  });
});

module.exports = {
  createSupplier,
  updateSupplier,
  brandList,
  brandDropDown,
};
