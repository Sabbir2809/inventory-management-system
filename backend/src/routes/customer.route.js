const express = require("express");
const customerRoutes = express.Router();
const CustomerControllers = require("../controllers/customer.controller");
const checkAuth = require("../middlewares/checkAuth");
const { USER_ROLE } = require("../constants/user.constants");

customerRoutes.post("/create", checkAuth(USER_ROLE.user), CustomerControllers.createCustomer);
customerRoutes.get(
  "/:pageNumber/:perPage/:searchKeyword",
  checkAuth(USER_ROLE.user),
  CustomerControllers.brandList
);
customerRoutes.put("/:id", checkAuth(USER_ROLE.user), CustomerControllers.updateCustomer);
customerRoutes.get("/dropdown", checkAuth(USER_ROLE.user), CustomerControllers.brandDropDown);
customerRoutes.delete("/:id", checkAuth(USER_ROLE.user), CustomerControllers.deleteCustomer);

module.exports = customerRoutes;
