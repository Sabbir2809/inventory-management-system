const express = require("express");
const expenseRoutes = express.Router();
const ExpenseControllers = require("../controllers/expense.controller");
const checkAuth = require("../middlewares/checkAuth");
const { USER_ROLE } = require("../constants/user.constants");

expenseRoutes.post("/create", checkAuth(USER_ROLE.user), ExpenseControllers.createExpense);
expenseRoutes.patch("/:id", checkAuth(USER_ROLE.user), ExpenseControllers.updateExpense);
expenseRoutes.post("/create-type", checkAuth(USER_ROLE.user), ExpenseControllers.createExpenseType);
expenseRoutes.get("/dropdown", checkAuth(USER_ROLE.user), ExpenseControllers.expenseTypeList);
expenseRoutes.patch("/type/:id", checkAuth(USER_ROLE.user), ExpenseControllers.updateExpenseType);
expenseRoutes.get(
  "/:pageNumber/:perPage/:searchKeyword",
  checkAuth(USER_ROLE.user),
  ExpenseControllers.expenseList
);

expenseRoutes.get("/details/:id", checkAuth(USER_ROLE.user), ExpenseControllers.expenseDetails);
expenseRoutes.delete("/:id", checkAuth(USER_ROLE.user), ExpenseControllers.deleteExpense);

module.exports = expenseRoutes;
