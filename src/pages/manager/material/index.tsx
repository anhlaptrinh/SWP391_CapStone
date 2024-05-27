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
import { FormMaterial } from "./material.create";

export default function MaterialList() {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [listRelateParams, setListRelateParams] = useState<InputType>();
    const [formMaterial, setFormMaterial] = useState<any>(false);
    const onOpenFormHandler = (record?: any) => {
      if (record) {
        setFormMaterial(record);
      } else {
        setFormMaterial(undefined);
      }
    };
    const closeFormMaterial = async () => {
      setFormMaterial(false);
    };
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
      title: "Weight",
      dataIndex: "weight",
    },
    {
      title: "Buy price",
      dataIndex: "buyPrice",
    },
    { title: "Sell price", dataIndex: "sellPrice" },
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
            name: "Gold",
            weight: "100g",
            buyPrice: "10.000 VND",
            sellPrice: "13.000 VND",
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
      {formMaterial !== false && (
        <FormMaterial formData={formMaterial} onClose={closeFormMaterial} />
      )}
    </Card>
  );
}
