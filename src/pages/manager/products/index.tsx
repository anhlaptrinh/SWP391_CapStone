import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  Pagination,
  Row,
  Typography,
} from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useState } from "react";

import { InputType } from "#/api";
import { FormProduct } from "./product.create";

export default function ProductsList() {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [listRelateParams, setListRelateParams] = useState<InputType>();
  const [formProduct, setFormProduct] = useState<any>(false);
  const onOpenFormHandler = (record?: any) => {
    if (record) {
      setFormProduct(record);
    } else {
      setFormProduct(undefined);
    }
  };
    const closeFormProduct = async () => {
      setFormProduct(false);
    };
  const columns: ColumnsType<any> = [
    {
      title: "No",
      dataIndex: "no",
      render: (_text, _data, index) => <Title level={5}>{++index}</Title>,
      width: "5%",
    },
    {
      title: "Images",
      dataIndex: "avatarUrl",
      render: (text) => (
        <Image
          style={{ width: 100, height: 100, objectFit: "cover" }}
          src={text}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    { title: "Gender", dataIndex: "gender" },
    { title: "material", dataIndex: "material" },
    { title: "Gem", dataIndex: "gem" },
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
                <Button type="primary" onClick={() => onOpenFormHandler()}>
                  New
                </Button>
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
        dataSource={[
          {
            avatarUrl:
              "https://locphatjewelry.vn/backend/web/uploads/images/NHAN%20DINH%20HON/N1_0115.jpg",
            name: "ring gold 24k",
            category: "ring",
            gender: "Male",
            material: "Gold - 24k",
            gem: "diamond",
          },
        ]}
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
      {formProduct !== false && (
        <FormProduct formData={formProduct} onClose={closeFormProduct} />
      )}
    </Card>
  );
}
