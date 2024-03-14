import { Button, Col, Row } from "antd";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import IForm from "../../components/form/IForm";
import IInput from "../../components/form/IInput";
import { useVerifyOTPMutation } from "../../redux/features/auth/authApi";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location?.state?.email;

  const [verifyOTP] = useVerifyOTPMutation();

  const onsubmit = async (data) => {
    if (!data.otp) {
      return toast.error("OTP is Required");
    }

    const forgetData = {
      email: email,
      otp: data.otp,
    };

    const res = await verifyOTP(forgetData);
    if (res.data.success) {
      toast.success(res.data.message);
      navigate("/forget-password", { state: { email: email, otp: data.otp } });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "90vh", padding: "20px" }}>
      <Col span={24} md={12} lg={8}>
        <IForm onSubmit={onsubmit}>
          <IInput type="number" name="otp" label="OTP" required={true} />
          <Button htmlType="submit" type="primary" size="large" style={{ width: "100%" }}>
            Next
          </Button>
        </IForm>
      </Col>
    </Row>
  );
};

export default VerifyOTP;
