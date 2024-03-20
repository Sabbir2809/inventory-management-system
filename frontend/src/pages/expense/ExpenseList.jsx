import { Input, Space, Table, Typography } from "antd";
import moment from "moment";
import { useState } from "react";
import { useExpenseListQuery } from "../../redux/features/expense/expenseApi";
import UpdateExpense from "./UpdateExpense";

const ExpenseList = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchKeyword, setSearchKeyword] = useState("0");

  const { data: expenses, isFetching } = useExpenseListQuery({
    pageNumber,
    perPage,
    searchKeyword,
  });

  const metaData = expenses?.meta;
  const tableData = expenses?.data?.map(({ _id, name, amount, note, ExpenseType, createdAt }, index) => ({
    key: _id,
    name,
    expenseType: ExpenseType[0]?.name,
    amount,
    note,
    createdAt: moment(createdAt).format("LLL"),
    serial: index + 1,
  }));

  const columns = [
    {
      title: "#No",
      key: "serial",
      dataIndex: "serial",
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Expense Type",
      key: "expenseType",
      dataIndex: "expenseType",
    },
    {
      title: "Amount",
      key: "amount",
      dataIndex: "amount",
    },
    {
      title: "Note",
      key: "note",
      dataIndex: "note",
    },
    {
      title: "Created Date",
      key: "createdAt",
      dataIndex: "createdAt",
    },
    {
      title: "Action",
      key: "x",
      align: "Center",
      render: (expense) => {
        return (
          <Space>
            <UpdateExpense expenseInfo={expense} key={Date.now()} />
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Typography.Title level={3}>Expense List</Typography.Title>
      <Input.Search
        placeholder="Search here"
        style={{ marginBottom: 8 }}
        onChange={(e) => setSearchKeyword(e.target.value || "0")}
        size="large"
      />
      <Table
        columns={columns}
        dataSource={tableData}
        loading={isFetching}
        pagination={{
          current: pageNumber,
          pageSize: perPage,
          total: metaData?.total,
          onChange: (pageNumber, perPage) => {
            setPageNumber(pageNumber);
            setPerPage(perPage);
          },
        }}
        scroll={{ x: true }}
        bordered
      />
    </>
  );
};

export default ExpenseList;
