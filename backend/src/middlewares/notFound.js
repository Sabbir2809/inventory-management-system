const notFound = (req, res, next) => {
  return res.status(404).json({
    success: false,
    message: "API NOT FOUND!",
    error: {
      path: req.originalUrl,
      message: "Your Requested Path is Not Found!",
    },
  });
};

module.exports = notFound;
