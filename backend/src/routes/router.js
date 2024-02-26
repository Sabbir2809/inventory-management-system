// Dependencies
const express = require("express");
const UserRoutes = require("./user.route");
const globalRouter = express.Router();

const routes = [
  {
    path: "/auth",
    route: UserRoutes,
  },
];

routes.forEach((route) => {
  globalRouter.use(route.path, route.route);
});

// Exports
module.exports = globalRouter;
