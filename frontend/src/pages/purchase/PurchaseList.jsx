import { Button, Input, Modal, Space, Table, Typography } from "antd";
import moment from "moment";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  useDeletePurchaseMutation,
  usePurchaseListQuery,
} from "../../redux/features/purchase/purchaseApi";

const PurchaseList = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchKeyword, setSearchKeyword] = useState("0");

  const [deletePurchase] = useDeletePurchaseMutation();

  const { data: purchases, isFetching } = usePurchaseListQuery({
    pageNumber,
    perPage,
    searchKeyword,
  });

  const metaData = purchases?.meta;
  const tableData = purchases?.data?.map(
    (
      {
        _id,
        SupplierId,
        Suppliers,
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
      SupplierId,
      supplierName: Suppliers[0]?.name,
      supplierEmail: Suppliers[0]?.email,
      supplierMobile: Suppliers[0]?.mobile,
      supplierAddress: Suppliers[0]?.address,
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
      key: "supplierName",
      dataIndex: "supplierName",
    },
    {
      title: "Email",
      key: "supplierEmail",
      dataIndex: "supplierEmail",
    },
    {
      title: "Mobile",
      key: "supplierMobile",
      dataIndex: "supplierMobile",
    },
    {
      title: "Address",
      key: "supplierAddress",
      dataIndex: "supplierAddress",
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
      title: "Are you sure, you want to delete this Purchase record?",
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        const res = await deletePurchase(id);
        if (res.data.success) {
          toast.success("Purchase Deleted Successfully");
        }
      },
    });
  };

  return (
    <>
      <Typography.Title level={3}>Purchase List</Typography.Title>
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

export default PurchaseList;
