const express = require("express");
const supplierRoutes = express.Router();
const SupplierControllers = require("../controllers/supplier.controller");
const checkAuth = require("../middlewares/checkAuth");
const { USER_ROLE } = require("../constants/user.constants");

supplierRoutes.post("/create", checkAuth(USER_ROLE.user), SupplierControllers.createSupplier);
supplierRoutes.get(
  "/:pageNumber/:perPage/:searchKeyword",
  checkAuth(USER_ROLE.user),
  SupplierControllers.brandList
);
supplierRoutes.put("/:id", checkAuth(USER_ROLE.user), SupplierControllers.updateSupplier);
supplierRoutes.get("/dropdown", checkAuth(USER_ROLE.user), SupplierControllers.brandDropDown);

module.exports = supplierRoutes;
