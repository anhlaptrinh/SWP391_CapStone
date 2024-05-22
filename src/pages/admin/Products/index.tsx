import { deleteJwelryApi, getJwelryApi } from '@/api/mock/jwellry';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {Jwellery} from '../../../../types/jwelry'
import { Row, Layout, Card, Button, Col, Table, Space, Input, Checkbox, DatePicker, Form, Modal, Radio, Upload, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import payment from '../../../assets/images/payment.svg';
import {Paypal} from '@/layouts/_common/paypal';
import type { SearchProps } from 'antd/es/input/Search';
import { UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { Controller, useForm } from "react-hook-form";
import { useState } from 'react';

export default function Products() {
    const { handleSubmit, control, watch, setValue, reset } = useForm({
        defaultValues: {
          tenPhim: "",
          trailer: "",
          moTa: "",
          maNhom: "GP03",
          ngayKhoiChieu: "",
          trangThaiChieu: true,
          hot: true,
          danhGia: "",
          hinhAnh: undefined,
          maPhim: 0,
        },
      });
      const { Title, Text } = Typography;
  const { Sider, Content } = Layout;
  const { Search } = Input;
  const [isDelete,setDelete]=useState(false);
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
  const [isDetail,setDetail]=useState(false);
  const [isUpdate, setUpdate]=useState(false);
  const [isInvoice, setInvoice]=useState(false);

  const contentStyle: React.CSSProperties = {
    textAlign: "center",
    minHeight: "100%",
    lineHeight: "220px",
    color: "#fff",
    backgroundColor: "#ffff",
  };

  const siderStyle: React.CSSProperties = {
    textAlign: "center",
    lineHeight: "220px",
    color: "black",
    backgroundColor: "#fff",
    display: "fixed",
    right: 0,
    top: 0,
  };

  
  const {data,isLoading,error} =useQuery({
    queryKey: ["products"],
    queryFn: async () => getJwelryApi()
  })
  const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
];

const product = [
    {
        key: '1',
        name: 'Product 1',
        quantity: 2,
        price: '$20',
    },
    {
        key: '2',
        name: 'Product 2',
        quantity: 1,
        price: '$10',
    },
    // Add more data as needed
];
const queryClient = useQueryClient();
const {mutate: handledeletePro}=useMutation({
    mutationFn:(id:any)=>{
        return deleteJwelryApi(id);
      
    },
    onSuccess:()=>{
      setDelete(true);
      console.log("xóa thành công");
      queryClient.refetchQueries({
        queryKey: ["products"],
        type: "active",
      });
    },
    onError:(error)=>console.log(error)
  }); 
const handleDelete=(id:any)=>{
    handledeletePro(id)
    
}

  return (
    <div
      className="layout-content "
      style={{ height: "100%", overflow: "hidden" }}
    >
      <Row className="mb-4">
        <Space direction="vertical">
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </Space>
      </Row>
      <Layout className="flex  h-full">
        <Layout>
          <Content className="flex flex-col flex-grow " style={contentStyle}>
            <div className="h-[100%] mb-4 bg-gray-100 mr-2 overflow-y-auto">
              <Row gutter={[0, 0]} className="rowgap-vbox">
                {data?.map((item: Jwellery, index: number) => (
                  <Col
                    key={index}
                    xs={24}
                    sm={24}
                    md={12}
                    lg={6}
                    xl={6}
                    className="mb-4"
                  >
                    <div>
                      <Card
                        bordered={false}
                        className="criclebox"
                        style={{ width: "200px" }}
                        cover={
                          <img
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                          />
                        }
                      >
                        <Meta title={item.productName} className="pb-3" />
                        
                          <Button type="primary" className='mr-1' shape='round' size='small' onClick={()=>{setInvoice(true)}}>Add to invoice</Button>
                          <Button type="primary" className='mr-1 mb-1' shape='round' size='small' danger  onClick={()=>handleDelete(item.id)}>
                            Delete
                          </Button>
                          <Button
                            type="primary"
                            className="mt-2 mr-1"
                            shape='round'
                            size='small'
                            style={{ backgroundColor: "green" }}
                            onClick={()=>{
                                setDetail(true)
                            }}
                          >
                            Details
                          </Button>
                          <Button
                            
                            type="primary"
                            shape='round'
                            size='small'
                            style={{ backgroundColor: "orange" }}
                            onClick={()=>{
                                setUpdate(true)
                            }}
                          >
                            Update
                          </Button>
                        
                      </Card>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </Content>
        </Layout>
        <Sider width="22%" style={{ ...siderStyle, maxHeight: "90vh" }}>
          <img src={payment} alt="payment" className=" object-cover" />

          <div>
            <Table
              columns={columns}
              dataSource={product}
              pagination={{
                style: { margin: 0 }, // Đặt margin của phân trang thành 0
                size: "small", // Đặt kích thước của phân trang thành nhỏ
                showSizeChanger: true, // Hiển thị chức năng thay đổi kích thước trang
                showQuickJumper: true, // Hiển thị ô nhập trang nhanh
              }}
            />
          </div>
          <div>
            <Paypal />
          </div>
        </Sider>
      </Layout>
      {/* modal update */}
      <Modal
        title={"Cập Nhật Sản Phẩm"}
        centered
        open={isUpdate}
        onCancel={()=>setUpdate(false)}
        footer={false}
      >
        <Form className="mt-4" >
          <Row gutter={[18, 18]}>
            <Col span={24}>
              <label className="text-sm" htmlFor="">
                Tên Sản Phẩm
              </label>
              <Controller
                name="tenPhim"
                control={control}
                render={({ field }) => (
                  <Input
                    size="large"
                    className="mt-1"
                    placeholder="Tên Sản Phẩm"
                    {...field}
                  />
                )}
              />
            </Col>
            <Col span={24}>
              <label className="text-sm" htmlFor="">
                Trailer
              </label>
              <Controller
                name="trailer"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      size="large"
                      className="mt-1"
                      placeholder="https://www.youtube.com"
                      {...field}
                    />
                  );
                }}
              />
            </Col>
            
            <Col span={12}>
              <label className="text-sm" htmlFor="">
                Đánh giá
              </label>
              <Controller
                name="danhGia"
                control={control}
                render={({field}) => {
                  return (
                    <Input
                      size="large"
                      type="number"
                      max={10}
                      className="mt-1"
                      placeholder="0 - 10"
                      {...field}
                    />
                  );
                }}
              />
            </Col>
            <Col span={12}>
              <label className="text-sm" htmlFor="">
                Ngày Sản xuất
              </label>
              <Controller
                name="ngayKhoiChieu"
                control={control}
                render={({field}) => {
                  return (
                    <DatePicker
                      className="mt-1 w-full"
                      size="large"
                      placeholder="Chọn ngày"
                      value={field.value ? dayjs(field.value, "DD/MM/YYYY") : null}
                    onChange={( dateString) => field.onChange(dateString)}
                      format={"DD/MM/YYYY"}
                      
                      
                    />
                  );
                }}
              />
            </Col>
            <Col span={24}>
              <Controller
                name="hinhAnh"
                control={control}
                render={({ field: { onChange, ...filed } }) => {
                  return (
                    <Upload
                      beforeUpload={() => {
                        return false;
                      }}
                      {...filed}
                      showUploadList={false}
                      multiple={false}
                      onChange={({ file }) => onChange(file)}
                    >
                      <Button icon={<UploadOutlined />}>Upload hình</Button>
                    </Upload>
                  );
                }}
              />
              {/* {hinhAnhValue && (
                <div className="mt-2">
                  <img
                    src={
                      typeof hinhAnhValue === "string"
                        ? hinhAnhValue
                        : previewImage(hinhAnhValue)
                    }
                    className="w-[100px] h-[100px] object-cover rounded"
                  />
                  <span
                    className="inline-block ml-3 cursor-pointer"
                    onClick={() => setValue("hinhAnh", undefined)}
                  >
                    <DeleteOutlined />
                  </span>
                </div>
              )} */}
            </Col>
            <Col span={24} className="text-end">
              <Button
                // loading={isPending}
                // disabled={isPending}
                htmlType="submit"
                size="large"
                type="primary"
              >
                Update
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* modal detail */}
      <Modal
        title="Jwelery Name"
        centered
        open={isDetail}
        onOk={() => setDetail(false)}
        onCancel={() => setDetail(false)}
      >
         <Card className="product-card">
      <div className="product-detail">
        <div className="product-image-main flex">
          <img src="https://via.placeholder.com/150" alt="Product" className='mr-6' />
          <div className="product-images-small">
            <img src="https://via.placeholder.com/50" alt="Product Small 1" />
            <img src="https://via.placeholder.com/50" alt="Product Small 2" className='mt-4 mb-4' />
            <img src="https://via.placeholder.com/50" alt="Product Small 3" />
          </div>
        </div>
        <div className="product-info">
          <Title level={4}>Tên Sản Phẩm</Title>
          <Text>Giá: 1.000.000 VND</Text>
          <Text>Mô tả: Đây là mô tả sản phẩm...</Text>
        </div>
      </div>
    </Card>
      </Modal> 

      {/* Invoice Modal        */}
      <Modal
        title="Modal 1000px width"
        centered
        open={isInvoice}
        onOk={() => setInvoice(false)}
        onCancel={() => setInvoice(false)}
        footer={null}
        width={1000}
      >
          <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-800 font-semibold mb-1">Tên khách hàng:</label>
        <input type="text" placeholder="Nhập tên khách hàng" className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:bg-white focus:border-blue-500 transition duration-300 ease-in-out" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-800 font-semibold mb-1">Số điện thoại:</label>
        <input type="text" placeholder="Nhập số điện thoại" className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:bg-white focus:border-blue-500 transition duration-300 ease-in-out" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-800 font-semibold mb-1">Ngày mua hàng:</label>
        <input type="date" className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:bg-white focus:border-blue-500 transition duration-300 ease-in-out" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-800 font-semibold mb-1">Chương trình khuyến mãi:</label>
        <select className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:bg-white focus:border-blue-500 transition duration-300 ease-in-out">
          <option value="">Chọn khuyến mãi</option>
          <option value="promo1">Khuyến mãi 1</option>
          <option value="promo2">Khuyến mãi 2</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-800 font-semibold mb-1">Tên sản phẩm:</label>
        <input disabled type="text" placeholder="Nhập tên sản phẩm" className="w-full px-4 py-2 text-white bg-green-300 rounded-md focus:outline-none focus:bg-white focus:border-blue-500 transition duration-300 ease-in-out" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-800 font-semibold mb-1">Giá:</label>
        <input type="text" placeholder="Nhập giá sản phẩm" className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:bg-white focus:border-blue-500 transition duration-300 ease-in-out" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-800 font-semibold mb-1">Số lượng:</label>
        <input type="number" placeholder="Nhập số lượng" className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:bg-white focus:border-blue-500 transition duration-300 ease-in-out" />
      </div>
      <div className="text-right">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md mr-2 transition duration-300 ease-in-out" onClick={() => setInvoice(false)}>Tạo Hóa Đơn</button>
        <button className="bg-red-950 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300 ease-in-out" onClick={() => setInvoice(false)}>Hủy </button>
      </div>
    </div>
      </Modal>
    </div>
  );
}
