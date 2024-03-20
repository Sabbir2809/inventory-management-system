import { Button, Col, Modal, Row } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import IForm from "../../../components/form/IForm";
import IInput from "../../../components/form/IInput";
import { useUpdateCategoryMutation } from "../../../redux/features/product/categoryApi";

const UpdateCategory = ({ categoryInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [updateCategory] = useUpdateCategoryMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data) => {
    const categoryData = {
      id: categoryInfo.key,
      data: {
        ...data,
      },
    };

    const res = await updateCategory(categoryData);
    if (res.data.success) {
      toast.success("Category Information Updated Successfully");
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
      <Modal title={categoryInfo?.name} open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Row justify="center">
          <Col span={24}>
            <IForm onSubmit={onSubmit} defaultValues={categoryInfo}>
              <IInput type="text" name="name" label="Category Name" required={true} />
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

export default UpdateCategory;
