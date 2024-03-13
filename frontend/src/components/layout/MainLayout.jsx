import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import { Header } from "antd/es/layout/layout";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { logout } from "../../redux/features/auth/authSlice";
import Sidebar from "./Sidebar";
const { Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Layout style={{ height: "100%" }}>
      {/* sidebar component */}
      <Sidebar collapsed={collapsed}></Sidebar>
      <Layout>
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
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          {/* Logout Functionality */}
          <Button type="text" danger icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Button>
        </Header>
        {/* content */}
        <Content>
          <div
            style={{
              margin: "24px 16px 0px",
              minHeight: 360,
            }}>
            {/* outlet */}
            <Outlet></Outlet>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
