const express = require("express");
const UserRoutes = express.Router();
const UserControllers = require("../controllers/user.controller");
const checkAuth = require("../middlewares/checkAuth");
const { USER_ROLE } = require("../constants/user.constants");

// account
UserRoutes.post("/registration", UserControllers.userRegistration);
UserRoutes.post("/login", UserControllers.userLogin);
UserRoutes.post("/refresh-token", checkAuth(USER_ROLE.user), UserControllers.refreshToken);
// user profile
UserRoutes.get("/profile-details", checkAuth(USER_ROLE.user), UserControllers.userProfileDetails);
UserRoutes.put("/profile-update", checkAuth(USER_ROLE.user), UserControllers.userProfileUpdate);
// forget password
UserRoutes.post("/verify-email", UserControllers.verifyEmail);
UserRoutes.post("/verify-otp", UserControllers.verifyOTP);
UserRoutes.post("/forget-password", UserControllers.forgetPassword);

module.exports = UserRoutes;
