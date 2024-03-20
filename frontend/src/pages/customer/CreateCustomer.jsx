import { Button, Col, Row, Typography } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import IForm from "../../components/form/IForm";
import IInput from "../../components/form/IInput";
import { useCreateCustomerMutation } from "../../redux/features/customer/customerApi";

const CreateCustomer = () => {
  const navigate = useNavigate();
  const [createCustomer] = useCreateCustomerMutation();

  const onsubmit = async (data) => {
    try {
      if (!data.name) {
        return toast.error("Name is Required");
      } else if (!data.email) {
        return toast.error("Email is Required");
      } else if (!data.mobile) {
        return toast.error("Mobile is Required");
      } else if (!data.address) {
        return toast.error("Address is Required");
      }

      const res = await createCustomer(data);
      if (res?.data?.success) {
        navigate("/customers");
      }
      console.log(res);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  return (
    <>
      <Typography.Title level={3}>Create Customer</Typography.Title>
      <Row justify="center">
        <Col span={24} lg={12}>
          <IForm onSubmit={onsubmit}>
            <IInput type="text" name="name" label="Name" required={true} />
            <IInput type="text" name="email" label="Email" required={true} />
            <IInput type="text" name="mobile" label="Mobile" required={true} />
            <IInput type="text" name="address" label="Address" required={true} />
            <Button htmlType="submit" type="primary" size="large">
              Create Customer
            </Button>
          </IForm>
        </Col>
      </Row>
    </>
  );
};
export default CreateCustomer;
