import { Button, Col, Modal, Row } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import IForm from "../../components/form/IForm";
import IInput from "../../components/form/IInput";
import { useUpdateProductMutation } from "../../redux/features/product/productApi";

const UpdateProduct = ({ productInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [updateProduct] = useUpdateProductMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  console.log(productInfo);

  const onSubmit = async (data) => {
    const brandData = {
      id: productInfo.key,
      data: {
        ...data,
      },
    };

    const res = await updateProduct(brandData);
    if (res.data.success) {
      toast.success("Product Information Updated Successfully");
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <Button
        onClick={showModal}
        type="dashed"
        style={{ width: "100%", marginBottom: "4px", marginTop: "4px" }}>
        Update
      </Button>
      <Modal title={productInfo?.name} open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Row justify="center">
          <Col span={24}>
            <IForm onSubmit={onSubmit} defaultValues={productInfo}>
              <IInput type="text" name="name" label="Name" required={true} />
              <IInput type="text" name="unit" label="Unit" required={true} />
              <IInput type="text" name="details" label="Details" required={true} />
              <IInput type="text" name="brand" label="Brand" disabled={true} />
              <IInput type="text" name="category" label="Category" disabled={true} />
              <Button htmlType="submit" type="primary">
                Save
              </Button>
            </IForm>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default UpdateProduct;
