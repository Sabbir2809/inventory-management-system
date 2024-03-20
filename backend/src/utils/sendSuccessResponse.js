const sendSuccessResponse = (res, data) => {
  res.status(data.statusCode).json({
    success: true,
    message: data.message,
    meta: data.meta,
    data: data.data,
  });
};

module.exports = sendSuccessResponse;
