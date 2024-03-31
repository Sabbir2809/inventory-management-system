import { Button, Input, Modal, Space, Table, Typography } from "antd";
import moment from "moment";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  useDeleteProductMutation,
  useProductListQuery,
} from "../../redux/features/product/productApi";
import UpdateProduct from "./UpdateProduct";

const ProductList = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchKeyword, setSearchKeyword] = useState("0");

  const [deleteProduct] = useDeleteProductMutation();

  const { data: products, isFetching } = useProductListQuery({
    pageNumber,
    perPage,
    searchKeyword,
  });

  const metaData = products?.meta;
  const tableData = products?.data?.map(
    ({ _id, name, unit, details, Brand, BrandId, Category, CategoryId, createdAt }, index) => ({
      key: _id,
      name,
      unit,
      details,
      brand: Brand[0].name,
      BrandId,
      category: Category[0].name,
      CategoryId,
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
      title: "Unit",
      key: "unit",
      dataIndex: "unit",
    },
    {
      title: "Details",
      key: "details",
      dataIndex: "details",
    },
    {
      title: "brand",
      key: "brand",
      dataIndex: "brand",
    },
    {
      title: "category",
      key: "category",
      dataIndex: "category",
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
            <UpdateProduct productInfo={product} key={Date.now()} />
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
      title: "Are you sure, you want to delete this Product record?",
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        const res = await deleteProduct(id);
        if (res.data.success) {
          toast.success("Product Deleted Successfully");
        }
      },
    });
  };

  return (
    <>
      <Typography.Title level={3}>Product List</Typography.Title>
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

export default ProductList;
