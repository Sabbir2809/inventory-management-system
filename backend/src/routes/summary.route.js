// Dependencies
const express = require("express");
const summaryRoutes = express.Router();

const SummaryControllers = require("../controllers/summary.controller");
const checkAuth = require("../middlewares/checkAuth");
const { USER_ROLE } = require("../constants/user.constants");

summaryRoutes.get("/expense", checkAuth(USER_ROLE.user), SummaryControllers.expenseSummary);
summaryRoutes.get("/purchase", checkAuth(USER_ROLE.user), SummaryControllers.purchaseSummary);
summaryRoutes.get("/sell", checkAuth(USER_ROLE.user), SummaryControllers.sellSummary);
summaryRoutes.get("/return", checkAuth(USER_ROLE.user), SummaryControllers.returnSummary);

// Exports
module.exports = summaryRoutes;
