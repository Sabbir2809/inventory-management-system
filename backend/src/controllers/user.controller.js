const config = require("../config");
const UserServices = require("../services/user.service");
const catchAsync = require("../utils/catchAsync");
const sendSuccessResponse = require("../utils/sendSuccessResponse");

const userRegistration = catchAsync(async (req, res) => {
  // service
  const result = await UserServices.createUserIntoDB(req.body);

  // send response
  sendSuccessResponse(res, {
    statusCode: 201,
    success: true,
    message: "User Registered successfully",
    data: result,
  });
});

const userLogin = catchAsync(async (req, res) => {
  // service
  const result = await UserServices.userLogin(req.body);
  const { refreshToken, accessToken } = result;

  // cookie
  res.cookie("refreshToken", refreshToken, {
    secure: config.node_dev === "production",
    httpOnly: true,
  });

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Login successfully",
    data: { accessToken },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  // service
  const result = await UserServices.refreshToken(refreshToken);

  // send response
  sendSuccessResponse(res, {
    statusCode: 201,
    success: true,
    message: "Access token is retrieved Successfully",
    data: result,
  });
});

const userProfileDetails = catchAsync(async (req, res) => {
  const { email } = req.user;
  // service
  const result = await UserServices.userProfileDetailsFromDB(email);

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Details Retrieved successfully",
    data: result,
  });
});

const userProfileUpdate = catchAsync(async (req, res) => {
  const { email } = req.user;
  // service
  const result = await UserServices.userProfileUpdateIntoDB(email, req.body);

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Profile Updated successfully",
    data: result,
  });
});

const verifyEmail = catchAsync(async (req, res) => {
  const { email } = req.body;
  // service
  const result = await UserServices.verifyEmail(email);

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "Reset link is generated Successfully",
    data: result,
  });
});

const verifyOTP = catchAsync(async (req, res) => {
  const { email, otp } = req.body;
  // service
  const result = await UserServices.verifyOTP(email, otp);

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "User OTP Verify successfully",
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  // service
  const result = await UserServices.forgetPassword(req.body);

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Password Reset successfully",
    data: result,
  });
});

module.exports = {
  userRegistration,
  userLogin,
  refreshToken,
  userProfileDetails,
  userProfileUpdate,
  verifyEmail,
  verifyOTP,
  forgetPassword,
};
