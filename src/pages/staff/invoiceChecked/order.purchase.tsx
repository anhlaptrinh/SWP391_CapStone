import { Modal, Form, Tabs, Input, Button } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { useState } from "react";

type purchaseOrderFormProps = {
 data?:any,
  onclose: () => void;
};

export default function OrderPurchase({
  data,
  onclose
}: purchaseOrderFormProps) {
  const [form] = Form.useForm();
  const handleFinish = async (values: any) => {
    console.log(values);
  };
  const handleTabChange = (key: any) => {
    setActiveTab(key);
  };
  const [activeTab, setActiveTab] = useState("gold");

  return (
    <div>
      <Modal title="Purchase Order" open onCancel={onclose} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
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
              {/* <Form.Item
                name="phoneNumber"
                label="Phone Number"
                rules={[
                  { required: true, message: "Please enter phone number" },
                ]}
              >
                <Input />
              </Form.Item> */}
              
              <Form.Item
                name="quantity"
                label="Quantity"
                rules={[{ required: true, message: "Please enter weight" }]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                name="ProductId"
                label="Product Id"
                rules={[{ required: true, message: "Please enter weight" }]}
              >
                <Input type="number" />
              </Form.Item>
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
