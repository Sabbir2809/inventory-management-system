const AppError = require("../errors/AppError");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");
const config = require("../config");
const { verifyToken } = require("../utils/helper");

const checkAuth = (...roles) => {
  return catchAsync(async (req, res, next) => {
    // token
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(403, "Invalid Token");
    }

    const decodedToken = verifyToken(token, config.jwt_access_secret);

    const { id } = decodedToken;

    // find valid user
    const user = await User.findOne({ _id: id });

    req.user = decodedToken;

    // authentication
    if (!user) {
      throw new AppError(403, "Invalid Email or password");
    }

    // authorization
    if (!roles.includes(user?.role)) {
      throw new AppError(403, "Your are not authorized");
    }
    next();
  });
};

module.exports = checkAuth;
