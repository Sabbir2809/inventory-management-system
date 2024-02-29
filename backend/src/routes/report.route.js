// Dependencies
const express = require("express");
const expenseRoutes = express.Router();

const ExpenseControllers = require("../controllers/report.controller");
const checkAuth = require("../middlewares/checkAuth");
const { USER_ROLE } = require("../constants/user.constants");

expenseRoutes.post("/expense-by-date", checkAuth(USER_ROLE.user), ExpenseControllers.expenseByDate);

// Exports
module.exports = expenseRoutes;
