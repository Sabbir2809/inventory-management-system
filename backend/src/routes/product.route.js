const express = require("express");
const productRoutes = express.Router();
const ProductControllers = require("../controllers/product.controller");
const checkAuth = require("../middlewares/checkAuth");
const { USER_ROLE } = require("../constants/user.constants");

productRoutes.post("/create", checkAuth(USER_ROLE.user), ProductControllers.createProduct);
productRoutes.put("/:id", checkAuth(USER_ROLE.user), ProductControllers.updateProduct);
productRoutes.get(
  "/:pageNumber/:perPage/:searchKeyword",
  checkAuth(USER_ROLE.user),
  ProductControllers.productList
);

module.exports = productRoutes;
