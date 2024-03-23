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

const Sidebar = () => {
  const [sidebarItems, setSidebarItems] = useState([]);
  const token = useSelector(selectCurrentToken);
  const collapsed = useSelector((state) => state.auth.collapsed);

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
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "4.5rem",
        }}>
        <Typography.Title
          style={{
            color: "white",
            border: "2px solid white",
            borderRadius: "6px",
            padding: "3px",
          }}
          level={collapsed ? 5 : 3}
          color="white">
          Inventory
        </Typography.Title>
      </div>
      {/* Menu Items */}
      <Menu
        theme="dark"
        mode="inline"
        items={sidebarItems}
        style={{
          minHeight: "100vh",
          position: "sticky",
          top: 0,
        }}
      />
    </Sider>
  );
};

export default Sidebar;
