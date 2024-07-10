import { useListPurchaseInvoice, useListInvoice, useChangeInvoice } from "@/api/staff/listInvoice";
import { IconButton, Iconify } from "@/components/icon";
import { CircleLoading } from "@/components/loading";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Popconfirm, Popover, Table, Tabs, Tag } from "antd";
import { ColumnsType } from "antd/es/table";

type updateOrderForm={
    onClose:()=>void;
}
export default function OrderUpdater({onClose}:updateOrderForm) {
  const {data: invoicePending,isLoading: isLoadingPending}=useListInvoice('Pending','Sale')
  const {data: invoiceDraft,isLoading: isLoadingDraft}= useListInvoice('Draft','Sale')
  const { data: deliveredInvoices, isLoading: isLoadingDelivered } = useListInvoice('Delivered','Sale');
  
  const {mutateAsync: statusInvoice}=useChangeInvoice();
  const { TabPane } = Tabs;

  if (isLoadingPending) return <CircleLoading />;
 
  if (isLoadingDelivered) return <CircleLoading />;
  
  if (isLoadingDraft) return <CircleLoading />;
 



  const columns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "invoiceId",
      key: 'invoiceId',
      width: '5%'
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      key: 'customerName',
      
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
  const columnsDraft: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "invoiceId",
      key: 'invoiceId',
      width: '5%'
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      key: 'customerName',
      
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
      align: "center",
      key: "action",
      render: (_) => (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <Popover content="Update this record">
            <Button
              type="primary"
              icon={<EditOutlined />}
              // onClick={() => handleUpdate(record)}
            />
          </Popover>
          <Popconfirm
            title="Are you sure you want to delete this record?"
            // onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Popover content="Delete this record">
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
              />
            </Popover>
          </Popconfirm>
        </div>
      )
    }
  ];
  
  return (
   <Modal
    title="View Order"
    open
      onCancel={() => onClose()}
      width={1000}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
      ]}
   >
    <Tabs defaultActiveKey="1" className="mt-3" >
      <TabPane tab="Sales Orders" key="1">
        <Tabs defaultActiveKey="1" type='card'>
          
          <TabPane tab="Draft" key="1-2">
            <Table
              rowKey="invoiceId"
              columns={columnsDraft}
             
              scroll={{ x: "max-content" }}
              dataSource={invoiceDraft.items}
              size="large"
              bordered
            />
          </TabPane>
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
          <TabPane tab="Completed" key="1-3">
            <Table
              rowKey="invoiceId"
              columns={columns}
              
              scroll={{ x: "max-content" }}
              dataSource={deliveredInvoices.items}
              size="large"
              bordered
            />
          </TabPane>
        </Tabs>
      </TabPane>
      
    </Tabs>
   </Modal>
  )
}
