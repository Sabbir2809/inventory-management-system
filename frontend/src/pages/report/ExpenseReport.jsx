import { Button, Card, Col, Typography } from "antd";
import exportFromJSON from "export-from-json";
import moment from "moment";
import { useState } from "react";
import toast from "react-hot-toast";
import IDatePicker from "../../components/form/IDatePicker";
import IForm from "../../components/form/IForm";
import { useExpenseReportQuery } from "../../redux/features/report/reportApi";

const ExpenseReport = () => {
  const [expenseData, setExpenseData] = useState({
    formDate: moment(new Date()).format("YYYY-MM-DD" + "T00:00:00.000+00:00"),
    toDate: moment(new Date()).format("YYYY-MM-DD" + "T00:00:00.000+00:00"),
  });

  const { data: expenseReportData } = useExpenseReportQuery(expenseData);

  const onsubmit = (data) => {
    if (!data.formDate || !data.toDate) {
      toast.error("Expense Report is Required");
    }

    const options = {
      formDate: moment(new Date(data.formDate)).format("YYYY-MM-DD" + "T00:00:00.000+00:00"),
      toDate: moment(new Date(data.toDate)).format("YYYY-MM-DD" + "T00:00:00.000+00:00"),
    };
    setExpenseData(options);
  };

  const onExport = (exportType, fileName, data) => {
    if (data.length > 0) {
      const finalData = data.map((item) => ({
        Amount: item["amount"],
        Note: item["note"],
        ExpenseType: item["ExpenseType"][0]["name"],
        Date: moment(item?.createdAt).format("MMMM Do YYYY"),
      }));
      exportFromJSON({ data: finalData, fileName, exportType });
    }
  };

  return (
    <Col>
      <Card bordered={true} style={{ marginBottom: 8 }}>
        <Typography.Title level={3}>Generate Expense Report</Typography.Title>
        <Col span={24} lg={12}>
          <IForm onSubmit={onsubmit}>
            <IDatePicker name="formDate" label="Form Date" />
            <IDatePicker name="toDate" label="To Date" />
            <Button htmlType="submit" type="primary" size="large">
              Expense Report
            </Button>
          </IForm>
        </Col>
      </Card>
      {/* download format */}
      {expenseReportData?.data?.rows.length > 0 && (
        <Card bordered={true} style={{ marginBottom: 8 }}>
          <Typography.Title level={3}>Total: {expenseReportData?.data?.total} Tk</Typography.Title>
          <Col span={24} lg={12}>
            <Button
              style={{ marginRight: "10px" }}
              onClick={() => onExport("csv", "Expense-Report", expenseReportData?.data?.rows)}>
              Download CSV
            </Button>
            <Button
              onClick={() => onExport("xls", "Expense-Report", expenseReportData?.data?.rows)}>
              Download XLS
            </Button>
          </Col>
        </Card>
      )}
    </Col>
  );
};
export default ExpenseReport;
