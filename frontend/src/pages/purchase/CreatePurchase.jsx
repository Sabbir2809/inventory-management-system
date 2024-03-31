import { Button, Col, Row, Typography } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import IForm from "../../components/form/IForm";
import IInput from "../../components/form/IInput";
import ISelect from "../../components/form/ISelect";
import { useProductDropdownQuery } from "../../redux/features/product/productApi";
import { useCreatePurchaseMutation } from "../../redux/features/purchase/purchaseApi";
import { useSupplierDropdownQuery } from "../../redux/features/supplier/supplierApi";

const CreatePurchase = () => {
  const navigate = useNavigate();

  const { data: supplier } = useSupplierDropdownQuery(undefined);
  const supplierOptions = supplier?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  const { data: products } = useProductDropdownQuery(undefined);
  const productOptions = products?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  const [createPurchase] = useCreatePurchaseMutation();

  const onsubmit = async (data) => {
    if (!data.SupplierId || !data.ProductId || !data.shoppingCost || !data.unitCost) {
      return toast.error("All Field are Required");
    }
    const purchaseData = {
      parent: {
        SupplierId: data.SupplierId,
        vatTax: Number(data.vatTax),
        discount: Number(data.discount),
        otherCost: Number(data.otherCost),
        shoppingCost: Number(data.shoppingCost),
        grantTotal:
          Number(data.vatTax) +
          Number(data.otherCost) +
          Number(data.shoppingCost) -
          Number(data.discount),
        note: data.note,
      },
      child: [
        {
          ProductId: data.ProductId,
          quantity: Number(data.quantity),
          unitCost: Number(data.unitCost),
          total: Number(data.quantity) * Number(data.unitCost),
        },
      ],
    };

    const res = await createPurchase(purchaseData);
    if (res.data.success) {
      navigate("/purchase-list");
    }
  };

  return (
    <Row justify="center">
      <Col span={24}>
        <IForm onSubmit={onsubmit}>
          <Typography.Title level={3}>Product Information</Typography.Title>
          <Row gutter={2}>
            <Col span={24} md={12} lg={8}>
              <ISelect
                name="ProductId"
                label="Product Name"
                placeholder="Select Product Name"
                required={true}
                options={productOptions}
              />
            </Col>
            <Col span={24} md={12} lg={8}>
              <IInput type="number" name="quantity" label="Quantity" required={true} />
            </Col>
            <Col span={24} md={12} lg={8}>
              <IInput type="number" name="unitCost" label="Unit Price" required={true} />
            </Col>
          </Row>

          <Typography.Title level={3}>Create Purchase</Typography.Title>
          <Row gutter={2}>
            <Col span={24} md={12} lg={8}>
              <ISelect
                name="SupplierId"
                label="Supplier Name"
                placeholder="Select Supplier Name"
                required={true}
                options={supplierOptions}
              />
            </Col>
            <Col span={24} md={12} lg={8}>
              <IInput type="number" name="vatTax" label="Vat/Tax" required={true} />
            </Col>
            <Col span={24} md={12} lg={8}>
              <IInput type="number" name="discount" label="Discount" required={true} />
            </Col>
            <Col span={24} md={12} lg={8}>
              <IInput type="number" name="otherCost" label="Other Cost" required={true} />
            </Col>
            <Col span={24} md={12} lg={8}>
              <IInput type="number" name="shoppingCost" label="Shipping Cost" required={true} />
            </Col>
            <Col span={24} md={12} lg={8}>
              <IInput type="textarea" name="note" label="Note" required={true} />
            </Col>
          </Row>
          <Button htmlType="submit" type="primary" size="large">
            Create Purchase
          </Button>
        </IForm>
      </Col>
    </Row>
  );
};
export default CreatePurchase;
