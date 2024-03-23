import React, { Card, Col, Tooltip } from "antd";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";

const SummaryChart = ({ data }) => {
  return (
    <Col span={24} lg={12}>
      <Card title="Expense Last 30 Days" bordered={true} style={{ marginBottom: 8 }}>
        <ResponsiveContainer className="mt-4" width="100%" height={200}>
          <AreaChart width={500} height={200} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="totalAmount" stroke="#CB0C9F" fill="#CB0C9F" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </Col>
  );
};
export default SummaryChart;
