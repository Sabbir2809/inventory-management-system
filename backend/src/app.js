// Package Dependencies
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
// import
const notFound = require("./middlewares/notFound");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const globalRouter = require("./routes/router");

// express app instance
const app = express();

// Security Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(helmet());
app.use(hpp());
app.use(mongoSanitize());
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});
app.use(limiter);

// Health API
app.get("/", (req, res) => {
  res.status(200).send("API: Welcome To Inventory Management System");
});

// application routes
app.use("/api/v1", globalRouter);

// global error handling
app.use(globalErrorHandler);
// catch all routes
app.use(notFound);

// Exports
module.exports = app;
