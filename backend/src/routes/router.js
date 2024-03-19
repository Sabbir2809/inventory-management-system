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
const SellRoutes = require("./sell.route");
const ReturnRoutes = require("./return.route");
const ReportRoutes = require("./report.route");
const SummaryRoutes = require("./summary.route");

const moduleRoutes = [
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
  {
    path: "/sell",
    route: SellRoutes,
  },
  {
    path: "/return",
    route: ReturnRoutes,
  },
  {
    path: "/report",
    route: ReportRoutes,
  },
  {
    path: "/summary",
    route: SummaryRoutes,
  },
];

moduleRoutes.forEach((route) => {
  globalRouter.use(route.path, route.route);
});

// Exports
module.exports = globalRouter;
