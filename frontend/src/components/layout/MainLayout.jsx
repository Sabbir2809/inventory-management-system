import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Heading from "./Heading";
import Sidebar from "./Sidebar";
const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout>
      {/* sidebar component */}
      <Sidebar></Sidebar>
      <Layout>
        {/* Header */}
        <Heading></Heading>
        {/* content */}
        <Content
          style={{
            margin: "10px 20px",
            padding: 10,
          }}>
          {/* outlet */}
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
