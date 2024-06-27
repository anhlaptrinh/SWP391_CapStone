import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Pagination,
  Popconfirm,
  Row,
  Typography,
} from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useState } from "react";

import { InputType } from "#/api";
import { FormMaterial } from "./material.create";
import { useDeleteMaterial, useListMaterial } from "@/api/manager/material";
import { CircleLoading } from "@/components/loading";
import { numberWithCommas, transformObject } from "@/utils/string";
import { IconButton, Iconify } from "@/components/icon";

export default function MaterialList() {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [listRelateParams, setListRelateParams] = useState<InputType>();
  const [formMaterial, setFormMaterial] = useState<any>(false);
  const { data, isLoading } = useListMaterial();
  const { mutateAsync: deleteMutate } = useDeleteMaterial();
  if (isLoading) return <CircleLoading />;
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
    const submitHandleDelete = (record?: any) => {
      if (record) {
        deleteMutate(record);
      }
    };
  const columns: ColumnsType<any> = [
    {
      title: "No",
      dataIndex: "no",
      render: (_text, _data, index) => <Title level={5}>{++index}</Title>,
      width: "5%",
    },
    {
      title: "Material Name",
      dataIndex: "materialName",
    },
    {
      title: "Buy Price",
      dataIndex: "materialPrice",
      render: (_, record) => (
        <div>{numberWithCommas(record.materialPrice?.buyPrice || 0)} VND</div>
      ),
    },
    {
      title: "Sell Price",
      dataIndex: "materialPrice",
      render: (_, record) => (
        <div>{numberWithCommas(record.materialPrice?.sellPrice || 0)} VND</div>
      ),
    },
    {
      title: "Action",
      align: "center",
      render: (_, record) => (
        <div className="text-gray flex w-full items-center justify-center">
          <IconButton onClick={() => onOpenFormHandler(record)}>
            <Iconify icon="solar:pen-bold-duotone" size={18} />
          </IconButton>
          <Popconfirm
            title="Delete the material"
            okText="Yes"
            cancelText="No"
            placement="left"
            onConfirm={() => {
              submitHandleDelete(record.materialId.toString());
            }}
          >
            <IconButton>
              <Iconify
                icon="mingcute:delete-2-fill"
                size={18}
                className="text-error"
              />
            </IconButton>
          </Popconfirm>
        </div>
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
        // pagination={false}
        columns={columns}
        dataSource={data?.items}
        // loading={isLoading}
      />
      {/* <Pagination
        showSizeChanger
        onChange={onPageChange}
        // total={data?.totalPages}
        // showTotal={(total) => ` ${total} `}
        // current={data?.page}
        style={{ marginTop: "1rem" }}
      /> */}
      {formMaterial !== false && (
        <FormMaterial
          formData={transformObject(
            formMaterial,
            "materialPrice"
          )}
          onClose={closeFormMaterial}
        />
      )}
    </Card>
  );
}
