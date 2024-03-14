import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Heading from "./Heading";
import Sidebar from "./Sidebar";
const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout style={{ height: "100%" }}>
      {/* sidebar component */}
      <Sidebar></Sidebar>
      <Layout>
        {/* Header */}
        <Heading></Heading>
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
