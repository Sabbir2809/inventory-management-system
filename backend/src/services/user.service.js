const config = require("../config");
const AppError = require("../errors/AppError");
const User = require("../models/user");
const { comparePassword, createToken, hashPassword } = require("../utils/helper");

// create user
const createUserIntoDB = async (payload) => {
  // checking if the user is exist
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new AppError(403, "This User is Already Exists!");
  }

  // Hashing Password before store user data
  const hashedPassword = await hashPassword(payload.password);

  // user data save into db
  const result = await User.create({
    ...payload,
    password: hashedPassword,
  });

  return result;
};

// user Login
const userLogin = async (payload) => {
  const { email, password } = payload;

  // checking if the user is exist
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(403, "Oops! Access denied. User profile not found.");
  }

  // checking if the password is correct
  const isCorrectPassword = await comparePassword(password, user.password);
  if (!isCorrectPassword) {
    throw new AppError(403, "Password do not Matched!");
  }

  // create JWT token and sent to the client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
    email: user.email,
  };
  // access token
  const accessToken = createToken(jwtPayload, config.jwt_access_secret, config.jwt_access_expires_in_secret);
  // refresh token
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in_secret
  );

  return {
    accessToken,
    refreshToken,
  };
};

// user details
const userDetailsFromDB = async (userEmail) => {
  const result = await User.findOne({
    email: userEmail,
  });
  return result;
};

// user update FromDB
const userUpdateFromDB = async (email, payload) => {
  const result = await User.findOneAndUpdate(email, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

module.export = {
  createUserIntoDB,
  userLogin,
  userDetailsFromDB,
  userUpdateFromDB,
};
