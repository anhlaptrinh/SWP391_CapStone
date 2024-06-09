import {
    Button,
    Card,
    Col,
    Form,
    Row,
    Typography,
    Table,
    Input
  } from "antd";
  import { useState } from "react";
  
  export default function CheckedInvoice() {
    const { Title } = Typography;
  
    const tableData = [
      {
        id: 1,
        invoiceID: "INV001",
        invoiceDate: '2023-05-20',
        
        buyerPhone: '123-456-7890',
        createdBy: 'Alice Smith',
        productName: 'Product 1',
        price: '$100',
        total: '$120',
        discount: '$20',
        amount: '$100',
      },
      {
        id: 2,
        invoiceID: "INV002",
        invoiceDate: '2023-05-21',
        
        buyerPhone: '123-456-7891',
        createdBy: 'Bob Johnson',
        productName: 'Product 2',
        price: '$200',
        total: '$220',
        discount: '$20',
        amount: '$200',
      },
      {
        id: 3,
        invoiceID: "INV003",
        invoiceDate: '2023-05-22',
        
        buyerPhone: '123-456-7892',
        createdBy: 'Charlie Brown',
        productName: 'Product 3',
        price: '$150',
        total: '$170',
        discount: '$20',
        amount: '$150',
      },
      {
        id: 4,
        invoiceID: "INV004",
        invoiceDate: '2023-05-23',
        buyerPhone: '123-456-7893',
        createdBy: 'David Smith',
        productName: 'Product 4',
        price: '$180',
        total: '$200',
        discount: '$20',
        amount: '$180',
      },
      {
        id: 5,
        invoiceID: "INV005",
        invoiceDate: '2023-05-24',
  
        buyerPhone: '123-456-7894',
        createdBy: 'Eve White',
        productName: 'Product 5',
        price: '$120',
        total: '$140',
        discount: '$20',
        amount: '$120',
      },
    ];
  
    const columns = [
      {
        title: "Invoice ID",
        dataIndex: "invoiceID",
        key: "invoiceID",
      },
      {
        title: "Invoice Date",
        dataIndex: "invoiceDate",
        key: "invoiceDate",
      },
      {
        title: "Buyer Phone",
        dataIndex: "buyerPhone",
        key: "buyerPhone",
      },
      {
        title: "Created By",
        dataIndex: "createdBy",
        key: "createdBy",
      },
      {
        title: "Product Name",
        dataIndex: "productName",
        key: "productName",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Total",
        dataIndex: "total",
        key: "total",
      },
      {
        title: "Discount",
        dataIndex: "discount",
        key: "discount",
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
      },
      {
        title: "Action",
        key: "action",
        render: (_text: any, record: any) => (
          <Button type="primary" onClick={() => handleBuyback(record.invoiceCode)}>
            Buyback
          </Button>
        ),
      },
    ];
  
    const handleBuyback = (invoiceCode: string) => {
      // Implement buyback logic here
      console.log(`Buyback initiated for invoice: ${invoiceCode}`);
    };
  
    return (
      <>
        <Card
          style={{ marginTop: "2rem" }}
          title={<Title level={3}>Invoice Checking</Title>}
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
            columns={columns}
            dataSource={tableData}
          />
        </Card>
      </>
    );
  }
  