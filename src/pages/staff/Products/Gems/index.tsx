import { InputType } from "#/api";
import { Gem } from "#/jwelry";
import { useListGemProduct } from "@/api/staff/listProduct";
import { PAGE_SIZE } from "@/constants/page";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Tooltip, Tag, Popover, Button, Pagination, Badge, Col, Form, Input, Row, message } from "antd";

import Table, { ColumnsType, TableProps } from "antd/es/table";
import { useState } from "react";
import { OrderDetail } from "../../invoice";
import { OrderPayload } from "@/api/staff/listInvoice";

export default function Gems() {
  const [currentPage, setCurrentPage] = useState(1);
  const {data,isLoading}=useListGemProduct(currentPage);
  const totalCount=data?.totalPages ||0;
  const [form] = Form.useForm();
  const [cartItems, setCartItems] = useState<OrderPayload[]>([]);
  const columns: TableProps<Gem>['columns'] = [
    {
      title: "ID",
      dataIndex: "gemId",
      key: "gemId",
    },
    {
      title: "Image",
      dataIndex: "featuredImage",
      key: "featuredImage",
      render: (_text:any,{featuredImage})=>{
        return <img src={featuredImage} width={50} height={50} />
      }
    },

    {
      title: "Name",
      dataIndex: "gemName",
      key: "gemName",
    },
    {
      title: "Origin",
      dataIndex: "origin",
      key: "origin",
    },
    { title: "Cara weight", align: 'center', key: "caratWeight", dataIndex: "caratWeight" },
    { title: "Color", key: "colour", dataIndex: "colour" },
    { title: "Clarity", key: "clarity", dataIndex: "clarity" },
    { title: "Cut", key: "cut", dataIndex: "cut" },
    {
      title: "Gem Price",
      dataIndex: "gemPrice",
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
    { title: "Action", key: "action", dataIndex: "action",
      render: (_text: any, {gemId}) => (
        <Button type="primary" onClick={() => handlegemSelect(gemId)}>
          Select
        </Button>
      ),
     },
  ];
  const onFinishHandler = (values: InputType) => {
    console.log(values);
  };
  const cartContent = (<div>hello</div>)
  const handleRemoveDetail = (detail: OrderDetail) => {
    setCartItems((prevItems:any[]) =>
      prevItems.map(item => ({
        ...item,
        orderDetails: item.orderDetails.filter((d:any) => d !== detail),
      }))
    );
  };const handleSendOrder=(cartitem:any)=>{
    if (cartitem.length === 0) {
      message.error("Your Order is empty") // Hiển thị thông báo khi không có sản phẩm trong giỏ hàng
      return; // Chặn việc gửi lên API khi không có sản phẩm trong giỏ hàng
    }
   
    
  }
  const getOrderDetailsCount = () => {
    return cartItems.reduce((count, item) => count + item.orderDetails.length, 0);
  };
  return (
    <div>
      <Form form={form} onFinish={onFinishHandler}>
        <Row gutter={24} justify="space-between">
          <Col xs={12} md={18} sm={14} lg={19} xl={20} xxl={18}>
            <Row gutter={[12, 12]}>
              <Col xs={24} md={21} sm={12}>
                <Row gutter={[12, 12]}>
                  <Col>
                    <Form.Item name="Search">
                      <Input placeholder="Search by id" allowClear />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} lg={12}>
                    <Button type="primary">Create Purchase Order</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col xs={12} sm={10} md={6} lg={5} xl={4} xxl={6}>
            <Row>
              <Col xs={24} sm={12} lg={3}>
                <Popover
                  content={cartContent}
                  trigger="hover"
                  placement="bottomRight"
                >
                  <Button
                    type="default"
                    style={{ display: "flex", alignItems: "center" }}
                    onClick={() => handleSendOrder(cartItems)}
                  >
                    <ShoppingCartOutlined style={{ marginRight: 8 }} />
                    <span style={{ marginRight: 8 }}>Select Order</span>
                    <Badge
                      count={getOrderDetailsCount()}
                      style={{ backgroundColor: "#52c41a" }}
                    />
                  </Button>
                </Popover>
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
    </div>
  );
}
function handlegemSelect(invoiceId: any): void {
  throw new Error("Function not implemented.");
}

