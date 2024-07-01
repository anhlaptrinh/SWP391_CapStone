import { useState } from 'react';
import { useOrderStore } from "@/store/order";
import { Row, Col, Tag, Typography, Divider, Button, Image, Pagination } from "antd";

const { Text } = Typography;

export default function OrderDetail() {
  const cartItems = useOrderStore((state) => state.cartItems);
  const removeCartItem = useOrderStore((state) => state.removeCartItem);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  
  const itemsPerPage = 4; // Số lượng sản phẩm trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại

  // Tính chỉ mục bắt đầu và chỉ mục kết thúc của sản phẩm trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cartItems.slice(indexOfFirstItem, indexOfLastItem);

  // Xử lý khi chuyển trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Xử lý khi xóa sản phẩm
  const handleRemoveItem = (item: any) => {
    removeCartItem(item);
    // Cập nhật lại currentPage nếu cần thiết để duy trì dữ liệu trên trang hiện tại
    if (currentItems.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <Row justify="space-between" className="mb-3">
        <Col span={24}>
          <Text type="danger" strong>
            Confirmation
          </Text>
        </Col>
        <Col span={24}>
          <Text strong>Order ID: 30</Text>
        </Col>
        <Col span={24}>
          <Text strong>Customer Info: 093487388</Text>
        </Col>
      </Row>

      <div className="text-center">
        <Row gutter={[100, 20]} justify="space-between">
          <Col span={12}>
            <Text>Order Date:</Text>
          </Col>
          <Col span={12}>
            <Text>21st October</Text>
          </Col>
          <Col span={12}>
            <Text>Order Number:</Text>
          </Col>
          <Col span={12}>
            <Text>BNS3883</Text>
          </Col>
          <Col span={12}>
            <Text>Delivery:</Text>
          </Col>
          <Col span={12}>
            <Text>
              <Tag color="green-inverse">Done</Tag>
            </Text>
          </Col>
        </Row>
        <Divider />
        <Row gutter={[12, 12]}>
          <Col span={6}><Text strong>Image</Text></Col>
          <Col span={6}><Text strong>Product Name</Text></Col>
          <Col span={4}><Text strong>Quantity</Text></Col>
          <Col span={4}><Text strong>Price</Text></Col>
          <Col span={4}><Text strong>Action</Text></Col>
        </Row>
        <div style={{ minHeight: '200px', overflowX: 'visible' }}>
          {currentItems.map((item) => (
            <Row gutter={[24, 24]} key={item.id}>
              <Col span={6}>
                <Image src={item.image} alt={item.name} width={50} />
              </Col>
              <Col span={5}>{item.name}</Col>
              <Col span={5}>{item.quantity}</Col>
              <Col span={4}>{new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(item.price * item.quantity)}</Col>
              <Col span={4}>
                <Button size='small' type="link" danger onClick={() => handleRemoveItem(item)}>
                  Remove
                </Button>
              </Col>
            </Row>
          ))}
        </div>
        <Divider />
        <Row>
          <Col span={12}>
            <Text style={{ fontSize: '18px' }} type="success" strong>
              Total: {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(totalPrice)} <Tag color="red">5%</Tag>
            </Text>
          </Col>
        </Row>
        <Pagination
          className="mt-5"
          current={currentPage}
          pageSize={itemsPerPage}
          total={cartItems.length}
          onChange={handlePageChange}
        />
        <Button className="mt-3" size="large" type="primary" danger>Manage Order</Button>
      </div>
    </div>
  );
}
