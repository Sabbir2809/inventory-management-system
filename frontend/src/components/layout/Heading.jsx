import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import { Header } from "antd/es/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, setCollapsed } from "../../redux/features/auth/authSlice";

const Heading = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const collapsed = useSelector((state) => state.auth.collapsed);

  const handleMenuClick = (e) => {
    if (e.key === "profile-details") {
      navigate("/profile-details");
    }
    if (e.key === "logout") {
      dispatch(logout());
    }
  };

  const items = [
    {
      label: "Profile Details",
      key: "profile-details",
      icon: <UserOutlined />,
    },
    {
      label: "Logout",
      key: "logout",
      icon: <LogoutOutlined />,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <Header
      style={{
        padding: 0,
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        backgroundColor: "white",
      }}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => dispatch(setCollapsed(!collapsed))}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
      <div style={{ marginLeft: "auto", marginRight: "20px" }}>
        <Dropdown.Button menu={menuProps} placement="bottomRight" icon={<UserOutlined />}>
          Profile
        </Dropdown.Button>
      </div>
    </Header>
  );
};
export default Heading;
