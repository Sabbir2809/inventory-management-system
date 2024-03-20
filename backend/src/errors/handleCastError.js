const handleCastError = (error) => {
  const statusCode = 400;
  const errorMessage = error.value;

  return {
    statusCode,
    message: "Invalid ID",
    errorMessage: `${errorMessage}  is not a valid ID!`,
    errorDetails: error,
  };
};
module.exports = handleCastError;
