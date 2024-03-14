import { Button, Col, Row } from "antd";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import IForm from "../../components/form/IForm";
import IInput from "../../components/form/IInput";
import { useForgetPasswordMutation } from "../../redux/features/auth/authApi";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location?.state?.email;
  const otp = location?.state?.otp;

  const [forgetPassword] = useForgetPasswordMutation();

  const onsubmit = async (data) => {
    if (!data.newPassword) {
      return toast.error("Please Enter Your New Password");
    }

    const forgetData = {
      email: email,
      otp: otp,
      newPassword: data.newPassword,
    };

    const res = await forgetPassword(forgetData);
    if (res.data.success) {
      toast.success(res.data.message);
      navigate("/login");
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "90vh", padding: "20px" }}>
      <Col span={24} md={12} lg={8}>
        <IForm onSubmit={onsubmit}>
          <IInput type="password" name="newPassword" label="New Password" required={true} />
          <Button htmlType="submit" type="primary" size="large" style={{ width: "100%" }}>
            Save
          </Button>
        </IForm>
      </Col>
    </Row>
  );
};

export default ForgetPassword;
