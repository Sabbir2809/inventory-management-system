// Dependencies
const express = require("express");
const globalRouter = express.Router();

const routes = [
  // {
  //   path: "/",
  //   route: ,
  // },
];

routes.forEach((route) => {
  globalRouter.use(route?.path, route?.route);
});

// Exports
module.exports = globalRouter;
