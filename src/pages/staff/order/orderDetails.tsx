import React, { useState, useEffect } from 'react';
import { useOrderStore } from "@/store/order";
import { Row, Col, Tag, Typography, Divider, Button, Image, Pagination, message } from "antd";
import OrderForm from './order.create';

const { Text } = Typography;

const OrderDetail: React.FC = () => {
  const cartItems = useOrderStore((state) => state.cartItems);
  const removeCartItem = useOrderStore((state) => state.removeCartItem);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  
  const itemsPerPage = 4; // Số lượng sản phẩm trên mỗi trang
  const [currentPage, setCurrentPage] = useState<number>(1); // Trang hiện tại
  const [currentTime, setCurrentTime] = useState<Date>(new Date()); // Thời gian hiện tại
  const [openCreateModal,setOpenCreateModal]=useState(false);
  // Cập nhật thời gian mỗi giây
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Tính chỉ mục bắt đầu và chỉ mục kết thúc của sản phẩm trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cartItems.slice(indexOfFirstItem, indexOfLastItem);

  // Xử lý khi chuyển trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleCreateModal=()=>{
    setOpenCreateModal(false);
  }
  const handleOpenCreate=()=>{
    if(cartItems.length>0){
      setOpenCreateModal(true);
    }
    else { 
      message.error("Cart is empty");
      setOpenCreateModal(false);
    }
  }

  // Xử lý khi xóa sản phẩm
  const handleRemoveItem = (item: any) => {
    removeCartItem(item);
    // Cập nhật lại currentPage nếu cần thiết để duy trì dữ liệu trên trang hiện tại
    if (currentItems.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  

  // Định dạng thời gian
  const formatTime = (date: Date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-indexed
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${dayName}, ${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div>
      <Row justify="space-between" className="mb-3">
        <Col span={24}>
          <Text type="danger" strong>
            Confirmation - {formatTime(currentTime)}
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
        <Button className="mt-3 mr-6" size="middle" type="primary" danger>Manage Order</Button>
        <Button className="mt-3" size="middle" type="primary" onClick={handleOpenCreate} >Create Order</Button>
      </div>
      {openCreateModal!==false&&(<OrderForm onclose={handleCreateModal}/>)}
    </div>
  );
}

export default OrderDetail;
