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
        no: 1,
        invoiceCode: "INV001",
        productName: "Product A",
        totalAmount: "$500",
        staffName: "John Doe",
        creationDate: "2024-05-01",
      },
      {
        no: 2,
        invoiceCode: "INV002",
        productName: "Product B",
        totalAmount: "$700",
        staffName: "Jane Smith",
        creationDate: "2024-05-02",
      },
      {
        no: 3,
        invoiceCode: "INV003",
        productName: "Product C",
        totalAmount: "$900",
        staffName: "Alice Johnson",
        creationDate: "2024-05-03",
      },
      {
        no: 4,
        invoiceCode: "INV004",
        productName: "Product D",
        totalAmount: "$1200",
        staffName: "Bob Brown",
        creationDate: "2024-05-04",
      },
      {
        no: 5,
        invoiceCode: "INV005",
        productName: "Product E",
        totalAmount: "$1500",
        staffName: "Emma Davis",
        creationDate: "2024-05-05",
      },
    ];
  
    const columns = [
      {
        title: "No",
        dataIndex: "no",
        render: (_text: string, _data: any, index: number) => <Title level={5}>{++index}</Title>,
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
      {
        title: "Creation Date",
        dataIndex: "creationDate",
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
  