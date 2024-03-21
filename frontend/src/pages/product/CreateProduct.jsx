import { Button, Col, Row, Typography } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import IForm from "../../components/form/IForm";
import IInput from "../../components/form/IInput";
import ISelect from "../../components/form/ISelect";
import { productUnitOptions } from "../../constants/global";
import { useBrandDropdownQuery } from "../../redux/features/product/brandApi";
import { useCategoryDropdownQuery } from "../../redux/features/product/categoryApi";
import { useCreateProductMutation } from "../../redux/features/product/productApi";

const CreateProduct = () => {
  const navigate = useNavigate();

  const { data: brands } = useBrandDropdownQuery(undefined);
  const brandOptions = brands?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  const { data: categories } = useCategoryDropdownQuery(undefined);
  const categoryOptions = categories?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  const [createProduct] = useCreateProductMutation();

  const onsubmit = async (data) => {
    try {
      if (!data.CategoryId || !data.BrandId || !data.name || !data.unit || !data.details) {
        return toast.error("All Field are Required!");
      }

      const res = await createProduct(data);
      if (res.data.success) {
        navigate("/products");
      }
    } catch (error) {
      toast.error(error.data.message);
    }
  };
  return (
    <>
      <Typography.Title level={3}>Create Product</Typography.Title>
      <Row justify="center">
        <Col span={24} lg={12}>
          <IForm onSubmit={onsubmit}>
            <ISelect
              name="BrandId"
              label="Brand Name"
              placeholder="Select Product Brand Name"
              required={true}
              options={brandOptions}
            />
            <ISelect
              name="CategoryId"
              label="Category Name"
              placeholder="Select Product Category Name"
              options={categoryOptions}
              required={true}
            />
            <IInput type="text" name="name" label="Product Name" required={true} />
            <ISelect
              name="unit"
              label="Product Unit"
              placeholder="Select Product Unit"
              options={productUnitOptions}
              required={true}
            />
            <IInput type="text" name="details" label="Product Details" required={true} />
            <Button htmlType="submit" type="primary" size="large">
              Create Product
            </Button>
          </IForm>
        </Col>
      </Row>
    </>
  );
};
export default CreateProduct;
