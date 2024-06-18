import {
    Button,
    Card,
    Col,
    Form,
    Input,
    List,
    Pagination,
    Popover,
    Row,
    Space,
    Tag,
    Typography,
  } from "antd";
  import Table, { TableProps } from "antd/es/table";
  import { useState } from "react";
  import { InputType } from "#/api";
  import { PAGE_SIZE } from "@/constants/page";
  import { Order, OrderDetail } from "#/invoice";
import { useListOrder } from "@/api/staff/listInvoice";
  
  
  export default function InternalOrder() {
    
    // Dữ liệu cho bảng Order Checking
    const {data}=useListOrder();
  
    // Các cột cho bảng Order Checking
    const columns: TableProps<Order>["columns"] = [
      {
        title: "Order ID",
        dataIndex: "orderId",
      },
      {
        title: 'Order Type',
        align: 'center',
        dataIndex: 'invoiceType',
        key: 'invoiceType',
        render: (invoiceType: string) => {
          const color = invoiceType === 'Sale' ? 'blue' : 'red';
          return <Tag color={color}>{invoiceType}</Tag>;
        },
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
      { title: "Status", align: "center", dataIndex: "status", key: "status",render: (status: boolean) => {
        if (status) {
          return <Tag color="yellow">In Progress</Tag>;
        } else {
          return <Tag color="green">Complete</Tag>;
        }
      }, },
      {
        title: "Items Order",
        align: "center",
        dataIndex: "orderDetails",
        key: "orderDetails",
        render: (_text: any, record: any) => {
          const content = (
            <List
              dataSource={record.orderDetails}
              renderItem={(item: OrderDetail) => (
                <List.Item>
                  <Tag bordered={false} color="pink"> <span
                    dangerouslySetInnerHTML={{ __html: item.productName || "" }}
                  /></Tag>
                  <Tag color="blue">Total: {item.purchaseTotal}$</Tag>
                </List.Item>
              )}
            />
          );
    
          return (
            <Popover content={content} title="Items">
              <Button type="link">View Items</Button>
            </Popover>
          );
        },
      },
  
      {
        title: "Action",
        dataIndex: "actions",
        align: "center",
        render: (_title, record) => (
          <Space
            size="middle"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button type="primary">Submit</Button>
            <Button type="primary" danger>
              Delete
            </Button>
            {/* <Button type="primary" className="bg-green-700">Edit</Button> */}
          </Space>
        ),
      },
    ];
    const [currentPage, setCurrentPage] = useState(1);
    const { Title } = Typography;
  
    const [form] = Form.useForm();
    const resetHandler = () => {
      form.resetFields();
    };
  
    const onFinishHandler = (values: InputType) => {
      console.log(values);
    };
   
    return (
      <Card
        style={{ marginTop: "2rem" }}
        title={<Title level={3}>Internal order Checking</Title>}
      >
        <div className="mt-3 text-sm">
          <Form form={form} onFinish={onFinishHandler}>
            <Row gutter={24} justify="space-between">
              <Col xs={12} md={18} sm={14} lg={19} xl={20} xxl={18}>
                <Row gutter={[12, 12]}>
                  <Col xs={24} md={21} sm={12}>
                    <Row>
                      <Col xs={23} md={21} sm={24} lg={8}>
                        <Form.Item name="Search">
                          <Input placeholder="Search by name" allowClear />
                        </Form.Item>
                      </Col>
  
                      <Col xs={24} md={3} sm={24} lg={16}>
                        <Button type="primary" onClick={resetHandler}>
                          Reset
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
          <Table
            rowKey="orderId"
            className="mt-3"
            columns={columns}
            pagination={false}
            scroll={{ x: "max-content" }}
            dataSource={data}
            bordered
          />
          <div className="flex float-end mt-4 pb-4">
            <Pagination
              defaultCurrent={currentPage}
              pageSize={PAGE_SIZE}
              onChange={(page) => {
                setCurrentPage(page);
              }}
            />
          </div>
        </div>
        
      </Card>
    );
  }
  