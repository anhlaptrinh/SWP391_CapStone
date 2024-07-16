import React, { useState, useEffect } from "react";
import { useOrderStore } from "@/store/order";
import {
  Row,
  Col,
  Tag,
  Typography,
  Divider,
  Button,
  Image,
  Pagination,
  message,
  Popconfirm,
  Popover,
} from "antd";
import OrderForm from "./order.create";
import { useCustomerStore } from "@/store/discount";
import OrderUpdater from "./order.state";
import { DeleteOutlined, RetweetOutlined } from "@ant-design/icons";
import { useUpdateInvoice } from "@/api/staff/listInvoice";

const { Text } = Typography;

const OrderDetail: React.FC = () => {
  
  const {removeCartItem,cartItems,clearCart} = useOrderStore();
  
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const itemsPerPage = 4; // Số lượng sản phẩm trên mỗi trang
  const [currentPage, setCurrentPage] = useState<number>(1); // Trang hiện tại
  const [currentTime, setCurrentTime] = useState<Date>(new Date()); // Thời gian hiện tại
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [statusOrder, setStatusOrder] = useState("Pending");
  const { selectedCustomer,clearCustomer } = useCustomerStore();
  const [isUpdate, setisUpdate] = useState(false);
  const [stateOrder, setStateOrder] = useState(false);
  const {mutateAsync:updateOrder}=useUpdateInvoice(clearCart,setisUpdate);
  const [loading,setloading]=useState<boolean>(false);

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
  const handleCreateModal = () => {
    setOpenCreateModal(false);
  };
  const handleStateModal = () => {
    setStateOrder(false);
  };

  const handleOpenCreate = () => {
    if (cartItems.length > 0) {
      setOpenCreateModal(true);
    } else {
      message.error("Cart is empty");
      setOpenCreateModal(false);
    }
  };
  const handleOpenDraft = () => {
    if (cartItems.length > 0) {
      setOpenCreateModal(true);
      setStatusOrder("Draft");
    } else {
      message.error("Cart is empty");
      setOpenCreateModal(false);
    }
  };

  const handleOpenUpdate=async()=>{
    const invoiceDetails = cartItems.map(item => ({
      productId: item.id,
      quantity: item.quantity,
    }));
    const editData={
      invoiceDetails:invoiceDetails,
      invoiceStatus: 'Pending',
      total: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      invoiceId:selectedCustomer?.InvoiceId
    }
    try{
        setloading(true);
        
          await updateOrder(editData);
          setloading(false);
          
          
        
      } catch (error) {
        message.error(error.message || error);
        console.log(error);
        setloading(false);
      }
  }
  const handleDraftUpdate=async()=>{
    const invoiceDetails = cartItems.map(item => ({
      productId: item.id,
      quantity: item.quantity,
    }));
    const editData={
      invoiceDetails:invoiceDetails,
      invoiceStatus: 'Draft',
      total: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      invoiceId:selectedCustomer?.InvoiceId
    }
    try{
        setloading(true);
        
          await updateOrder(editData);
          setloading(false);
          
          
        
      } catch (error) {
        message.error(error.message || error);
        console.log(error);
        setloading(false);
      }
  }

  // Xử lý khi xóa sản phẩm
  const handleRemoveItem = (item: any) => {
    removeCartItem(item);
    // Cập nhật lại currentPage nếu cần thiết để duy trì dữ liệu trên trang hiện tại
    if (currentItems.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    if(cartItems.length===0) setisUpdate(false);
  };

  // Định dạng thời gian
  const formatTime = (date: Date) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-indexed
    const year = date.getFullYear();

    return `${dayName}, ${day}/${month}/${year}`;
  };
  const handleResetinfo=()=>{
    setisUpdate(false);
    if(cartItems.length>0){
    clearCart();
    clearCustomer();
    message.success("Clear success")
    }
    else message.warning("Your cart is empty")
  }
  return (
    <div>
      <Row justify="space-between" className="mb-3 mt-3">
        <Col span={24}>
          <Row>
          <Col span={20}>
            <Text type="danger" strong>
            Confirmation
            </Text>
          </Col>
          <Col span={4}>
          <Popconfirm
            title="Are you sure you want to Clear all?"
             onConfirm={handleResetinfo}
            okText="Yes"
            cancelText="No"
          >
            <Popover content="Clear all deatails?">
              <Button
                type="primary"
                size="small"
                danger
                icon={<RetweetOutlined />}
              >Reset</Button>
            </Popover>
          </Popconfirm>
          </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Text strong>Customer Name: {selectedCustomer?.name} </Text>
        </Col>
        <Col span={24}>
          <Text strong>Customer Phone: {selectedCustomer?.phone} </Text>
        </Col>
      </Row>

      <div className="text-center">
        <Row gutter={[100, 20]} justify="space-between">
          <Col span={12}>
            <Text>Order Date:</Text>
          </Col>
          <Col span={12}>
            <Text>{formatTime(currentTime)}</Text>
          </Col>
          <Col span={12}>
            <Text>Order Number:</Text>
          </Col>
          <Col span={12}>
            <Tag color="red-inverse">{selectedCustomer?.InvoiceId||"---"}</Tag>
          </Col>
          <Col span={12}>
            <Text>Status:</Text>
          </Col>
          <Col span={12}>
            <Text>
              <Tag color="green-inverse">{selectedCustomer?.status||"---"}</Tag>
            </Text>
          </Col>
        </Row>
        <Divider />
        <Row gutter={[12, 12]}>
          <Col span={6}>
            <Text strong>Image</Text>
          </Col>
          <Col span={6}>
            <Text strong>Product Name</Text>
          </Col>
          <Col span={4}>
            <Text strong>Quantity</Text>
          </Col>
          <Col span={4}>
            <Text strong>Price</Text>
          </Col>
          <Col span={4}>
            <Text strong>Action</Text>
          </Col>
        </Row>
        <div style={{ minHeight: "200px", overflowX: "visible" }}>
          {currentItems.map((item) => (
            <Row gutter={[24, 24]} key={item.id}>
              <Col span={6}>
                <Image src={item.image} alt={item.name} width={50} />
              </Col>
              <Col span={5}><Text type="success" strong>{item.name}</Text></Col>
              <Col span={5}><Text type="danger" strong>x{item.quantity}</Text></Col>
              <Col span={4}>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(item.price * item.quantity)}
              </Col>
              <Col span={4}>
                <Button
                  size="small"
                  type="link"
                  danger
                  onClick={() => handleRemoveItem(item)}
                >
                  Remove
                </Button>
              </Col>
            </Row>
          ))}
        </div>
        <Divider />
        <Row>
          <Col span={12}>
            <Text style={{ fontSize: "18px" }} type="success" strong>
              Total:{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(totalPrice)}{" "}
              <Tag color="red">{selectedCustomer?.discount}%</Tag>
            </Text>
          </Col>
          <Col span={12}>
            <Button className="mr-3" type="dashed" onClick={handleOpenDraft}>
              Draft
            </Button>
           
            <Popconfirm
            title="Do you want to change Draft into Pending?"
             onConfirm={handleOpenUpdate}
             onCancel={handleDraftUpdate}
            okText="Yes"
            cancelText="No"
          >
            <Popover content="Update Order?">
            <Button
              disabled={!isUpdate}
              style={{
                backgroundColor: !isUpdate ? "lightgray" : "greenyellow",
                color: !isUpdate ? "gray" : "black",
                cursor: !isUpdate ? 'pointer' : 'not-allowed',
                pointerEvents: !isUpdate ? 'none' : 'auto',
              }}
              type="primary"
            >
              Update
            </Button>
            </Popover>
          </Popconfirm>
          </Col>
        </Row>
        <Pagination
          className="mt-5"
          current={currentPage}
          pageSize={itemsPerPage}
          total={cartItems.length}
          onChange={handlePageChange}
        />
        <Row className="pt-5">
          <Col span={24}>
            <Button
              className="mt-3 mr-6"
              size="middle"
              type="primary"
              onClick={() => setStateOrder(true)}
              danger
            >
              Manage Order
            </Button>
            <Button
              className="mt-3"
              size="middle"
              type="primary"
              onClick={handleOpenCreate}
              disabled={isUpdate}
              style={{
                backgroundColor: isUpdate ? "lightgray" : "blue",
                color: isUpdate ? "gray" : "#fff",
                cursor: isUpdate ? 'pointer' : 'not-allowed',
                pointerEvents: isUpdate ? 'none' : 'auto',
              }}
            >
              Create Order
            </Button>
          </Col>
        </Row>
      </div>
      {stateOrder !== false && <OrderUpdater onClose={handleStateModal} setUpdate={setisUpdate} />}
      {openCreateModal !== false && (
        <OrderForm
          status={statusOrder}
          formData={selectedCustomer}
          onclose={handleCreateModal}
        />
      )}
    </div>
  );
};

export default OrderDetail;
