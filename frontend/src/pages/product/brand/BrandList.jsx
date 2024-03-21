import { Button, Input, Modal, Space, Table, Typography } from "antd";
import moment from "moment";
import { useState } from "react";
import toast from "react-hot-toast";
import { useBrandListQuery, useDeleteBrandMutation } from "../../../redux/features/product/brandApi";
import UpdateBrand from "./UpdateBrand";

const BrandList = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchKeyword, setSearchKeyword] = useState("0");

  const [deleteBrand] = useDeleteBrandMutation();

  const { data: brands, isFetching } = useBrandListQuery({
    pageNumber,
    perPage,
    searchKeyword,
  });

  const metaData = brands?.meta;
  const tableData = brands?.data?.map(({ _id, name, createdAt }, index) => ({
    key: _id,
    name,
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
      title: "Created Date",
      key: "createdAt",
      dataIndex: "createdAt",
    },
    {
      title: "Action",
      key: "x",
      align: "Center",
      render: (brand) => {
        return (
          <Space>
            <UpdateBrand brandInfo={brand} key={Date.now()} />
            <Button danger onClick={() => handleDelete(brand.key)}>
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
      title: "Are you sure, you want to delete this Brand record?",
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        await deleteBrand(id);
        toast.success("Brand Deleted Successfully");
      },
    });
  };

  return (
    <>
      <Typography.Title level={3}>Brand List</Typography.Title>
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

export default BrandList;
