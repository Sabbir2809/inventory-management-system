const handleDuplicateError = (error) => {
  const statusCode = 400;

  const match = error.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];

  const errorSources = [
    {
      path: "",
      message: `${extractedMessage} is already exits`,
    },
  ];

  return {
    statusCode,
    message: "Invalid Id",
    errorSources,
  };
};

module.exports = handleDuplicateError;
