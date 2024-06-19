import { InputType } from "#/api";
import { OrderDetail } from "#/invoice";
import { Gem, Material, Product } from "#/jwelry";
import { OrderPayload, useCreateOrder } from "@/api/staff/listInvoice";
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
  message,
} from "antd";

import { useEffect, useState } from "react";

export default function Jwelery() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useListProduct(currentPage);
  const totalCount = data?.totalPages || 0;
  const [showTable, setShowTable] = useState(false);
  const [Gemlist, setGemlist] = useState<Gem[]>([]);
  const [materiallist, setmateriallist] = useState<Material[]>([]);
  const [cartItems, setCartItems] = useState<OrderPayload[]>([]);
  const [form] = Form.useForm();
  const [selectedGem, setSelectedGem] = useState<number | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<number | null>(null);
  const [gemprice, setgemprice] = useState(0);
  const [materialprice, setmaterialprice] = useState(0);
  const [gemName, setgemname] = useState("");
  const [materialName, setmaterialname] = useState("");
  const [percentPriceRate, setperRate] = useState(0);
  const [processingprice, setprocessingprice] = useState(0);
  const [productname, setproductName] = useState("");
  const { mutate: handlecreateOrder } = useCreateOrder();
  const [showRemoveAll, setShowRemoveAll] = useState(false);
  useEffect(() => {
    setShowRemoveAll(cartItems.length > 0);
  }, [cartItems]);
  
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
      align: "center",
      dataIndex: "action",
      render: (_text: any, record) => (
        <Button
          type="primary"
          onClick={() => handleTable(record.gems, record.materials, record)}
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
      render: (_text: any, gem) => (
        <Button
          disabled={selectedGem !== null && selectedGem !== gem.gemId}
          onClick={() => handleGemSelect(gem)}
          type="primary"
        >
          Select
        </Button>
      ),
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
      render: (_text: any, material) => (
        <Button
          type="primary"
          disabled={
            selectedMaterial !== null &&
            selectedMaterial !== material.materialId
          }
          onClick={() => handleMaterialSelect(material)}
        >
          Select
        </Button>
      ),
    },
  ];
  const handleGemSelect = (gem: Gem) => {
    setSelectedGem(gem.gemId);
    setgemname(gem.gemName);
    setgemprice(gem.gemPrice.total);
  };
  const handleSendOrder=(cartitem:any)=>{
    if (cartitem.length === 0) {
      message.error("Your Order is empty") // Hiển thị thông báo khi không có sản phẩm trong giỏ hàng
      return; // Chặn việc gửi lên API khi không có sản phẩm trong giỏ hàng
    }
    handlecreateOrder(cartitem)
  }
  const getOrderDetailsCount = () => {
    return cartItems.reduce((count, item) => count + item.orderDetails.length, 0);
  };
  const handleMaterialSelect = (material: Material) => {
    setSelectedMaterial(material.materialId);
    setmaterialprice(material.materialPrice.sellPrice);
    setmaterialname(material.materialName);
  };
  const handleAddToCart = (
    productname: string,
    percentPriceRate: number,
    productionCost: number
  ) => {
    const orderDetail = {
      productName: `<div>Jewelry: ${productname}</div><div>Gem: ${gemName}</div><div>Material: ${materialName}</div>`,
      purchaseTotal: Number(
        gemprice + materialprice + percentPriceRate + productionCost
      ),
    };
  
    setCartItems((prevItems) => {
      // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
      if (prevItems.length > 0) {
        const updatedItems = [...prevItems];
        updatedItems[0].orderDetails.push(orderDetail);
        return updatedItems;
      } else {
        // Nếu giỏ hàng trống, tạo mới một sản phẩm với orderDetails
        const newProduct: OrderPayload = {
          customerName: "okla",
          userName: "sdjsnd",
          warranty: "this is waranty",
          orderDetails: [orderDetail],
        };
        return [newProduct];
      }
    });
  
    setShowTable(false);
  };
  const handleTable = (gems: Gem[], material: Material[], product: Product) => {
    setproductName(product.productName);
    setperRate(product.percentPriceRate);
    setprocessingprice(product.productionCost);
    setGemlist(gems);
    setmateriallist(material);
    setSelectedGem(null);
    setSelectedMaterial(null);
    setShowTable(true);
  };
  const onFinishHandler = (values: InputType) => {
    console.log(values);
  };

  const cartContent = (
    <div>
      <Table
        rowKey={(record) => record.orderDetails.length} // Đảm bảo trả về giá trị hợp lệ
        dataSource={cartItems}
        bordered
        columns={[
          {
            title: "Product Details",
            dataIndex: "orderDetails",
            align: "center",
            key: "orderDetail-productName",
            render: (orderDetails: OrderDetail[]) => {
              if (orderDetails && orderDetails.length > 0) {
                return orderDetails.map((detail, index) => (
                  <div key={index} style={{ marginBottom: "10px" }}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: detail.productName || "",
                      }}
                    />
                    <div>Price: {detail.purchaseTotal}$</div>
                    <Button
                      type="link"
                      onClick={() => handleRemoveDetail(detail)}
                      style={{ color: "red", marginTop: "5px" }}
                    >
                      Remove
                    </Button>
                  </div>
                ));
              }
              return null;
            },
          },
          {
            title: "Total Purchase",
            dataIndex: "orderDetails",
            key: "orderDetail-purchaseTotal",
            render: (orderDetails: OrderDetail[]) => {
              if (orderDetails && orderDetails.length > 0) {
                const totalPurchase = orderDetails.reduce(
                  (total, detail) => total + detail.purchaseTotal,
                  0
                );
                return <span>{totalPurchase}$</span>;
              }
              return null;
            },
          },
          {
            title: "Action",
            key: "action",
            align: "center",
            render: (_text, item) => (
              <Button
                type="link"
                onClick={() => setCartItems([])}
                style={{ display: showRemoveAll ? "inline-block" : "none" }}
              >
                Remove All
              </Button>
            ),
          },
        ]}
        pagination={false}
        size="small"
      />
    </div>
  );

// Hàm để xóa chi tiết sản phẩm
const handleRemoveDetail = (detail: OrderDetail) => {
  setCartItems((prevItems:any[]) =>
    prevItems.map(item => ({
      ...item,
      orderDetails: item.orderDetails.filter((d:any) => d !== detail),
    }))
  );
};

// Hàm để xóa toàn bộ sản phẩm
const handleRemoveItem = (item: OrderPayload) => {
  setCartItems((prevItems) =>
    prevItems.filter(cartItem => cartItem !== item)
  );
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
        rowKey="productId"
        className="mt-2"
        columns={columns}
        loading={isLoading}
        pagination={false}
        scroll={{ x: "max-content" }}
        dataSource={data?.items}
        bordered
      />
      <Pagination
        defaultCurrent={currentPage}
        className="mt-3"
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
        onOk={() =>
          handleAddToCart(productname, percentPriceRate, processingprice)
        }
        onCancel={() => setShowTable(false)}
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
              <Pagination 
                defaultCurrent={currentPage}
                total={totalCount}
                pageSize={PAGE_SIZE}
                onChange={(page) => {
                  setCurrentPage(page);
                }}
              />
            </Tabs.TabPane>
          </Tabs>
        </Card>
      </Modal>
    </div>
  );
}
