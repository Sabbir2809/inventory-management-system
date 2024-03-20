import { Button, Col, Modal, Row } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import IForm from "../../components/form/IForm";
import IInput from "../../components/form/IInput";
import { useUpdateExpenseTypeMutation } from "../../redux/features/expense/expenseApi";

const UpdateExpenseType = ({ expenseTypeInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [updateExpenseType] = useUpdateExpenseTypeMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data) => {
    const expenseTypeData = {
      id: expenseTypeInfo.key,
      data: {
        ...data,
      },
    };

    const res = await updateExpenseType(expenseTypeData);
    if (res.data.success) {
      toast.success("ExpenseType Information Updated Successfully");
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
      <Modal title={expenseTypeInfo?.name} open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Row justify="center">
          <Col span={24}>
            <IForm onSubmit={onSubmit} defaultValues={expenseTypeInfo}>
              <IInput type="text" name="name" label="Expense Type" required={true} />
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

export default UpdateExpenseType;
