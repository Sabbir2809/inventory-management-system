const express = require("express");
const returnRoutes = express.Router();

const ReturnControllers = require("../controllers/return.controller");
const checkAuth = require("../middlewares/checkAuth");
const { USER_ROLE } = require("../constants/user.constants");

returnRoutes.post("/create", checkAuth(USER_ROLE.user), ReturnControllers.createReturn);
returnRoutes.get(
  "/:pageNumber/:perPage/:searchKeyword",
  checkAuth(USER_ROLE.user),
  ReturnControllers.returnList
);
returnRoutes.delete("/:id", checkAuth(USER_ROLE.user), ReturnControllers.deleteReturn);

module.exports = returnRoutes;
