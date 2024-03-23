import React, { Card, Col, Statistic } from "antd";

const SummaryCard = ({ total }) => {
  return (
    <Col span={24} lg={6}>
      <Card bordered={true} style={{ marginBottom: 8 }}>
        <Statistic
          title="Total Expense"
          value={total}
          precision={2}
          valueStyle={{
            color: "#3f8600",
          }}
          suffix="TK"
        />
      </Card>
    </Col>
  );
};
export default SummaryCard;
