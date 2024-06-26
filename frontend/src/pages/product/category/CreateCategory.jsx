import { Button, Col, Row, Typography } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import IForm from "../../../components/form/IForm";
import IInput from "../../../components/form/IInput";
import { useCreateCategoryMutation } from "../../../redux/features/product/categoryApi";

const CreateCategory = () => {
  const navigate = useNavigate();
  const [createCategory] = useCreateCategoryMutation();

  const onsubmit = async (data) => {
    if (!data.name) {
      return toast.error("Category name is Required");
    }

    const res = await createCategory(data);
    if (res.data.success) {
      navigate("/categories");
    }
  };
  return (
    <>
      <Typography.Title level={3}>Create Category</Typography.Title>
      <Row justify="center">
        <Col span={24} lg={12}>
          <IForm onSubmit={onsubmit}>
            <IInput type="text" name="name" label="Category Name" required={true} />
            <Button htmlType="submit" type="primary" size="large">
              Create Category
            </Button>
          </IForm>
        </Col>
      </Row>
    </>
  );
};
export default CreateCategory;
