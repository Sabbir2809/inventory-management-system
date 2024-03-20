import { Button, Col, Row, Typography } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import IForm from "../../components/form/IForm";
import IInput from "../../components/form/IInput";
import { useCreateExpenseTypeMutation } from "../../redux/features/expense/expenseApi";

const CreateExpenseType = () => {
  const navigate = useNavigate();
  const [createExpenseType] = useCreateExpenseTypeMutation();

  const onsubmit = async (data) => {
    try {
      if (!data.name) {
        return toast.error("Expense Type is Required");
      }

      const res = await createExpenseType(data);
      if (res.data.success) {
        navigate("/expenses");
      }
    } catch (error) {
      toast.error(error.data.message);
    }
  };
  return (
    <>
      <Typography.Title level={3}>Create Expense Type</Typography.Title>
      <Row justify="center">
        <Col span={24} lg={12}>
          <IForm onSubmit={onsubmit}>
            <IInput type="text" name="name" label="Expense Type" required={true} />
            <Button htmlType="submit" type="primary" size="large">
              Create Expense
            </Button>
          </IForm>
        </Col>
      </Row>
    </>
  );
};
export default CreateExpenseType;
