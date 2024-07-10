import { useCreatePurchaseInvoice } from "@/api/staff/listInvoice";
import { uselistGold } from "@/api/staff/listProduct";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Form, Tabs, Input, Button, Select } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { Key, useState } from "react";

type purchaseOrderFormProps = {
 data?:any,
  onclose: () => void;
};

export default function OrderPurchase({
  data,
  onclose
}: purchaseOrderFormProps) {
  const [form] = Form.useForm();
  const {mutateAsync: CreatePurchaseInvoice}=useCreatePurchaseInvoice(onclose)
  const userlocal=localStorage.getItem('user')||"";
    const user = JSON.parse(userlocal);
  const { data:GoldProduct } = uselistGold();
  const handleFinish = async () => {
    const values=await form.validateFields()
    const requestData = {
      inOrOut: "Out", // Thay bằng giá trị phù hợp
      total: 0,
      customerName: values.customerName,
      phoneNumber: values.phoneNumber,
      userId: user.id, // Thay bằng userId phù hợp
      invoiceDetails: values.goldOrders.map((order: any) => ({
        productId: order.productId,
        quantity: order.quantity
      }))
    };
    CreatePurchaseInvoice(requestData);
  };
  
  const handleTabChange = (key: any) => {
    setActiveTab(key);
  };
  const [activeTab, setActiveTab] = useState<Key>("gold");

  return (
    <div>
      <Modal title="Purchase Order" open onCancel={onclose} footer={null}>
      <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          scrollToFirstError
          initialValues={{ goldOrders: [{ productId: undefined, quantity: undefined }] }}
        >
          <Tabs defaultActiveKey="gold" onChange={handleTabChange}>
            <TabPane tab="Gold" key="gold">
            <Form.Item
                name="customerName"
                label="Customer Name"
                rules={[
                  { required: true, message: "Please enter customer name" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                label="Phone Number"
                rules={[
                  { required: true, message: "Please enter phone number" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.List name="goldOrders">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }, index) => (
                      <div key={key}>
                        <Form.Item
                          {...restField}
                          name={[name, 'productId']}
                          label="Product Id"
                          fieldKey={[name, 'productId']}
                          rules={[{ required: true, message: 'Please select product id' }]}
                        >
                          <Select
                            placeholder="Select gold types"
                            style={{ width: '100%' }}
                          >
                            {GoldProduct?.items?.map((gold: any) => (
                              <Select.Option key={gold.productId} value={gold.productId}>
                                {`${gold.productId} - ${gold.productName}`}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'quantity']}
                          label="Quantity"
                          fieldKey={[name, 'quantity']}
                          rules={[{ required: true, message: 'Please enter quantity' }]}
                        >
                          <Input type="number" addonAfter={'Thread'}/>
                        </Form.Item>
                        {fields.length > 1 && (
                          <Button
                            type="link"
                            onClick={() => remove(name)}
                            style={{ marginBottom: '8px' }}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                          form.scrollToField(fields[fields.length - 1].key);
                        }}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Gold Order
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </TabPane>
          </Tabs>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="mt-4">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
