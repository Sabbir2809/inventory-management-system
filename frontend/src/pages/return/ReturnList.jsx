import { Button, Input, Modal, Space, Table, Typography } from "antd";
import moment from "moment";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDeleteReturnMutation, useReturnListQuery } from "../../redux/features/return/returnApi";

const ReturnList = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchKeyword, setSearchKeyword] = useState("0");

  const [deleteReturn] = useDeleteReturnMutation();

  const { data: returns, isFetching } = useReturnListQuery({
    pageNumber,
    perPage,
    searchKeyword,
  });

  const metaData = returns?.meta;
  const tableData = returns?.data?.map(
    (
      {
        _id,
        CustomerId,
        Customers,
        discount,
        grantTotal,
        note,
        otherCost,
        shoppingCost,
        vatTax,
        createdAt,
      },
      index
    ) => ({
      key: _id,
      CustomerId,
      customerName: Customers[0]?.name,
      customerEmail: Customers[0]?.email,
      customerMobile: Customers[0]?.mobile,
      customerAddress: Customers[0]?.address,
      discount,
      grantTotal,
      note,
      otherCost,
      shoppingCost,
      vatTax,
      createdAt: moment(createdAt).format("LLL"),
      serial: index + 1,
    })
  );

  const columns = [
    {
      title: "#No",
      key: "serial",
      dataIndex: "serial",
    },
    {
      title: "Name",
      key: "customerName",
      dataIndex: "customerName",
    },
    {
      title: "Email",
      key: "customerEmail",
      dataIndex: "customerEmail",
    },
    {
      title: "Mobile",
      key: "customerMobile",
      dataIndex: "customerMobile",
    },
    {
      title: "Address",
      key: "customerAddress",
      dataIndex: "customerAddress",
    },
    {
      title: "Shopping Cost",
      key: "shoppingCost",
      dataIndex: "shoppingCost",
    },
    {
      title: "Vat Tax",
      key: "vatTax",
      dataIndex: "vatTax",
    },
    {
      title: "Grant Total",
      key: "grantTotal",
      dataIndex: "grantTotal",
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
      render: (product) => {
        return (
          <Space>
            <Button danger onClick={() => handleDelete(product.key)}>
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  // handle delete action
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this Return record?",
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        await deleteReturn(id);
        toast.success("Return Deleted Successfully");
      },
    });
  };

  return (
    <>
      <Typography.Title level={3}>Return List</Typography.Title>
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

export default ReturnList;
