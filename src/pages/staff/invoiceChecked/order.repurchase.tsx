import { useCreatePurchaseInvoice } from "@/api/staff/listInvoice";
import { Modal, Form, Tabs, Input, Button, Select } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { useState, useEffect } from "react";

const { Option } = Select;

type InvoiceDetail = {
  productId: number;
  quantity: number;
  productName:string;
};

type PurchaseOrderFormProps = {
  data?: any;
  onclose: () => void;
};

export default function OrderRePurchase({
  data,
  onclose
}: PurchaseOrderFormProps) {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState("Jewellery");
  const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetail[]>([]);
  const [changedProducts, setChangedProducts] = useState<number[]>([]);
  const userlocal=localStorage.getItem('user')||"";
    const user = JSON.parse(userlocal);
  const {mutateAsync: CreatePurchaseInvoice}=useCreatePurchaseInvoice(onclose)
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        customerName: data.customerName,
        phoneNumber: data.phoneNumber,
      });
      setInvoiceDetails(data.items);
    }
  }, [data, form]);

  const handleFinish = async (values: any) => {
    

    // Chuẩn bị dữ liệu để gửi lên API
    const requestData = {
      inOrOut: 'In', // Giá trị mặc định cho inOrOut
      userId: user.id, // Chuyển userId từ string sang number
      total: 0, // Giá trị mặc định cho total
      customerName: values.customerName, // Lấy customerName từ form
      phoneNumber: values.phoneNumber, // Lấy phoneNumber từ form
      invoiceDetails: values.invoiceDetails.map((detail: any) => ({
        productId: detail.value, // Lấy productId từ Option trong Select
        quantity: invoiceDetails.find((item) => item.productId === detail.value)?.quantity || 0, // Lấy quantity tương ứng với productId
      })),
    };
    CreatePurchaseInvoice(requestData);
  };

  const handleTabChange = (key: any) => {
    setActiveTab(key);
  };

  const handleQuantityChange = (productId: number, quantity: number) => {
    // Kiểm tra số lượng nhập vào không được âm và không vượt quá số lượng hiện có
    if (quantity >= 0) {
      const updatedDetails = invoiceDetails.map((detail) =>
        detail.productId === productId ? { ...detail, quantity } : detail
      );
      // Lấy ra danh sách sản phẩm có số lượng thay đổi
      const updatedProductIds = updatedDetails.map((detail) => detail.productId);
      setInvoiceDetails(updatedDetails);
      setChangedProducts(updatedProductIds);
    }
  };

  return (
    <div>
      <Modal title="Purchase Order" open onCancel={onclose} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Tabs defaultActiveKey="Jewellery" onChange={handleTabChange}>
            <TabPane tab="Gem & Jewellery" key="Jewellery">
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
              <Form.Item
                name="invoiceDetails"
                label="Product Details"
                rules={[{ required: true, message: "Please enter product details" }]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="Select product details"
                  labelInValue
                  style={{ width: '100%' }}
                  dropdownRender={(menu) => (
                    <div>
                      {menu}
                      
                      {activeTab === 'Jewellery' && (
                        invoiceDetails.map((detail) => (
                          <div key={detail.productId} style={{ display: 'flex', alignItems: 'center', padding: '2px' }}>
                            <span style={{ flex: 1 }}>{`ID: ${detail.productId}`}</span>
                            <span style={{ marginLeft: '2px' }}>{detail.productName}</span>
                            <Input
                              type="number"
                              value={detail.quantity}
                              onChange={(e) => handleQuantityChange(detail.productId, parseInt(e.target.value))}
                              style={{ width: '100px', marginLeft: '8px' }}
                              min={1} // Giới hạn số lượng không được nhập số âm
                              max={detail.quantity} // Giới hạn số lượng không được vượt quá số lượng hiện có
                            />
                            
                          </div>
                          
                        ))
                      )}
                    </div>
                  )}
                >
                  {invoiceDetails?.map((detail: InvoiceDetail) => (
                    <Option key={detail.productId} value={detail.productId}>
                      {`Product ID: ${detail.productId}, Quantity: ${detail.quantity}`}
                    </Option>
                  ))}
                </Select>
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
