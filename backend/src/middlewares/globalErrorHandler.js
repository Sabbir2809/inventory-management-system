const config = require("../config");
const handleZodError = require("../errors/handleZodError");
const AppError = "../errors/AppError";
const handleCastError = "../errors/handleCastError";
const handleDuplicateError = "../errors/handleDuplicateError";
const handleValidationError = "../errors/handleValidationError";

const globalErrorHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = "Something Went Wrong!";

  let errorSources = [
    {
      path: "",
      message: "Something Went Wrong!",
    },
  ];

  if (error instanceof handleZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (error?.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (error?.name === "CastError") {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (error?.code === 11000) {
    const simplifiedError = handleDuplicateError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (error instanceof AppError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorSources = [
      {
        path: "",
        message: error?.message,
      },
    ];
  } else if (error instanceof Error) {
    message = error?.message;
    errorSources = [
      {
        path: "",
        message: error?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_DEV === "development" ? error?.stack : null,
  });
};

module.exports = globalErrorHandler;
