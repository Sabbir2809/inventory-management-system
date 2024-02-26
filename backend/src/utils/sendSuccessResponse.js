const sendSuccessResponse = (res, data) => {
  res.status(data.statusCode).json({
    success: true,
    message: data.message,
    data: data.data,
  });
};

module.exports = sendSuccessResponse;
