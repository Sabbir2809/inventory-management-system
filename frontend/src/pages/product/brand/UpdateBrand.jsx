import { Button, Col, Modal, Row } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import IForm from "../../../components/form/IForm";
import IInput from "../../../components/form/IInput";
import { useUpdateBrandMutation } from "../../../redux/features/product/brandApi";

const UpdateBrand = ({ brandInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [updateBrand] = useUpdateBrandMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data) => {
    const brandData = {
      id: brandInfo.key,
      data: {
        ...data,
      },
    };

    const res = await updateBrand(brandData);
    if (res.data.success) {
      toast.success("Brand Information Updated Successfully");
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
      <Modal title={brandInfo?.name} open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Row justify="center">
          <Col span={24}>
            <IForm onSubmit={onSubmit} defaultValues={brandInfo}>
              <IInput type="text" name="name" label="Brand Name" required={true} />
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

export default UpdateBrand;
