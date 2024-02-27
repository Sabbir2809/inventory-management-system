// Dependencies
const express = require("express");
const globalRouter = express.Router();

const UserRoutes = require("./user.route");
const BrandRoutes = require("./brand.route");

const routes = [
  {
    path: "/auth",
    route: UserRoutes,
  },
  {
    path: "/brand",
    route: BrandRoutes,
  },
];

routes.forEach((route) => {
  globalRouter.use(route.path, route.route);
});

// Exports
module.exports = globalRouter;
