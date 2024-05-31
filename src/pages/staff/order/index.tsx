import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Pagination,
  Row,
  Space,
  Typography,
} from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useState } from "react";

import { InputType } from "#/api";

export default function Order() {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [listRelateParams, setListRelateParams] = useState<InputType>();

  // Dữ liệu cho bảng Order Checking
  const data: any[] = [
    {
      no: 1,
      name: "Product A",
      sellPrice: 300,
      gems: "2328iji"
    },
    {
      no: 2,
      name: "Product B",
      sellPrice: 350,
      gems: "2328iji"
    },
    {
      no: 3,
      name: "Product C",
      sellPrice: 400,
      gems: "2328iji"
    },
    {
      no: 4,
      name: "Product D",
      sellPrice: 500,
      gems: "2328iji"
    },
    {
      no: 5,
      name: "Product E",
      sellPrice: 550,
      gems: "2328iji"
    },
  ];

  // Các cột cho bảng Order Checking
  const columns: ColumnsType<any> = [
    {
      title: "No",
      dataIndex: "no",
      render: (_text, _data, index) => <Title level={5}>{++index}</Title>,
      width: "5%",
    },
    {
      title: "Name", align: "center",
      dataIndex: "name",
    },
    { title: "Gems", align: "center", dataIndex: "gems" },
    { title: "Sell price",align: "center", dataIndex: "sellPrice" },
    {
      title: "Action",
      dataIndex: "actions",
      align: "center",
      render: (_title, record) => (
        <Space size="middle" style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="primary" >Submit</Button>
          <Button type="primary" danger>Delete</Button>
          <Button type="primary" className="bg-green-700">Edit</Button>
        </Space>
      ),
    },
  ];

  const resetHandler = () => {
    form.resetFields();
  };

  const onPageChange = (page: number, pageSize: number) => {
    const values: InputType = { PageIndex: page, PageSize: pageSize };
    setListRelateParams(values);
  };

  const onFinishHandler = (values: InputType) => {
    setListRelateParams(values);
  };

  return (
    <>
      <Card  style={{ marginTop: "2rem" }} title={<Title level={3}>Order Checking</Title>}>
        <Form form={form} onFinish={onFinishHandler}>
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
                      <Button type="primary" onClick={resetHandler}>
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
          dataSource={data}
        />
        <Pagination
          showSizeChanger
          onChange={onPageChange}
          style={{ marginTop: "1rem" }}
        />
      </Card>
    </>
  );
}
