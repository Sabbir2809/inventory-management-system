const handleZodError = (error) => {
  const statusCode = 400;
  const errorMessage = error.errors.map((item) => `${item.path}, ${item.message}`).toString();

  return {
    statusCode,
    message: "Validation Error",
    errorMessage,
    errorDetails: error,
  };
};

module.exports = handleZodError;
