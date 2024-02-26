const jwt = require("jsonwebtoken");
const config = require("../config");
const bcrypt = require("bcrypt");

// create jwt token
const createToken = (JwtPayload, secret, expiresIn) => {
  return jwt.sign(JwtPayload, secret, { expiresIn });
};

// verify jwt token
const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

// bcrypt hash password
const hashPassword = async (password) => {
  return await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
};

// bcrypt compare password
const comparePassword = async (plainTextPassword, hashedPassword) => {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

module.exports = {
  createToken,
  verifyToken,
  hashPassword,
  comparePassword,
};
