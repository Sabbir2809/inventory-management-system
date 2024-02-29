const express = require("express");
const categoryRoutes = express.Router();
const CategoryControllers = require("../controllers/category.controller");
const checkAuth = require("../middlewares/checkAuth");
const { USER_ROLE } = require("../constants/user.constants");

categoryRoutes.post("/create", checkAuth(USER_ROLE.user), CategoryControllers.createCategory);
categoryRoutes.get(
  "/:pageNumber/:perPage/:searchKeyword",
  checkAuth(USER_ROLE.user),
  CategoryControllers.brandList
);
categoryRoutes.put("/:id", checkAuth(USER_ROLE.user), CategoryControllers.updateCategory);
categoryRoutes.get("/dropdown", checkAuth(USER_ROLE.user), CategoryControllers.brandDropDown);
categoryRoutes.delete("/:id", checkAuth(USER_ROLE.user), CategoryControllers.deleteCategory);

module.exports = categoryRoutes;
