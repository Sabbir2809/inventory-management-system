const handleValidationError = (error) => {
  const statusCode = 400;

  const errorSources = Object.values(error.errors).map((val) => {
    return {
      path: val?.path,
      message: val?.message,
    };
  });

  return {
    statusCode,
    message: "Validation Error",
    errorSources,
  };
};

module.exports = handleValidationError;
