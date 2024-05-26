import ModalComponent from "@/layouts/invoice/PaypalModal";
import { SearchOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Row,
  Space,
  Typography,
  Table,
  Input
} from "antd";
import Meta from "antd/es/card/Meta";
import { useState } from "react";

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

  const data = [
    {
      id: 1,
      invoice: "Invoice 1",
      productName: 'Product 1',
      gemstone: 'Diamond',
      price: '$100',
    },
    {
      id: 2,
      invoice: "Invoice 2",
      productName: 'Product 2',
      gemstone: 'Ruby',
      price: '$200',
    },
    {
      id: 3,
      invoice: "Invoice 3",
      productName: 'Product 3',
      gemstone: 'Emerald',
      price: '$150',
    },
    {
      id: 4,
      invoice: "Invoice 4",
      productName: 'Product 4',
      gemstone: 'Sapphire',
      price: '$180',
    },
    {
      id: 5,
      invoice: "Invoice 5",
      productName: 'Product 5',
      gemstone: 'Topaz',
      price: '$120',
    },
  ];

  const tableData = [
    {
      no: 1,
      invoiceCode: "INV001",
      productName: "Product A",
      totalAmount: "$500",
      staffName: "John Doe",
    },
    {
      no: 2,
      invoiceCode: "INV002",
      productName: "Product B",
      totalAmount: "$700",
      staffName: "Jane Smith",
    },
    {
      no: 3,
      invoiceCode: "INV003",
      productName: "Product C",
      totalAmount: "$900",
      staffName: "Alice Johnson",
    },
    {
      no: 4,
      invoiceCode: "INV004",
      productName: "Product D",
      totalAmount: "$1200",
      staffName: "Bob Brown",
    },
    {
      no: 5,
      invoiceCode: "INV005",
      productName: "Product E",
      totalAmount: "$1500",
      staffName: "Emma Davis",
    },
  ];

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      render: (_text:string, _data:any, index:number) => <Title level={5}>{++index}</Title>,
      width: "5%",
    },
    {
      title: "Invoice Code",
      dataIndex: "invoiceCode",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
    },
    {
      title: "Staff Name",
      dataIndex: "staffName",
    },
  ];

  const renderCards = () => {
    return data.map(item => (
      <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
        <Card>
          <Meta
            avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
            title={item.invoice}
            description={
              <>
                <p>{item.productName}</p>
                <p>{item.gemstone}</p>
                <p>{item.price}</p>
              </>
            }
          />
          <div className="mt-3">
            <Button type="default" className="mr-2">See Later</Button>
            <Button type="primary" onClick={() => { isopen(true); handleOpenModal() }}>Pay</Button>
          </div>
        </Card>
      </Col>
    ));
  };

  return (
    <>
      <Card>
        <Row className="mb-5">
          <Space direction="vertical">
            <Input.Search
              placeholder="input search text"
              allowClear
              enterButton="Search"
              size="large"
            />
          </Space>
        </Row>
        <Row gutter={[15, 12]} className="flex flex-grow space-x-7">
          {renderCards()}
        </Row>
      </Card>

      <Card
        style={{ marginTop: "2rem" }}
        title={<Title level={2}>Invoice Checking</Title>}
      >
        <Form>
          <Row gutter={24} justify="space-between">
            <Col span={20}>
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item name="Search">
                    <Input placeholder="Search by name" allowClear />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Row>
                    <Col span={7}>
                      <Form.Item name="search">
                        <Button type="primary" htmlType="submit">
                          Search
                        </Button>
                      </Form.Item>
                    </Col>
                    <Col span={7}>
                      <Button type="primary">
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={2}>
              <Row>
                <Col span={12}>
                  <Button type="primary">New</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
        <Table
          rowKey="id"
          size="small"
          scroll={{ x: "max-content" }}
          pagination={false}
          columns={columns}
          dataSource={tableData}
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
