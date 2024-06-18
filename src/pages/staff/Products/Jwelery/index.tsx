import { InputType } from "#/api";
import { Gem, Material, Product } from "#/jwelry";
import { useListProduct } from "@/api/staff/listProduct";
import { PAGE_SIZE } from "@/constants/page";
import { ShoppingCartOutlined } from "@ant-design/icons";
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Pagination,
  Popover,
  Row,
  Table,
  TableProps,
  Tabs,
  Tag,
  Tooltip,
} from "antd";
import form from "antd/es/form";
import React, { useState } from "react";

export default function Jwelery() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useListProduct(currentPage);
  const totalCount = data?.totalPages || 0;
  const [showTable, setShowTable] = useState(false);
  const [Gemlist, setGemlist] = useState<Gem[]>([]);
  const [materiallist, setmateriallist] = useState<Material[]>([]);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [form] = Form.useForm();
  const columns: TableProps<Product>["columns"] = [
    {
      title: "ID",
      dataIndex: "productId",
      key: "productId",
    },

    {
      title: "Image",
      dataIndex: "featuredImage",
      key: "featuredImage",
      render: (_text: any, { featuredImage }) => {
        return <img src={featuredImage} width={100} height={100} />;
      },
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productId",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Percent Rate",
      dataIndex: "percentPriceRate",
      key: "percentPriceRate",
      render: (_: any, { percentPriceRate }) => <p>{percentPriceRate}$</p>,
    },
    {
      title: "Processing Cost",
      dataIndex: "productionCost",
      key: "productionCost",
      render: (_: any, { productionCost }) => <p>{productionCost}$</p>,
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      render: (_text: any, record) => (
        <Button
          type="primary"
          onClick={() => handleTable(record.gems, record.materials)}
        >
          Select
        </Button>
      ),
    },
  ];

  const columnsGems: TableProps<Gem>["columns"] = [
    {
      title: "ID",
      dataIndex: "gemId",
      key: "gemId",
    },
    {
      title: "Image",
      dataIndex: "featuredImage",
      key: "featuredImage",
      render: (_text: any, { featuredImage }) => {
        return <img src={featuredImage} width={50} height={50} />;
      },
    },

    {
      title: "Name",
      dataIndex: "gemName",
      key: "gemName",
      align: "center",
    },
    {
      title: "Origin",
      dataIndex: "origin",
      key: "origin",
    },
    {
      title: "Cara weight",
      align: "center",
      key: "caratWeight",
      dataIndex: "caratWeight",
    },
    { title: "Color", key: "colour", dataIndex: "colour" },
    { title: "Clarity", key: "clarity", dataIndex: "clarity" },
    { title: "Cut", key: "cut", dataIndex: "cut" },
    {
      title: "Gem Price",
      dataIndex: "gemPrice",
      align: "center",
      key: "gems",
      render: (_text: any, { gemPrice }) => {
        const { caratWeightPrice, colourPrice, clarityPrice, cutPrice, total } =
          gemPrice;
        const content = (
          <div>
            <Tooltip title="Carat Weight Price">
              <Tag color="pink">Carat Weight Price: {caratWeightPrice}</Tag>
            </Tooltip>
            <Tooltip title="Colour Price">
              <Tag color="pink">Colour Price: {colourPrice}</Tag>
            </Tooltip>
            <Tooltip title="Clarity Price">
              <Tag color="pink">Clarity Price: {clarityPrice}</Tag>
            </Tooltip>
            <Tooltip title="Cut Price">
              <Tag color="pink">Cut Price: {cutPrice}</Tag>
            </Tooltip>
          </div>
        );

        return (
          <Popover mouseEnterDelay={0.5} content={content} title="Gem Price">
            <Button type="link">{gemPrice.total}$</Button>
          </Popover>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      align: "center",
      render: (_text: any, { gemId }) => <Button type="primary">Select</Button>,
    },
  ];
  const materialColumns: TableProps<Material>["columns"] = [
    {
      dataIndex: "materialId",
      align: "center",
      key: "materialId",
      title: "Material ID",
    },
    {
      title: "Material Name",
      dataIndex: "materialName",
      key: "materialName",
      align: "center",
    },
    {
      title: "Material Price",
      dataIndex: "materialPrice",
      key: "materialPrice",
      align: "center",
      render: (_text: any, { materialPrice }) => {
        const { buyPrice, sellPrice } = materialPrice;
        const content = (
          <div>
            <Tooltip title="Purchase Price">
              <Tag color="purple">Purchase Price: {buyPrice}$</Tag>
            </Tooltip>
          </div>
        );

        return (
          <Popover mouseEnterDelay={0.5} content={content} title="Gold Price">
            <Button type="link">Sale Price: {sellPrice}$</Button>
          </Popover>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      dataIndex: "action",
      render: (_text: any, { materialId }) => (
        <Button type="primary">Select</Button>
      ),
    },
  ];
  const handleAddToCart = (item: any) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };
  const handleTable = (gems: Gem[], material: Material[]) => {
    setGemlist(gems);
    setmateriallist(material);
    setShowTable(true);
  };
  const onFinishHandler = (values: InputType) => {
    console.log(values);
  };
  return (
    <div>
      <Form form={form} onFinish={onFinishHandler}>
        <Row gutter={24} justify="space-between">
          <Col xs={12} md={18} sm={14} lg={19} xl={20} xxl={18}>
            <Row gutter={[12, 12]}>
              <Col xs={24} md={21} sm={12}>
                <Row>
                  <Col>
                    <Form.Item name="Search">
                      <Input placeholder="Search by id" allowClear />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col xs={12} sm={10} md={6} lg={5} xl={4} xxl={6}>
            <Row>
              <Col xs={24} sm={12} lg={3}>
                <Button type="default">
                  <Badge count={cartItems.length}>
                    <ShoppingCartOutlined className=" pr-2" />
                  </Badge>
                  <span>Cart</span>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
      <Table
        rowKey="invoiceId"
        className="mt-3"
        columns={columns}
        loading={isLoading}
        pagination={false}
        scroll={{ x: "max-content" }}
        dataSource={data?.items}
        bordered
      />
      <Pagination
        defaultCurrent={currentPage}
        total={totalCount}
        pageSize={PAGE_SIZE}
        onChange={(page) => {
          setCurrentPage(page);
        }}
      />
      <Modal
        closeIcon={false}
        centered
        width={1000}
        open={showTable}
        onCancel={() => setShowTable(false)}
        footer={null}
      >
        <Card className="h-full">
          <Tabs defaultActiveKey="materials">
            <Tabs.TabPane tab="Materials" key="materials">
              <Table
                rowKey="materialId"
                size="small"
                scroll={{ x: "max-content" }}
                pagination={false}
                columns={materialColumns}
                dataSource={materiallist} // Dữ liệu vật liệu
              />
              <Pagination showSizeChanger style={{ marginTop: "1rem" }} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Gems" key="gems">
              <Table
                rowKey="gemId"
                size="small"
                scroll={{ x: "max-content" }}
                pagination={false}
                columns={columnsGems}
                dataSource={Gemlist}
                // Dữ liệu đá quý
              />
              <Pagination showSizeChanger style={{ marginTop: "1rem" }} />
            </Tabs.TabPane>
          </Tabs>
        </Card>
      </Modal>
    </div>
  );
}
