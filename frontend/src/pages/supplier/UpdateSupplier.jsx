import { Button, Col, Modal, Row } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import IForm from "../../components/form/IForm";
import IInput from "../../components/form/IInput";
import { useUpdateSupplierMutation } from "../../redux/features/supplier/supplierApi";

const UpdateSupplier = ({ supplierInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [updateSupplier] = useUpdateSupplierMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data) => {
    const supplierData = {
      id: supplierInfo.key,
      data: {
        ...data,
      },
    };

    const res = await updateSupplier(supplierData);
    if (res.data.success) {
      toast.success("Supplier Information Updated Successfully");
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
      <Modal title={supplierInfo?.name} open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Row justify="center">
          <Col span={24}>
            <IForm onSubmit={onSubmit} defaultValues={supplierInfo}>
              <IInput type="text" name="name" label="Name" required={true} />
              <IInput type="text" name="email" label="Email" required={true} />
              <IInput type="text" name="mobile" label="Mobile" required={true} />
              <IInput type="text" name="address" label="Address" required={true} />
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

export default UpdateSupplier;
