import { useChangeInvoice, useListInvoice, useListPurchaseInvoice, usePaymentVNPAY, usePrintInvoice, usePrintWarranty } from '@/api/staff/listInvoice';
import { IconButton, Iconify } from '@/components/icon';
import { CircleLoading } from '@/components/loading';
import { ArrowDownOutlined, DeliveredProcedureOutlined, FileProtectOutlined, PayCircleOutlined } from '@ant-design/icons';
import { Table, Popover, Tag, Tabs, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';


export default function Invoice() {
 
  const {data: invoicePPending,isLoading: isLoadingPPending}=useListPurchaseInvoice('Pending','Purchase')
  const {data: invoicePProcessing,isLoading: isLoadingPProcessing}= useListPurchaseInvoice('Processing','Purchase')
  const { data: deliveredPInvoices, isLoading: isLoadingPDelivered } = useListPurchaseInvoice('Delivered','Purchase');
  const {data: invoicePending,isLoading: isLoadingPending}=useListInvoice('Pending','Sale')
  const {data: invoiceProcessing,isLoading: isLoadingProcessing}= useListInvoice('Processing','Sale')
  const { data: deliveredInvoices, isLoading: isLoadingDelivered } = useListInvoice('Delivered','Sale');
  const{mutateAsync:printInvoice}=usePrintInvoice();
  const {mutateAsync:printWarranty}=usePrintWarranty();
  const {mutateAsync: statusInvoice}=useChangeInvoice();
  const {mutateAsync:vnpayPayment}=usePaymentVNPAY();
  const { TabPane } = Tabs;

  if (isLoadingPending) return <CircleLoading />;
  if (isLoadingProcessing) return <CircleLoading />;
  if (isLoadingDelivered) return <CircleLoading />;
  if (isLoadingPPending) return <CircleLoading />;
  if (isLoadingPProcessing) return <CircleLoading />;
  if (isLoadingPDelivered) return <CircleLoading />;



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
              { title: 'Quantity',align:'center', dataIndex: 'quantity', key: 'quantity' },
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
              // e.stopPropagation();
              
              statusInvoice(record.invoiceId)
            }}
          >
            <Iconify icon="mdi:credit-card-outline" size={18} />
          </IconButton>
          
        </div>
      ),
    },
  ];
  const columnsDeliver: ColumnsType<any> = [
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
              { title: 'Quantity',align:'center', dataIndex: 'quantity', key: 'quantity' },
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

    
  ];
  const columnsBuy: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "invoiceId",
      key: 'invoiceId',
      width: '5%'
    },
    
    { title: "Staff", align: "center", dataIndex: "userName", key: "userName" },

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
              { title: 'Quantity',align:'center', dataIndex: 'quantity', key: 'quantity' },
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
      title: "Type",
      align: "center",
      dataIndex: "inOrOut",
      key: "inOrOut",
      render: (text) => <Tag color="purple">{text}</Tag>
    },

    {
      title: "Amount",
      align: "center",
      dataIndex: "items",
      key: "items",
      render: (_,record) => `${new Intl.NumberFormat('en-US').format(record.items[0]?.productPrice || 0)} VND`,
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
              
              statusInvoice(record.invoiceId)
            }}
          >
            <Iconify icon="mdi:credit-card-outline" size={18} />
          </IconButton>
          
        </div>
      ),
    },
    
  ];
  const columnsProcess: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "invoiceId",
      key: 'invoiceId',
      width: '5%'
    },
    
    { title: "Staff", align: "center", dataIndex: "userName", key: "userName" },

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
              { title: 'Quantity',align:'center', dataIndex: 'quantity', key: 'quantity' },
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
    // statusInvoice(record.invoiceId)
    {
      title: "Action",
      dataIndex: "actions",
      align: "center",
      render: (_, record) => (
        <div className="text-gray  flex w-full items-center justify-around">
          <Popover content="Print Invoice">
            <Button
              size='middle'
              type="primary"
              danger
              onClick={()=>handlePrintInvoice(record.invoiceId)}
              icon={<FileProtectOutlined />}
            ></Button>
          </Popover>
          <Popover content="Print Warranty">
            <Button
              onClick={()=>handlePrintWarranty(record.invoiceId)}
              size='middle'
              type="primary"
              icon={<DeliveredProcedureOutlined />}
            ></Button>
          </Popover>
          <Popover content="Payment">
            <Button
            onClick={()=>handlePayment(record.invoiceId)}
              size='middle'
              type="primary"
              style={{backgroundColor:'green'}}
            >Pay bill</Button>
          </Popover>
        </div>
      ),
    },
  ];
  const handlePrintInvoice=(id:any)=>{
    printInvoice(id);
  }
  const handlePrintWarranty=(record:any)=>{
      printWarranty(record);
  }
  const handlePayment=(id:any)=>{
       statusInvoice(id)
    // vnpayPayment(id)
  }
  return (
    <Tabs defaultActiveKey="1" className="mt-3" >
      <TabPane tab="Sales Invoice" key="1">
        <Tabs defaultActiveKey="1" type='card'>
          <TabPane tab="Pending" key="1-1">
            <Table
              rowKey="invoiceId"
              columns={columns}
              
              scroll={{ x: "max-content" }}
              dataSource={invoicePending.items}
              size="large"
              bordered
            />
          </TabPane>
          <TabPane tab="Processing" key="1-2">
            <Table
              rowKey="invoiceId"
              columns={columnsProcess}
             
              scroll={{ x: "max-content" }}
              dataSource={invoiceProcessing.items}
              size="large"
              bordered
            />
          </TabPane>
          <TabPane tab="Delivered" key="1-3">
            <Table
              rowKey="invoiceId"
              columns={columnsDeliver}
              
              scroll={{ x: "max-content" }}
              dataSource={deliveredInvoices.items}
              size="large"
              bordered
            />
          </TabPane>
        </Tabs>
      </TabPane>
      <TabPane tab="Purchase Invoice" key="2">
        <Tabs defaultActiveKey="2-1" type='card'>
          <TabPane tab="Pending" key="2-1">
            <Table
              rowKey="invoiceId"
              columns={columnsBuy}
              
              scroll={{ x: "max-content" }}
              dataSource={invoicePPending?.items}
              size="large"
              bordered
            />
          </TabPane>
          <TabPane tab="Processing" key="2-2">
            <Table
              rowKey="invoiceId"
              columns={columnsProcess}
              
              scroll={{ x: "max-content" }}
              dataSource={invoicePProcessing?.items}
              size="large"
              bordered
            />
          </TabPane>
          <TabPane tab="Delivered" key="2-3">
            <Table
              rowKey="invoiceId"
              columns={columnsBuy}
              
              scroll={{ x: "max-content" }}
              dataSource={deliveredPInvoices?.items}
              size="large"
              bordered
            />
          </TabPane>
        </Tabs>
      </TabPane>
    </Tabs>
  )
}

