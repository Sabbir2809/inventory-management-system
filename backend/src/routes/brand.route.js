const express = require("express");
const brandRoutes = express.Router();
const BrandControllers = require("../controllers/brand.controller");
const checkAuth = require("../middlewares/checkAuth");
const { USER_ROLE } = require("../constants/user.constants");

brandRoutes.post("/create", checkAuth(USER_ROLE.user), BrandControllers.createBrand);
brandRoutes.get(
  "/:pageNumber/:perPage/:searchKeyword",
  checkAuth(USER_ROLE.user),
  BrandControllers.brandList
);
brandRoutes.get("/details/:id", checkAuth(USER_ROLE.user), BrandControllers.brandDetails);
brandRoutes.put("/:id", checkAuth(USER_ROLE.user), BrandControllers.updateBrand);
brandRoutes.get("/dropdown", checkAuth(USER_ROLE.user), BrandControllers.brandDropDown);
brandRoutes.delete("/:id", checkAuth(USER_ROLE.user), BrandControllers.deleteBrand);

module.exports = brandRoutes;
