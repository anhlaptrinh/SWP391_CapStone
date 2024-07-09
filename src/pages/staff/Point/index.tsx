import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal,
  Pagination,
  Row,
  Typography,
} from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useState } from "react";

import { InputType } from "#/api";
import { useDiscount } from "@/api/staff/discount";
import { useCustomerStore } from "@/store/discount";

export default function DiscountPoint() {
  const { Title,Text } = Typography;
  const [form] = Form.useForm();
  const [listRelateParams, setListRelateParams] = useState<InputType>();
  const [createPoint,setPoint]=useState(false);
  const setSelectedCustomer = useCustomerStore((state) => state.setSelectedCustomer);
  // Thêm dữ liệu cứng cho bảng
  const {data,isLoading} = useDiscount();

  const columns: ColumnsType<any> = [
    {
      title: "No",
      dataIndex: "no",
      render: (_text, _data, index) => <Title level={5}>{++index}</Title>,
      width: "5%",
    },
    {
      title: "Name",
      dataIndex: "fullName",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
    },
    {
      title: "Point",
      dataIndex: "point",
    },
    {
      title: "Ưu Đãi",
      dataIndex: "discount",
      align:'center',
      render: (text)=><Text strong style={{color:'red'}}>{text}%</Text>
    },
    {
      title: "Action",
      align:'center',
      dataIndex: "action",
      render:(_,record:any)=>{
        return( <Button  size="middle" onClick={
          ()=>{
            handleApply(record)
          }
        } type="primary" >Apply</Button>)
      }
    },
  ];
  const handleApply = (record: any) => {
    setSelectedCustomer({
      name: record.fullName,
      phone: record.phoneNumber,
      discount:record.discount
    });
    message.success('apply Success')
  };
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

  

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Received values of form: ", values);
        setPoint(false);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setPoint(false);
    form.resetFields();
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
                <Button type="primary" onClick={()=>setPoint(true)} >New</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
      <Table
        rowKey="id"
        size="small"
        scroll={{ x: "max-content" }}
        columns={columns}
        dataSource={data?.items} // Sử dụng dữ liệu cứng đã tạo
        // loading={isLoading}
      />
     <Modal
        title="Nhập thông tin ưu đãi"
        open={createPoint}
        onOk={handleOk}
        onCancel={handleCancel}
        
      >
        <Form form={form} layout="vertical" name="userForm">
          <Form.Item
            name="phoneNumber"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="fullName"
            label="Tên Khách Hàng"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
            name="discount"
            label="Phần trăm ưu đãi"
            rules={[
              { required: true, message: "Vui lòng nhập phần trăm ưu đãi!" },
            ]}
          >
            <InputNumber  min={0} max={100} style={{ width: "100%" }} />
          </Form.Item> */}
        </Form>
      </Modal>
    </Card>
    
  );
}
