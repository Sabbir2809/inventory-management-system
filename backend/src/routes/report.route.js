// Dependencies
const express = require("express");
const expenseRoutes = express.Router();

const ExpenseControllers = require("../controllers/report.controller");
const checkAuth = require("../middlewares/checkAuth");
const { USER_ROLE } = require("../constants/user.constants");

expenseRoutes.get(
  "/expense/:formDate/:toDate",
  checkAuth(USER_ROLE.user),
  ExpenseControllers.expenseReport
);
expenseRoutes.get(
  "/purchase/:formDate/:toDate",
  checkAuth(USER_ROLE.user),
  ExpenseControllers.purchaseReport
);
expenseRoutes.get(
  "/sell/:formDate/:toDate",
  checkAuth(USER_ROLE.user),
  ExpenseControllers.sellReport
);
expenseRoutes.get(
  "/return/:formDate/:toDate",
  checkAuth(USER_ROLE.user),
  ExpenseControllers.returnReport
);

// Exports
module.exports = expenseRoutes;
