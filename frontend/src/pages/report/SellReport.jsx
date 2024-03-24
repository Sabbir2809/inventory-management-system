import { Button, Card, Col, Typography } from "antd";
import exportFromJSON from "export-from-json";
import moment from "moment";
import { useState } from "react";
import toast from "react-hot-toast";
import IDatePicker from "../../components/form/IDatePicker";
import IForm from "../../components/form/IForm";
import { useSellReportQuery } from "../../redux/features/report/reportApi";

const SellReport = () => {
  const [expenseData, setSellData] = useState({
    formDate: moment(new Date()).format("YYYY-MM-DD" + "T00:00:00.000+00:00"),
    toDate: moment(new Date()).format("YYYY-MM-DD" + "T00:00:00.000+00:00"),
  });

  const { data: sellReportData } = useSellReportQuery(expenseData);

  const onsubmit = (data) => {
    if (!data.formDate || !data.toDate) {
      return toast.error("Return Report is Required");
    }

    const options = {
      formDate: moment(new Date(data.formDate)).format("YYYY-MM-DD" + "T00:00:00.000+00:00"),
      toDate: moment(new Date(data.toDate)).format("YYYY-MM-DD" + "T00:00:00.000+00:00"),
    };
    setSellData(options);
  };

  const onExport = (exportType, fileName, data) => {
    if (data.length > 0) {
      const finalData = data.map((item) => ({
        Product: item?.Products?.name,
        Unit: item?.Products?.unit,
        Details: item?.Products?.details,
        Brand: item?.Brands[0]?.name,
        Category: item?.Categories[0]?.name,
        UnitCost: item?.unitCost,
        Total: item?.total,
        Date: moment(item?.createdAt).format("MMMM Do YYYY"),
      }));
      exportFromJSON({ data: finalData, fileName, exportType });
    }
  };

  return (
    <Col>
      <Card bordered={true} style={{ marginBottom: 8 }}>
        <Typography.Title level={3}>Generate Sell Report</Typography.Title>
        <Col span={24} lg={12}>
          <IForm onSubmit={onsubmit}>
            <IDatePicker name="formDate" label="Form Date" />
            <IDatePicker name="toDate" label="To Date" />
            <Button htmlType="submit" type="primary" size="large">
              Sell Report
            </Button>
          </IForm>
        </Col>
      </Card>
      {/* download format */}
      {sellReportData?.data?.rows.length > 0 && (
        <Card bordered={true} style={{ marginBottom: 8 }}>
          <Typography.Title level={3}>Total: {sellReportData?.data?.total} Tk</Typography.Title>
          <Col span={24} lg={12}>
            <Button
              style={{ marginRight: "10px" }}
              onClick={() => onExport("csv", "Sell-Report", sellReportData?.data?.rows)}>
              Download CSV
            </Button>
            <Button onClick={() => onExport("xls", "Sell-Report", sellReportData?.data?.rows)}>
              Download XLS
            </Button>
          </Col>
        </Card>
      )}
    </Col>
  );
};
export default SellReport;
