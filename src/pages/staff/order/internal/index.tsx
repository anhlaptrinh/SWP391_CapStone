import {
    Button,
    Card,
    Col,
    DatePicker,
    Form,
    Input,
    Modal,
    Pagination,
    Row,
    Space,
    Switch,
    Typography,
  } from "antd";
  import Table, { ColumnsType, TableProps } from "antd/es/table";
  import { useState } from "react";
  import { useForm, Controller, useFieldArray } from "react-hook-form";
  import { InputType } from "#/api";
  import { PAGE_SIZE } from "@/constants/page";
  import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
  import dayjs from "dayjs";
  
  export interface Order {
    orderId: string;
    orderType: string;
    customerName: string;
    userName: string;
    warranty: string;
    orderDate: string;
    status: boolean;
    orderDetail: OrderDetail[];
    total: number;
  }
  
  export interface OrderDetail {
    ProductName: string;
    sellPrice: string;
    buyPrice: string;
    perDiscount?: string;
  }
  export default function InternalOrder() {
    const currentDate = dayjs(new Date()).format('YYYY-MM-DD');
    const { control, handleSubmit, reset } = useForm<Order>({
      defaultValues: {
        orderId: "",
        orderType: "Purchase",  // Set default order type to "Purchase"
        customerName: "",
        userName: "",
        warranty: "",
        orderDate: currentDate,
        status: false,
        orderDetail: [],
        total: 0,
      },
    });
    const { fields, append, remove } = useFieldArray({
      control,
      name: "orderDetail",
    });
    // Dữ liệu cho bảng Order Checking
    const data: any[] = [];
  
    // Các cột cho bảng Order Checking
    const columns: TableProps<Order>["columns"] = [
      {
        title: "Order ID",
        dataIndex: "orderId",
      },
      {
        title: "Order Type",
        align: "center",
        dataIndex: "orderType",
        key: "orderType",
      },
      {
        title: "Customer",
        align: "center",
        dataIndex: "customerName",
        key: "customerName",
      },
      { title: "Staff", align: "center", dataIndex: "userName", key: "userName" },
      {
        title: "Warranty",
        align: "center",
        dataIndex: "warranty",
        key: "warranty",
      },
      { title: "Status", align: "center", dataIndex: "status", key: "status" },
      {
        title: "Items Order",
        align: "center",
        dataIndex: "orderDetail",
        key: "orderDetail",
      },
  
      {
        title: "Action",
        dataIndex: "actions",
        align: "center",
        render: (_title, record) => (
          <Space
            size="middle"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button type="primary">Submit</Button>
            <Button type="primary" danger>
              Delete
            </Button>
            {/* <Button type="primary" className="bg-green-700">Edit</Button> */}
          </Space>
        ),
      },
    ];
    const [currentPage, setCurrentPage] = useState(1);
    const { Title } = Typography;
  
    const [form] = Form.useForm();
    const [openModal, setIsOpenModal] = useState(false);
    const resetHandler = () => {
      form.resetFields();
    };
  
    const onFinishHandler = (values: InputType) => {
      console.log(values);
    };
    const handleOk = (data: Order) => {
      console.log("Form Data:", data);
      setIsOpenModal(false);
      reset();  // Reset form after submission
    };
    const handleCancel = () => {
      setIsOpenModal(false);
      reset();  // Reset form when modal is closed
    };
    return (
      <Card
        style={{ marginTop: "2rem" }}
        title={<Title level={3}>Internal order Checking</Title>}
      >
        <div className="mt-3 text-sm">
          <Form form={form} onFinish={onFinishHandler}>
            <Row gutter={24} justify="space-between">
              <Col xs={12} md={18} sm={14} lg={19} xl={20} xxl={18}>
                <Row gutter={[12, 12]}>
                  <Col xs={24} md={21} sm={12}>
                    <Row>
                      <Col xs={23} md={21} sm={24} lg={8}>
                        <Form.Item name="Search">
                          <Input placeholder="Search by name" allowClear />
                        </Form.Item>
                      </Col>
  
                      <Col xs={24} md={3} sm={24} lg={16}>
                        <Button type="primary" onClick={resetHandler}>
                          Reset
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
          <Table
            rowKey="orderId"
            className="mt-3"
            columns={columns}
            pagination={false}
            scroll={{ x: "max-content" }}
            dataSource={data}
            bordered
          />
          <div className="flex float-end mt-4 pb-4">
            <Pagination
              defaultCurrent={currentPage}
              pageSize={PAGE_SIZE}
              onChange={(page) => {
                setCurrentPage(page);
              }}
            />
          </div>
        </div>
        <Modal
          title="Purchase Order Form"
          open={openModal}
          onOk={handleSubmit(handleOk)}
          onCancel={handleCancel}
          okText="Submit"
        >
           <Form layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Customer Name">
                  <Controller
                    name="customerName"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="User Name">
                  <Controller
                    name="userName"
                    control={control}
                    render={({ field }) => <Input  {...field} />}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Order Details">
                  {fields.map((item, index) => (
                    <Row gutter={16} key={item.id}>
                      <Col span={6}>
                        <Form.Item>
                          <Controller
                            name={`orderDetail.${index}.ProductName`}
                            control={control}
                            render={({ field }) => <Input placeholder="Product Name" {...field} />}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item>
                          <Controller
                            name={`orderDetail.${index}.sellPrice`}
                            control={control}
                            render={({ field }) => <Input  placeholder="Sell Price" {...field} />}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item>
                          <Controller
                            name={`orderDetail.${index}.buyPrice`}
                            control={control}
                            render={({ field }) => <Input  placeholder="Buy Price" {...field} />}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item>
                          <Controller
                            name={`orderDetail.${index}.perDiscount`}
                            control={control}
                            render={({ field }) => <Input  placeholder="Discount" {...field} />}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={2}>
                        <Button type="dashed" onClick={() => remove(index)} icon={<MinusCircleOutlined />} />
                      </Col>
                    </Row>
                  ))}
                  <Button
                    type="dashed"
                    onClick={() => append({ ProductName: "", sellPrice: "", buyPrice: "", perDiscount: "" })}
                    icon={<PlusOutlined />}
                  >
                    Add Purchase Order Detail
                  </Button>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Total">
                  <Controller
                    name="total"
                    control={control}
                    render={({ field }) => <Input type="number" {...field} />}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </Card>
    );
  }
  