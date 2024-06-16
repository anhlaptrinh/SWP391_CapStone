import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  Pagination,
  Popconfirm,
  Row,
  Typography,
} from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { InputType } from "#/api";
import { FormProduct } from "./product.create";
import { useDeleteProduct, useListProduct } from "@/api/manager/products";
import { CircleLoading } from "@/components/loading";
import { numberWithCommas } from "@/utils/string";
import { ProductDetail } from "./product.detail";
import { IconButton, Iconify } from "@/components/icon";

export default function ProductsList() {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [listRelateParams, setListRelateParams] = useState<InputType>();
  const { data, isLoading } = useListProduct();
  const { mutateAsync: deleteMutate } = useDeleteProduct();
  const [formProduct, setFormProduct] = useState<any>(false);
  const [showDetail, setShowDetail] = useState<any>(false);
  if (isLoading) return <CircleLoading />;
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
    const closeDetail = async () => {
      setShowDetail(false);
    };
  const columns: ColumnsType<any> = [
    {
      title: "No",
      dataIndex: "no",
      render: (_text, _data, index) => <Title level={5}>{++index}</Title>,
      width: "5%",
    },
    {
      title: "Featured Image",
      dataIndex: "featuredImage",
      render: (text) => (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Image
            style={{ width: 100, height: 100, objectFit: "cover" }}
            src={text}
          />
        </div>
      ),
    },
    {
      title: "Product Name",
      dataIndex: "productName",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    { title: "Gender", dataIndex: "gender" },
    { title: "Colour", dataIndex: "colour" },
    {
      title: "Production Cost",
      dataIndex: "productionCost",
      render: (text) => <div>{numberWithCommas(text || 0)} VND</div>,
    },
    {
      title: "Action",
      align: "center",
      render: (_, record) => (
        <div className="text-gray flex w-full items-center justify-center">
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onOpenFormHandler(record);
            }}
          >
            <Iconify icon="solar:pen-bold-duotone" size={18} />
          </IconButton>
          <Popconfirm
            title="Delete the Product?"
            okText="Yes"
            cancelText="No"
            placement="left"
            onConfirm={(e : any) => { e.stopPropagation();
            deleteMutate(record.productId)}}
          >
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
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

  // const onOpenDetail = (record?: any) => {
  //   if (record) {
  //     setClickOne(record);
  //   } else {
  //     setClickOne(undefined);
  //   }
  //   setShowInfo(true);
  // };
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
        loading={isLoading}
        onRow={(record) => {
          return {
            onClick: (event) => setShowDetail(record)
          };
        }}
      />
      {/* <Pagination
        showSizeChanger
        onChange={onPageChange}
        // total={data?.totalPages}
        // showTotal={(total) => ` ${total} `}
        // current={data?.page}
        style={{ marginTop: "1rem" }}
      /> */}
      {formProduct !== false && (
        <FormProduct formData={formProduct} onClose={closeFormProduct} />
      )}
      {showDetail !== false && (
        <ProductDetail data={showDetail} onClose={closeDetail} />
      )}
    </Card>
  );
}
