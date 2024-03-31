import { Button, Col, Row, Typography } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import IForm from "../../../components/form/IForm";
import IInput from "../../../components/form/IInput";
import { useCreateBrandMutation } from "../../../redux/features/product/brandApi";

const CreateBrand = () => {
  const navigate = useNavigate();
  const [createBrand] = useCreateBrandMutation();

  const onsubmit = async (data) => {
    if (!data.name) {
      return toast.error("Brand name is Required");
    }

    const res = await createBrand(data);
    if (res.data.success) {
      navigate("/brands");
    }
  };
  return (
    <>
      <Typography.Title level={3}>Create Brand</Typography.Title>
      <Row justify="center">
        <Col span={24} lg={12}>
          <IForm onSubmit={onsubmit}>
            <IInput type="text" name="name" label="Brand Name" required={true} />
            <Button htmlType="submit" type="primary" size="large">
              Create Brand
            </Button>
          </IForm>
        </Col>
      </Row>
    </>
  );
};
export default CreateBrand;
