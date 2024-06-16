import {
    Button,
    Card,
    Col,
    Form,
    Row,
    Typography,
    Table,
    Input,
    TableProps,
    List,
    Tag,
    Pagination,
    Popover,
    Space
  } from "antd";
  import {Invoice, Items} from '#/invoice'
  
  import { useListInvoice } from "@/api/staff/listInvoice";
import dayjs from "dayjs";
import { useState } from "react";
import { PAGE_SIZE } from "@/constants/page";
import { SearchOutlined } from "@ant-design/icons";
  export default function CheckedInvoice() {
    const [currentPage,setCurrentPage]=useState(1);
    const { Title } = Typography;
    const {data,isLoading}=useListInvoice(currentPage);
    const [form] = Form.useForm();
    const [openModal,setIsOpenModal]=useState(false);
    const totalCount=data?.totalPages||0;
    
    const columns: TableProps<Invoice>['columns'] = [
      {
        title: "Invoice ID",
        dataIndex: "invoiceId",
        key: "invoiceId",
        align: 'center'
      },
      {
        title: "Order Date",
        dataIndex: "orderDate",
        key: "orderDate",
        render: (text) => dayjs(text).format('YYYY-MM-DD'),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        align: 'center',
        render: (_, { status }) => {
          
          let color = 'green'; // Default color
    
        // Apply custom logic to set color based on role
        if (status === true) {
          color = 'red';
        } else if (status === false) {
          color = 'blue';
        } 
        return (
          <>
            <Tag color={color}>{status? 'checked' : 'unchecked'}</Tag>

          </>
        );
        },
      },
      {
        title: "Invoice Type",
        dataIndex: "invoiceType",
        key: "invoiceType",
        align: 'center',
        render: (_, { invoiceType }) => {
          
          let color = 'green'; // Default color
    
          // Apply custom logic to set color based on role
          if (invoiceType === true) {
            color = 'green';
          } else if (invoiceType === false) {
            color = 'pink';
          } 
          return (
            <>
              <Tag color={color}>{invoiceType? 'SALE' : 'PURCHASE'}</Tag>
  
            </>
          );
        },
      },
      {
        title: "Customer",
        dataIndex: "customerName",
        key: "customerName",
      },
      {
        title: "Invoice Creator",
        dataIndex: "userName",
        key: "userName",
      },
      {
        title: "Warranty",
        dataIndex: "warranty",
        key: "warranty",
        align: 'center',
      },
      {
        title: 'Items',
        dataIndex: 'items',
        key: 'items',
        render: (_text: any, record: any) => {
          const content = (
            <List
              dataSource={record.items}
              renderItem={(item: Items) => (
                <List.Item>
                  <Tag color="pink">{item.productName}</Tag>
                </List.Item>
              )}
            />
          );
    
          return (
            <Popover content={content} title="Items">
              <Button type="link">View Items</Button>
            </Popover>
          );
        },
      },
      {
        title: "Total",
        dataIndex: "total",
        key: "total",
      },
      {
        title: "Action",
        key: "action",
        align: "center",
        render: (_text: any, record: any) => (
          <Button type="primary" onClick={() => handleBuyback(record.invoiceId)}>
            Repurchase
          </Button>
        ),
      },
    ];
  
    const handleBuyback = (invoiceCode: string) => {
      // Implement buyback logic here
      console.log(`Buyback initiated for invoice: ${invoiceCode}`);
    };
    const onFinishHandler = (values: any) => {
      console.log(values);
    };
    const resetHandler = () => {
      form.resetFields();
    };
    
  
    const onSearch = (value:any) => {
      // Xử lý logic tìm kiếm tại đây
      console.log(value);
    };
    return (
      <>
        <div className="mt-3 text-sm">
          <Form form={form} onFinish={onFinishHandler}>
          <Row gutter={24}  justify="space-between">
          <Col xs={24} md={24} sm={24} lg={24} xl={24} xxl={24}>
      <Row gutter={[12, 12]}>
        <Col xs={24} md={21} sm={12}>
          <Row gutter={[12, 0]}>
          <Col xs={24} md={21} sm={24} lg={8}>
              <Input.Search
                placeholder="Search by ID invoice..."
                allowClear
                enterButton={
                  <Button type="primary" icon={<SearchOutlined />}  />
                }
                onSearch={onSearch}
              />
            </Col>
            <Col xs={24} md={3} sm={24} lg={16} style={{ textAlign: 'right' }}>
              <Space>
                <Button type="primary" onClick={resetHandler}>
                  Reset
                </Button>
                
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
            {/* <Col xs={12} sm={10} md={6} lg={5} xl={4} xxl={6}>
              <Row>
                <Col xs={24} sm={12} lg={3}>
                  <Button type="primary" onClick={()=>setIsOpenModal(true)}>Add new</Button>
                </Col>
              </Row>
            </Col> */}
          </Row>
        </Form>
          <Table
            rowKey="invoiceId"
            className="mt-3"
            columns={columns}
            loading={isLoading}
            pagination={false}
            scroll={{ x: 'max-content' }}
            dataSource={data?.items}
            bordered
            
          />
          <div className="flex float-end mt-4 pb-4">
      <Pagination
        defaultCurrent={currentPage} 
        total={totalCount} 
        pageSize={PAGE_SIZE}
        onChange={(page) => {
          setCurrentPage(page);
        }}
      />
    </div>
        </div>
      </>
    );
  }
  