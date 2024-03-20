import { Button, Col, Modal, Row } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import IForm from "../../components/form/IForm";
import IInput from "../../components/form/IInput";
import { useUpdateExpenseMutation } from "../../redux/features/expense/expenseApi";

const UpdateExpense = ({ expenseInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [updateExpense] = useUpdateExpenseMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data) => {
    const expenseData = {
      id: expenseInfo.key,
      data: {
        ...data,
      },
    };

    const res = await updateExpense(expenseData);
    if (res.data.success) {
      toast.success("Expense Information Updated Successfully");
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
      <Modal title={expenseInfo?.name} open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Row justify="center">
          <Col span={24}>
            <IForm onSubmit={onSubmit} defaultValues={expenseInfo}>
              <IInput type="text" name="name" label="Name" required={true} />
              <IInput type="text" name="expenseType" label="Expense Type" disabled={true} required={true} />
              <IInput type="text" name="amount" label="amount" required={true} />
              <IInput type="text" name="note" label="note" required={true} />
              <IInput type="text" name="note" label="note" required={true} />
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

export default UpdateExpense;
