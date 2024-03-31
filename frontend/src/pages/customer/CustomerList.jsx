import { Button, Input, Modal, Space, Table, Typography } from "antd";
import moment from "moment";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  useCustomerListQuery,
  useDeleteCustomerMutation,
} from "../../redux/features/customer/customerApi";
import UpdateCustomer from "./UpdateCustomer";

const CustomerList = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchKeyword, setSearchKeyword] = useState("0");

  const [deleteCustomer] = useDeleteCustomerMutation();

  const { data: customers, isFetching } = useCustomerListQuery({
    pageNumber,
    perPage,
    searchKeyword,
  });

  const metaData = customers?.meta;
  const tableData = customers?.data?.map(
    ({ _id, name, email, mobile, address, createdAt }, index) => ({
      key: _id,
      name,
      email,
      mobile,
      address,
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
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Mobile",
      key: "mobile",
      dataIndex: "mobile",
    },
    {
      title: "Address",
      key: "address",
      dataIndex: "address",
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
      render: (customer) => {
        return (
          <Space>
            <UpdateCustomer customerInfo={customer} key={Date.now()} />
            <Button danger onClick={() => handleDelete(customer.key)}>
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
      title: "Are you sure, you want to delete this Customer record?",
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        const res = await deleteCustomer(id);
        if (res.data.success) {
          toast.success("Customer Deleted Successfully");
        }
      },
    });
  };

  return (
    <>
      <Typography.Title level={3}>Customer List</Typography.Title>
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

export default CustomerList;
