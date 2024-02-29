const catchAsync = require("../utils/catchAsync");
const sendSuccessResponse = require("../utils/sendSuccessResponse");
const ExpenseReportServices = require("../services/report.service");

const expenseByDate = catchAsync(async (req, res) => {
  // service
  const result = await ExpenseReportServices.expenseReport(req);

  // send response
  sendSuccessResponse(res, {
    statusCode: 200,
    success: true,
    message: "Expense By Date Successfully",
    data: result,
  });
});

module.exports = {
  expenseByDate,
};
