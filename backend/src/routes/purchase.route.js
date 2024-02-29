const express = require("express");
const purchaseRoutes = express.Router();
const PurchaseControllers = require("../controllers/purchase.controller");
const checkAuth = require("../middlewares/checkAuth");
const { USER_ROLE } = require("../constants/user.constants");

purchaseRoutes.post("/create", checkAuth(USER_ROLE.user), PurchaseControllers.createPurchase);
purchaseRoutes.get(
  "/:pageNumber/:perPage/:searchKeyword",
  checkAuth(USER_ROLE.user),
  PurchaseControllers.purchaseList
);
purchaseRoutes.get("/:id", checkAuth(USER_ROLE.user), PurchaseControllers.deletePurchase);

module.exports = purchaseRoutes;
