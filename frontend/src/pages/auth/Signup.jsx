import { Button, Col, Row } from "antd";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import IForm from "../../components/form/IForm";
import IInput from "../../components/form/IInput";
import { useSignupMutation } from "../../redux/features/auth/authApi";

const Signup = () => {
  const navigate = useNavigate();

  const [signup] = useSignupMutation();

  const onsubmit = async (data) => {
    const userInfo = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      mobile: data.mobile,
      password: data.password,
    };

    if (!data.firstName || !data.lastName || !data.email || !data.mobile || !data.password) {
      return toast.error("All Field(*) are Required");
    }

    const res = await signup(userInfo).unwrap();

    if (res.success) {
      toast.success("Registration Successful, Please Login");
      navigate("/login");
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "90vh", padding: "10px" }}>
      <Col span={24} md={12} lg={8}>
        <IForm onSubmit={onsubmit}>
          <Row gutter={8}>
            <Col span={12}>
              <IInput type="text" name="firstName" label="First Name" required={true} />
            </Col>
            <Col span={12}>
              <IInput type="text" name="lastName" label="Last Name" required={true} />
            </Col>
          </Row>
          <IInput
            type="text"
            name="mobile"
            label="Mobile Number"
            required={true}
            addonBefore="+88"
          />
          <IInput type="text" name="email" label="Email" required={true} />
          <IInput type="password" name="password" label="Password" required={true} />
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
