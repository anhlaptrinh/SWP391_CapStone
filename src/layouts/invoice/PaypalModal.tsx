import React from "react";
import { Modal, Form, Input, Button, Typography } from "antd";
import { PrinterOutlined } from '@ant-design/icons';
import { Paypal } from "../_common/paypal";
import payment from './../../assets/images/payment.svg';
const { Title } = Typography;

interface InvoiceData {
  invoiceCode: string;
  productName: string;
  totalAmount: number;
}

interface ModalComponentProps {
  visible: boolean;
  onClose: () => void;
  invoiceData: InvoiceData;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ visible, onClose, invoiceData }) => {
  const handlePrint = () => {
    // Add print logic here
    window.print();
  };

  return (
    <Modal
      title={<Title className="text-center" level={3}>Pay with PayPal</Title>}
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <div style={{ position: "relative", textAlign: "center", marginBottom: "1rem" }}>
        <img
          src={payment}
          alt="PayPal"
          style={{ width: "400px" }}
        />
        <Button
          type="primary"
          icon={<PrinterOutlined style={{ fontSize: '32px'}}/>}
          onClick={handlePrint}
          size="large"
          style={{ 
            position: "absolute", 
            top: 10, 
            right: 10,
            height: "50px",
            width: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      </div>
      <div>
        <p>Invoice Code: {invoiceData.invoiceCode}</p>
        <p>Product Name: {invoiceData.productName}</p>
        <p>Total Amount: ${invoiceData.totalAmount}</p>
        <Form>
          <Form.Item name="voucher" label="Voucher Code">
            <Input placeholder="Enter voucher code" />
          </Form.Item>
        </Form>
        <p>Last Total: 999</p>
        <Paypal />
      </div>
    </Modal>
  );
};

export default ModalComponent;
