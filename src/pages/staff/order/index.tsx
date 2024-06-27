import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Popconfirm,
  Popover,
  Row,
  Tag,
  Typography,
} from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { InputType } from "#/api";
import { CircleLoading } from "@/components/loading";
import { useListInvoice } from "@/api/staff/listInvoice";
import { IconButton, Iconify } from "@/components/icon";
import OrderForm from "./order.create";


export default function OrderList() {
  
  
 
  // Dữ liệu cho bảng Order Checking
  
  // Các cột cho bảng Order Checking
  
  // const [currentPage, setCurrentPage] = useState(1);
  const { Title } = Typography;
  const {data: dataInvoice,isLoading}=useListInvoice('Pending')
  const [form] = Form.useForm();
  const [listRelateParams, setListRelateParams] = useState<InputType>();
  const [openModal, setIsOpenModal] = useState(false);

  const [formOrder,setFormOrder]=useState<any>(false);
    if (isLoading) return <CircleLoading />;
  const columns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "invoiceId",
      key: 'invoiceId',
      width: '5%'
    },
    
    { title: "Staff", align: "center", dataIndex: "userName", key: "userName" },
    {
      title: "Warranty",
      align: "center",
      dataIndex: "warranty",
      key: "warranty",
    },

    {
      title: "Items Order",
      align: "center",
      dataIndex: "items",
      key: "items",
      render: (items) => {
        const popoverContent = (
          <Table
            dataSource={items.map((item:any, index:number) => ({ ...item, key: index }))}
            columns={[
              { title: 'ID', dataIndex: 'productId', key: 'productId' },
              { title: 'Name', dataIndex: 'productName', key: 'productName' },
              { 
                title: 'Price', 
                dataIndex: 'productPrice', 
                key: 'productPrice', 
                render: (text) => `${new Intl.NumberFormat('en-US').format(text)} VND`
              }
            ]}
            pagination={false}
            size="small"
            bordered
          />
        );
        return (
          <Popover content={popoverContent} title="Item Details" trigger="hover">
            <a>View Items</a>
          </Popover>
        );
      }
    },
    {
      title: "Price",
      align: "center",
      dataIndex: "total",
      key: "total",
      render: (text) => `${new Intl.NumberFormat('en-US').format(text)}VND`
    },
    {
      title: "Promotion",
      align: "center",
      dataIndex: "perDiscount",
      key: "perDiscount",
      render: (text) => <Tag color="red">{text}%</Tag>
    },
    {
      title: "Amount",
      align: "center",
      dataIndex: "totalWithDiscount",
      key: "totalWithDiscount",
      render: (text) => `${new Intl.NumberFormat('en-US').format(text)}VND`
    },
    {
      title: "Order Status",
      align: "center",
      dataIndex: "invoiceStatus",
      key: "invoiceStatus",
      render: (status) => {
        let color;
        switch(status) {
          case 'Delivered':
            color = 'green';
            break;
          case 'Pending':
            color = 'gold';
            break;
          case 'Processing':
            color = 'magenta';
            break;
          default:
            color = 'blue';
        }
        return <Tag color={color}>{status}</Tag>;
      }
    },

    {
      title: "Action",
      dataIndex: "actions",
      align: "center",
      render: (_, record) => (
        <div className="text-gray flex w-full items-center justify-center">
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              openFormHandler(record);
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
            }}
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

  const openFormHandler=(record?:any)=>{
    if(record){
      setFormOrder(record);
    } else{
      setFormOrder(undefined);
    }
  };
  const closeFormOrder=async()=>{
    setFormOrder(false);
  };
  


  const resetHandler = () => {
    form.resetFields();
  };
  const onPageChange = (page:number,pageSize:number)=>{
    const values: InputType = { PageIndex: page, PageSize: pageSize };
    setListRelateParams(values);
  }

  const onFinishHandler = (values: InputType) => {
    setListRelateParams(values);
  };
  return (
    <Card style={{ marginTop: "2rem" }} title={<Title level={3}>Order</Title>}>
      <div className="mt-3 text-sm">
        <Form form={form} onFinish={onFinishHandler}>
          <Row gutter={24} justify="space-between">
            <Col span={12}>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item name="Search">
                    <Input placeholder="Search by ID" allowClear />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Button type="primary" onClick={resetHandler}>
                    Reset
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col span={10}>
              <Row gutter={12}>
                <Col span={11}>
                  <Button type="primary" onClick={() => openFormHandler()}>
                    Create Sales Order
                  </Button>
                </Col>

                <Col span={11}>
                  <Button type="primary" onClick={() => setIsOpenModal(true)}>
                    Create Purchase Order
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
          // pagination={false}
          scroll={{ x: "max-content" }}
          dataSource={dataInvoice?.items}
          size="large"
          bordered
        />
        {/* <div className="flex float-end mt-4 pb-4">
          <Pagination
            defaultCurrent={currentPage}
            pageSize={PAGE_SIZE}
            onChange={(page) => {
              setCurrentPage(page);
            }}
          />
        </div> */}
      </div>
      {formOrder!==false &&(
        <OrderForm formData={formOrder} onclose={closeFormOrder}/>
      )}
      {/* Purchase modal  */}
      {/* <Modal
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
                  render={({ field }) => <Input {...field} />}
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
                          render={({ field }) => (
                            <Input placeholder="Product Name" {...field} />
                          )}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item>
                        <Controller
                          name={`orderDetail.${index}.sellPrice`}
                          control={control}
                          render={({ field }) => (
                            <Input placeholder="Sell Price" {...field} />
                          )}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item>
                        <Controller
                          name={`orderDetail.${index}.buyPrice`}
                          control={control}
                          render={({ field }) => (
                            <Input placeholder="Buy Price" {...field} />
                          )}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item>
                        <Controller
                          name={`orderDetail.${index}.perDiscount`}
                          control={control}
                          render={({ field }) => (
                            <Input placeholder="Discount" {...field} />
                          )}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <Button
                        type="dashed"
                        onClick={() => remove(index)}
                        icon={<MinusCircleOutlined />}
                      />
                    </Col>
                  </Row>
                ))}
                <Button
                  type="dashed"
                  onClick={() =>
                    append({
                      ProductName: "",
                      sellPrice: "",
                      buyPrice: "",
                      perDiscount: "",
                    })
                  }
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
      </Modal> */}

      {/* Sale Modal  */}
    </Card>
  );
}
