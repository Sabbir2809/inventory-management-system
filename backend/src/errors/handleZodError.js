const handleZodError = (error) => {
  const statusCode = 400;

  const errorSources = error.issues.map((issue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  return {
    statusCode,
    message: "Validation Error",
    errorSources,
  };
};

module.exports = handleZodError;
