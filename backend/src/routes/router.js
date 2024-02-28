// Dependencies
const express = require("express");
const globalRouter = express.Router();

const UserRoutes = require("./user.route");
const BrandRoutes = require("./brand.route");
const CategoryRoutes = require("./category.route");
const CustomerRoutes = require("./customer.route");
const SupplierRoutes = require("./supplier.route");

const routes = [
  {
    path: "/auth",
    route: UserRoutes,
  },
  {
    path: "/brand",
    route: BrandRoutes,
  },
  {
    path: "/category",
    route: CategoryRoutes,
  },
  {
    path: "/customer",
    route: CustomerRoutes,
  },
  {
    path: "/supplier",
    route: SupplierRoutes,
  },
];

routes.forEach((route) => {
  globalRouter.use(route.path, route.route);
});

// Exports
module.exports = globalRouter;
