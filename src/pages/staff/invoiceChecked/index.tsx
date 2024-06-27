import { useChangeInvoice, useListInvoice } from '@/api/staff/listInvoice';
import { IconButton, Iconify } from '@/components/icon';
import { CircleLoading } from '@/components/loading';
import { Table, Popover, Tag, Popconfirm, Tabs, Button, Col, Form, Input, Row } from 'antd';
import form from 'antd/es/form';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

export default function InvoiceChecked() {
  const data:any=[];
  const {data: invoicePending,isLoading: isLoadingPending}=useListInvoice('Pending')
  const {data: invoiceProcessing,isLoading: isLoadingProcessing}= useListInvoice('Processing')
  const { data: deliveredInvoices, isLoading: isLoadingDelivered } = useListInvoice('Delivered');
  const [status,setStatus]=useState<any>("Pending")
  const {mutateAsync: statusInvoice}=useChangeInvoice(status);
  const { TabPane } = Tabs;

  if (isLoadingPending) return <CircleLoading />;
  if (isLoadingProcessing) return <CircleLoading />;
  if (isLoadingDelivered) return <CircleLoading />;



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
      title: "Type",
      align: "center",
      dataIndex: "invoiceType",
      key: "invoiceType",
      render: (text) => <Tag color="green">{text}</Tag>
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
              setStatus(record.invoiceStatus)
              statusInvoice(record.invoiceId)
            }}
          >
            <Iconify icon="mdi:credit-card-outline" size={18} />
          </IconButton>
          {/* <Popconfirm
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
          </Popconfirm> */}
        </div>
      ),
    },
  ];
  const [form]=Form.useForm();
  const onFinishHandler=(values:any)=>{
    console.log(values);
  }
  return (
    <div className="mt-3 text-sm">
    <Form form={form} onFinish={onFinishHandler}>
          <Row gutter={24} justify="space-between">
            <Col span={24}>
              <Row gutter={12}>
                <Col span={6}>
                  <Form.Item name="Search">
                    <Input placeholder="Search by ID" allowClear />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Button type="primary" >
                    Reset
                  </Button>
                </Col>
              </Row>
            </Col>
            
          </Row>
        </Form>
    <Tabs defaultActiveKey="1" className="mt-3" >
      <TabPane tab="Sales Invoice" key="1">
            <Table
              rowKey="invoiceId"
              columns={columns}
              pagination={false}
              scroll={{ x: "max-content" }}
              dataSource={deliveredInvoices.items}
              size="large"
              bordered
            />
      </TabPane>
      <TabPane tab="Purchase Invoice" key="2">
        
            <Table
              rowKey="invoiceId"
              columns={columns}
              pagination={false}
              scroll={{ x: "max-content" }}
              dataSource={data}
              size="large"
              bordered
            />
      </TabPane>
    </Tabs>
    </div>
  )
}

