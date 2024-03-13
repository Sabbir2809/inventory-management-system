import { Button, Col, Row } from "antd";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import IForm from "../components/form/IForm";
import IInput from "../components/form/IInput";
import { useSignupMutation } from "../redux/features/auth/authApi";

const Signup = () => {
  const navigate = useNavigate();

  const [signup] = useSignupMutation();

  const onsubmit = async (data) => {
    try {
      const userInfo = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobile: data.mobile,
        password: data.password,
      };
      const res = await signup(userInfo).unwrap();

      if (res.success) {
        navigate("/login");
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "90vh", padding: "10px" }}>
      <Col span={24} md={12} lg={8}>
        <IForm onSubmit={onsubmit}>
          <Row gutter={8}>
            <Col span={12}>
              <IInput type="text" name="firstName" label="First Name" />
            </Col>
            <Col span={12}>
              <IInput type="text" name="lastName" label="Last Name" />
            </Col>
          </Row>
          <IInput type="text" name="email" label="Email" />
          <IInput type="text" name="mobile" label="Mobile Number" />
          <IInput type="password" name="password" label="Password" />
          <Button htmlType="submit" type="primary" size="large" style={{ width: "100%" }}>
            Sign Up
          </Button>
          <Link to="/login">
            <Button type="dashed" style={{ width: "100%", marginTop: "10px" }}>
              Already have an account? Login
            </Button>
          </Link>
        </IForm>
      </Col>
    </Row>
  );
};

export default Signup;
