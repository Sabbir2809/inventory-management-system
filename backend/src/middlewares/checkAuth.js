const catchAsync = require("../utils/catchAsync");
const config = require("../config");
const { verifyToken } = require("../utils/helper");
const User = require("../models/user.model");
const AppError = require("../errors/AppError");

const checkAuth = (...requiredRoles) => {
  return catchAsync(async (req, res, next) => {
    // headers token
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(401, "No JWT is provided in the request headers");
    }

    // check if the token is valid
    let decodedToken;
    try {
      decodedToken = verifyToken(token, config.jwt_access_secret);
    } catch (error) {
      throw new AppError(401, "Unauthorized!");
    }

    // decoded token
    const { userId, role, iat } = decodedToken;

    // Expired date
    if (!iat) {
      throw new AppError(401, "The provided JWT (JSON Web Token) has expired");
    }

    // Authentication
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(404, "User Not Found");
    }

    // authorization
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(401, "You are not authorized!");
    }

    // decoded
    req.user = decodedToken;
    next();
  });
};

module.exports = checkAuth;
