import { Button, Col, Row } from "antd";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import IForm from "../components/form/IForm";
import IInput from "../components/form/IInput";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();

  const onsubmit = async (data) => {
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };

      if (!data.email || !data.password) {
        return toast.error("Email and Password are Required");
      }

      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken);
      dispatch(setUser({ user: user, token: res.data.accessToken }));

      if (res.success) {
        navigate(`/dashboard`);
      }
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "90vh", padding: "20px" }}>
      <Col span={24} md={12} lg={8}>
        <IForm onSubmit={onsubmit}>
          <IInput type="text" name="email" label="Email" required={true} />
          <IInput type="password" name="password" label="Password" required={true} />
          <Button htmlType="submit" type="primary" size="large" style={{ width: "100%" }}>
            Login
          </Button>
          <Link to="/signup">
            <Button type="dashed" style={{ width: "100%", marginTop: "10px" }}>
              Don&apos;t have an account? Sign Up
            </Button>
          </Link>
        </IForm>
      </Col>
    </Row>
  );
};

export default Login;
