// Package Dependencies
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");

// Import Middleware and Routes
const notFound = require("./middlewares/notFound");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const globalRouter = require("./routes/router");

// Express App Instance
const app = express();

// Security Middleware
app.use(helmet());
app.use(cors({ origin: "https://inventory-m-s.netlify.app", credentials: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(hpp());
app.use(mongoSanitize());

// Rate Limiting Middleware
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});
app.use(limiter);

// Health API
app.get("/", (req, res) => {
  res.send("API: Welcome To Inventory Management System");
});

// Application Routes
app.use("/api/v1", globalRouter);

// global error
app.use(globalErrorHandler);
// notFound
app.use(notFound);

// Export the Express App
module.exports = app;
