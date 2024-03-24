import { Button, Col, Row, Typography } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import IForm from "../../components/form/IForm";
import IInput from "../../components/form/IInput";
import ISelect from "../../components/form/ISelect";
import { useCustomerDropdownQuery } from "../../redux/features/customer/customerApi";
import { useProductDropdownQuery } from "../../redux/features/product/productApi";
import { useCreateSellMutation } from "../../redux/features/sell/sellApi";

const CreateSell = () => {
  const navigate = useNavigate();

  const { data: customers } = useCustomerDropdownQuery(undefined);
  const customerOptions = customers?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  const { data: products } = useProductDropdownQuery(undefined);
  const productOptions = products?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  const [createSell] = useCreateSellMutation();

  const onsubmit = async (data) => {
    if (!data.CustomerId || !data.ProductId || !data.shoppingCost || !data.unitCost) {
      return toast.error("All Field are Required");
    }
    try {
      const sellData = {
        parent: {
          CustomerId: data.CustomerId,
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

      const res = await createSell(sellData);
      if (res.data.success) {
        navigate("/sell-list");
      }
    } catch (error) {
      toast.error(error.data.message);
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

          <Typography.Title level={3}>Create Sell</Typography.Title>
          <Row gutter={2}>
            <Col span={24} md={12} lg={8}>
              <ISelect
                name="CustomerId"
                label="Customer Name"
                placeholder="Select Customer Name"
                required={true}
                options={customerOptions}
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
            Create Sell
          </Button>
        </IForm>
      </Col>
    </Row>
  );
};
export default CreateSell;
