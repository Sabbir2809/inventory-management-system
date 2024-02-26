const handleCastError = (error) => {
  const statusCode = 400;

  const errorSources = [
    {
      path: error.path,
      message: error.message,
    },
  ];

  return {
    statusCode,
    message: "Invalid Id",
    errorSources,
  };
};
module.exports = handleCastError;
