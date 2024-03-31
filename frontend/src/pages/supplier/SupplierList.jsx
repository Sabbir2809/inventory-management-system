import { Button, Input, Modal, Space, Table, Typography } from "antd";
import moment from "moment";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  useDeleteSupplierMutation,
  useSupplierListQuery,
} from "../../redux/features/supplier/supplierApi";
import UpdateSupplier from "./UpdateSupplier";

const SupplierList = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchKeyword, setSearchKeyword] = useState("0");

  const [deleteSupplier] = useDeleteSupplierMutation();

  const { data: suppliers, isFetching } = useSupplierListQuery({
    pageNumber,
    perPage,
    searchKeyword,
  });

  const metaData = suppliers?.meta;
  const tableData = suppliers?.data?.map(
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
      render: (supplier) => {
        return (
          <Space>
            <UpdateSupplier supplierInfo={supplier} key={Date.now()} />
            <Button danger onClick={() => handleDelete(supplier.key)}>
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
      title: "Are you sure, you want to delete this Supplier record?",
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        const res = await deleteSupplier(id);
        if (res.data.success) {
          return toast.success("Supplier Deleted Successfully");
        }
      },
    });
  };

  return (
    <>
      <Typography.Title level={3}>Supplier List</Typography.Title>
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

export default SupplierList;
