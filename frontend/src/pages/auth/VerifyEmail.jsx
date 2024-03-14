import { Button, Col, Row } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import IForm from "../../components/form/IForm";
import IInput from "../../components/form/IInput";
import { useVerifyEmailMutation } from "../../redux/features/auth/authApi";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [verifyEmail] = useVerifyEmailMutation();

  const onsubmit = async (data) => {
    if (!data.email) {
      return toast.error("Email is Required");
    }

    const res = await verifyEmail(data);

    if (res.data.success) {
      toast.success(res.data.message);
      navigate("/verify-otp", { state: { email: data.email } });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "90vh", padding: "20px" }}>
      <Col span={24} md={12} lg={8}>
        <IForm onSubmit={onsubmit}>
          <IInput type="text" name="email" label="Email" required={true} />
          <Button htmlType="submit" type="primary" size="large" style={{ width: "100%" }}>
            Next
          </Button>
        </IForm>
      </Col>
    </Row>
  );
};

export default VerifyEmail;
