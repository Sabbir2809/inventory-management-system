import { Button, Col, Modal, Row } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import IForm from "../../components/form/IForm";
import IInput from "../../components/form/IInput";
import { useProfileUpdateMutation } from "../../redux/features/auth/authApi";

const ProfileUpdate = ({ profile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [profileUpdate] = useProfileUpdateMutation();

  const onSubmit = async (data) => {
    const res = await profileUpdate(data);
    if (res.data.success) {
      toast.success("User Profile Updated Successful");
      setIsModalOpen(false);
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Button
        onClick={showModal}
        type="dashed"
        style={{ width: "100%", marginTop: "10px" }}
        key={profile._id}>
        Update Profile
      </Button>
      <Modal title="Profile Update" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Row>
          <Col span={24}>
            <IForm onSubmit={onSubmit} defaultValues={profile}>
              <Row gutter={8}>
                <Col span={24} md={12} lg={12}>
                  <IInput type="text" name="firstName" label="First Name" />
                </Col>
                <Col span={24} md={12} lg={12}>
                  <IInput type="text" name="lastName" label="Last Name" />
                </Col>
                <Col span={24} md={12} lg={12}>
                  <IInput type="text" name="mobile" label="Mobile" />
                </Col>
                <Col span={24} md={12} lg={12}>
                  <IInput type="text" name="email" label="Email" disabled={true} />
                </Col>
              </Row>
              <Button htmlType="submit" style={{ marginRight: "5px" }}>
                Save
              </Button>
            </IForm>
          </Col>
        </Row>
      </Modal>
    </>
  );
};
export default ProfileUpdate;
