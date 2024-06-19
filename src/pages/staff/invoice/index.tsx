import ModalComponent from "@/layouts/invoice/PaypalModal";
import {
  Button,
  Card,
  Col,
  Row,
  Space,
  Typography,
  Input,
  Table,
  Form,
  TableProps,
  Tag,
  Popover,
} from "antd";
import { useState } from "react";
export interface Order {
  orderId: string;
  orderType: string;
  customerName: string;
  userName: string;
  warranty: string;
  orderDate: string;
  status: boolean;
  orderDetail: OrderDetail[];
  total: number;
}

export interface OrderDetail {
  ProductName: string;
  sellPrice: string;
  buyPrice: string;
  perDiscount?: string;
}

export default function InvoiceList() {
  const { Title } = Typography;
  const [open, isopen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const invoiceData = {
    invoiceCode: "INV001",
    productName: "Product A",
    totalAmount: 500,
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const data:any[]= [
    {
      orderId: 'INV001',
      orderType: 'Sale',
      customerName: 'John Doe',
      userName: 'Alice',
      warranty: '1 year',
      status: true,
      orderDetail: [
        { ProductName: 'Product A', sellPrice: 100 },
        { ProductName: 'Product B', sellPrice: 150 },
      ],
    },
  
  ];

  const columns: TableProps<Order>["columns"] = [
    {
      title: "Invoice ID",
      dataIndex: "orderId",
    },
    {
      title: "Order Type",
      align: "center",
      dataIndex: "orderType",
      key: "orderType",
    },
    {
      title: "Customer",
      align: "center",
      dataIndex: "customerName",
      key: "customerName",
    },
    { title: "Staff", align: "center", dataIndex: "userName", key: "userName" },
    {
      title: "Warranty",
      align: "center",
      dataIndex: "warranty",
      key: "warranty",
    },
    { title: "Status", align: "center", dataIndex: "status", key: "status", render: (status) => (
      <Tag color={status ? 'yellow' : 'red'}>
        {status ? 'Inprogress' : 'Inactive'}
      </Tag>
    ), },
    {
      title: "Items",
      align: "center",
      dataIndex: "orderDetail",
      key: "orderDetail",
      render: (_, record) => (
        <Popover
          title="Order Detail"
          content={
            <ul>
              {record.orderDetail.map((item, index) => (
                <li key={index}>
                  <Tag color="blue">{item.ProductName}</Tag>
                  <span>({item.sellPrice})</span>
                </li>
              ))}
            </ul>
          }
          trigger="hover"
        >
          <button style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
            Details
          </button>
        </Popover>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_text:any, record:any) => (
        <Space size="middle">
          <Button type="primary" onClick={() => { isopen(true); handleOpenModal(); }}>Pay</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card>
      <Row gutter={24} justify="space-between">
              <Col span={20}>
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item name="Search">
                      <Input placeholder="Search by name" allowClear />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                        <Button type="primary">
                          Reset
                        </Button>

                  </Col>
                </Row>
              </Col>
             
            </Row>
        <Table
          dataSource={data}
          columns={columns}
          rowKey="id"
          
        />
      </Card>
      <ModalComponent
        visible={isModalVisible}
        onClose={handleCloseModal}
        invoiceData={invoiceData}
        
      />
    </>
  );
}
