const notFound = (req, res, next) => {
  return res.status(404).json({
    success: false,
    message: "API Endpoints Not Found!",
  });
};

module.exports = notFound;
