const notFound = (req, res, next) => {
  return res.status(404).json({
    success: false,
    message: `Route Not Found! for ${req.originalUrl}`,
  });
};

module.exports = notFound;
