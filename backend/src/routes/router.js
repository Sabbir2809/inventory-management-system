// Dependencies
const express = require("express");
const globalRouter = express.Router();

const UserRoutes = require("./user.route");
const BrandRoutes = require("./brand.route");
const CategoryRoutes = require("./category.route");
const CustomerRoutes = require("./customer.route");
const SupplierRoutes = require("./supplier.route");
const ExpenseRoutes = require("./expense.route");
const ProductRoutes = require("./product.route");
const PurchaseRoutes = require("./purchase.route");

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
  {
    path: "/expense",
    route: ExpenseRoutes,
  },
  {
    path: "/product",
    route: ProductRoutes,
  },
  {
    path: "/purchase",
    route: PurchaseRoutes,
  },
];

routes.forEach((route) => {
  globalRouter.use(route.path, route.route);
});

// Exports
module.exports = globalRouter;
