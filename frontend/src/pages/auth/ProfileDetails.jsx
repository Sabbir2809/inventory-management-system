import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Divider, List, Row, Skeleton, Typography } from "antd";
import { useProfileDetailsQuery } from "../../redux/features/auth/authApi";

const { Text, Title } = Typography;

const ProfileDetails = () => {
  const { data, isLoading } = useProfileDetailsQuery(undefined);
  const profile = data?.data;

  const fullName = `${profile?.firstName} ${profile?.lastName}`;
  const profileDetails = [
    { title: "Full Name", content: fullName, icon: <UserOutlined /> },
    { title: "Email", content: profile?.email, icon: <MailOutlined /> },
    { title: "Mobile", content: profile?.mobile, icon: <PhoneOutlined /> },
  ];

  if (isLoading) {
    return <Skeleton avatar paragraph={{ rows: 6 }} />;
  }

  return (
    <Card title="Profile Details">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card type="inner" title="Avatar" style={{ textAlign: "center" }}>
            <Avatar size={100} src={profile?.photo} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={16} lg={18}>
          <List
            itemLayout="horizontal"
            dataSource={profileDetails}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={item.icon && <Avatar icon={item.icon} />}
                  title={<Text strong>{item.title}</Text>}
                  description={<Title level={4}>{item.content}</Title>}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
      <Divider />
    </Card>
  );
};

export default ProfileDetails;
