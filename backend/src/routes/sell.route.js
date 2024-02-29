const express = require("express");
const sellRoutes = express.Router();

const SellControllers = require("../controllers/sell.controller");
const checkAuth = require("../middlewares/checkAuth");
const { USER_ROLE } = require("../constants/user.constants");

sellRoutes.post("/create", checkAuth(USER_ROLE.user), SellControllers.createSell);
sellRoutes.get("/:pageNumber/:perPage/:searchKeyword", checkAuth(USER_ROLE.user), SellControllers.sellList);
sellRoutes.delete("/:id", checkAuth(USER_ROLE.user), SellControllers.deleteSell);

module.exports = sellRoutes;
