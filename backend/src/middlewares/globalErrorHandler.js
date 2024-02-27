const config = require("../config");
const handleZodError = require("../errors/handleZodError");
const AppError = require("../errors/AppError");
const handleCastError = require("../errors/handleCastError");
const handleDuplicateError = require("../errors/handleDuplicateError");
const handleValidationError = require("../errors/handleValidationError");
const { ZodError } = require("zod");

const globalErrorHandler = (error, req, res, next) => {
  // default object
  const errorResponse = {
    statusCode: error.statusCode || 500,
    message: "Internal Server Error",
    errorMessage: error.message,
    errorDetails: error.errors,
    stack: config.node_dev === "development" ? error?.stack : null,
  };

  // ZodError
  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    errorResponse.statusCode = simplifiedError?.statusCode;
    errorResponse.message = simplifiedError?.message;
    errorResponse.errorMessage = simplifiedError?.errorMessage;
    errorResponse.errorDetails = simplifiedError?.errorDetails;
  }
  // ValidationError
  else if (error?.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    errorResponse.statusCode = simplifiedError?.statusCode;
    errorResponse.message = simplifiedError?.message;
    errorResponse.errorDetails = simplifiedError?.errorDetails;
  }
  // CastError
  else if (error?.name === "CastError") {
    const simplifiedError = handleCastError(error);
    errorResponse.statusCode = simplifiedError?.statusCode;
    errorResponse.message = simplifiedError?.errorMessage;
    errorResponse.errorDetails = simplifiedError?.errorDetails;
  }
  // DuplicateError
  else if (error?.code === 11000) {
    const simplifiedError = handleDuplicateError(error);
    errorResponse.statusCode = simplifiedError?.statusCode;
    errorResponse.message = simplifiedError?.message;
    errorResponse.errorMessage = simplifiedError?.errorMessage;
    errorResponse.errorDetails = simplifiedError?.errorDetails;
  }
  // AppError
  else if (error instanceof AppError) {
    errorResponse.statusCode = error.statusCode;
    errorResponse.message = error?.message;
    errorResponse.errorDetails = [
      {
        path: "",
        message: error?.message,
      },
    ];
  }

  // response error
  return res.status(errorResponse.statusCode).json({
    success: false,
    message: errorResponse.message,
    errorMessage: errorResponse.errorMessage,
    errorDetails: errorResponse.errorDetails,
    stack: errorResponse.stack,
  });
};

module.exports = globalErrorHandler;
