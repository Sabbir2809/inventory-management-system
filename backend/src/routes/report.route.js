// Dependencies
const express = require("express");
const expenseRoutes = express.Router();

const ExpenseControllers = require("../controllers/report.controller");
const checkAuth = require("../middlewares/checkAuth");
const { USER_ROLE } = require("../constants/user.constants");

expenseRoutes.post("/expense", checkAuth(USER_ROLE.user), ExpenseControllers.expenseReport);
expenseRoutes.post("/purchase", checkAuth(USER_ROLE.user), ExpenseControllers.purchaseReport);
expenseRoutes.post("/sell", checkAuth(USER_ROLE.user), ExpenseControllers.sellReport);
expenseRoutes.post("/return", checkAuth(USER_ROLE.user), ExpenseControllers.returnReport);

// Exports
module.exports = expenseRoutes;
