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
import { FormGem } from "./gem.create";

export default function GemList() {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [listRelateParams, setListRelateParams] = useState<InputType>();
    const [formGem, setFormGem] = useState<any>(false);
    const onOpenFormHandler = (record?: any) => {
      if (record) {
        setFormGem(record);
      } else {
        setFormGem(undefined);
      }
    };
    const closeFormGem = async () => {
      setFormGem(false);
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
      title: "Origin",
      dataIndex: "origin",
    },
    { title: "Cara weight", dataIndex: "caraWeight" },
    { title: "Color", dataIndex: "color" },
    { title: "Clarity", dataIndex: "clarity" },
    { title: "Cut", dataIndex: "cut" },
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
        // dataSource={data?.contends}
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
      {formGem !== false && (
        <FormGem formData={formGem} onClose={closeFormGem} />
      )}
    </Card>
  );
}
