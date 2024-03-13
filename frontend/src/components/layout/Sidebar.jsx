import { Layout, Menu, Typography } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../redux/features/auth/authSlice";
import { userPaths } from "../../routes/user.routes";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { verifyToken } from "../../utils/verifyToken";
const { Sider } = Layout;

const userRole = {
  USER: "user",
  ADMIN: "admin",
};

const Sidebar = ({ collapsed }) => {
  const [sidebarItems, setSidebarItems] = useState([]);
  const token = useSelector(selectCurrentToken);

  useEffect(() => {
    let user;
    if (token) {
      user = verifyToken(token);
      let generatedSidebarItems = [];

      switch (user.role) {
        case userRole.USER:
          generatedSidebarItems = sidebarItemsGenerator(userPaths);
          break;
        default:
          break;
      }
      setSidebarItems(generatedSidebarItems);
    }
  }, [token]);

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}>
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Typography.Title level={4} style={{ color: "white" }}>
          Inventory
        </Typography.Title>
      </div>

      {/* Menu Items */}
      <Menu theme="dark" mode="inline" items={sidebarItems} />
    </Sider>
  );
};

export default Sidebar;
