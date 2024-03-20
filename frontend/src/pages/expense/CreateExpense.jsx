import { Button, Col, Row, Typography } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import IForm from "../../components/form/IForm";
import IInput from "../../components/form/IInput";
import ISelect from "../../components/form/ISelect";
import { useCreateExpenseMutation, useExpenseTypeListQuery } from "../../redux/features/expense/expenseApi";

const CreateExpense = () => {
  const navigate = useNavigate();

  const [createExpense] = useCreateExpenseMutation();

  const { data: expenseTypes } = useExpenseTypeListQuery({
    pageNumber: 0,
    perPage: 10,
    searchKeyword: 0,
  });
  const expenseOptions = expenseTypes?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  const onsubmit = async (data) => {
    try {
      if (!data.name) {
        return toast.error("Name is Required");
      } else if (!data.amount) {
        return toast.error("Amount is Required");
      } else if (!data.note) {
        return toast.error("Note is Required");
      }

      const res = await createExpense(data);
      if (res.data.success) {
        navigate("/expenses");
      }
    } catch (error) {
      toast.error(error.data.message);
    }
  };
  return (
    <>
      <Typography.Title level={3}>Create Expense</Typography.Title>
      <Row justify="center">
        <Col span={24} lg={12}>
          <IForm onSubmit={onsubmit}>
            <IInput type="text" name="name" label="Name" required={true} />
            <IInput type="text" name="amount" label="amount" required={true} />
            <IInput type="text" name="note" label="note" required={true} />
            <ISelect
              name="expenseTypeId"
              label="Expense Type"
              placeholder="Select Expense Type"
              required={true}
              options={expenseOptions}
            />
            <Button htmlType="submit" type="primary" size="large">
              Create Expense
            </Button>
          </IForm>
        </Col>
      </Row>
    </>
  );
};
export default CreateExpense;
