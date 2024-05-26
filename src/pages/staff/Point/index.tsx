import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  Pagination,
  Row,
  Typography,
} from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useState } from "react";

import { InputType } from "#/api";

export default function DiscountPoint() {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [listRelateParams, setListRelateParams] = useState<InputType>();

  // Thêm dữ liệu cứng cho bảng
  const data = [
    {
      id: 1,
      name: "John Doe",
      sdt: "123456789",
      point: 100,
      color: "40%",
    },
    {
      id: 2,
      name: "Jane Smith",
      sdt: "987654321",
      point: 200,
      color: "10%",
    },
    {
      id: 3,
      name: "Alice Johnson",
      sdt: "555666777",
      point: 150,
      color: "20%",
    },
    {
      id: 4,
      name: "Bob Brown",
      sdt: "111222333",
      point: 180,
      color: "30%",
    },
    {
      id: 5,
      name: "Emma Davis",
      sdt: "999888777",
      point: 250,
      color: "50%",
    },
  ];

  const columns: ColumnsType<any> = [
    {
      title: "No",
      dataIndex: "no",
      render: (_text, _data, index) => <Title level={5}>{++index}</Title>,
      width: "5%",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Số Điện thoại",
      dataIndex: "sdt",
    },
    {
      title: "Point",
      dataIndex: "point",
    },
    {
      title: "Ưu Đãi",
      dataIndex: "color", },
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
    <Card>
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
        dataSource={data} // Sử dụng dữ liệu cứng đã tạo
        // loading={isLoading}
      />
      <Pagination
        showSizeChanger
        onChange={onPageChange}
        // total={data?.totalPages}
        // showTotal={(total) => ` ${total} `}
        // current={data?.page}
        style={{ marginTop: "1rem" }}
      />
    </Card>
  );
}
