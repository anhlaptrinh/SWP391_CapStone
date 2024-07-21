import { useCancelInvoice, useChangeInvoice, useListInvoice, useListPurchaseInvoice, usePaymentVNPAY,  usePrintWarranty } from '@/api/staff/listInvoice';
import { IconButton, Iconify } from '@/components/icon';
import { CircleLoading } from '@/components/loading';
import { ArrowDownOutlined, DeleteOutlined, DeliveredProcedureOutlined, FileProtectOutlined, PayCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Table, Popover, Tag, Tabs, Button, message, Popconfirm, InputRef, Input, Space, TableColumnType, Modal, Form } from 'antd';
import form from 'antd/es/form';
import { ColumnsType } from 'antd/es/table';
import { FilterDropdownProps } from 'antd/es/table/interface';
import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';


export default function Invoice() {
 
  const {data: invoicePPending,isLoading: isLoadingPPending,refetch}=useListPurchaseInvoice('Pending','Purchase')
  const {data: invoicePProcessing,isLoading: isLoadingPProcessing}= useListPurchaseInvoice('Processing','Purchase')
  const { data: deliveredPInvoices, isLoading: isLoadingPDelivered } = useListPurchaseInvoice('Delivered','Purchase');
  const {data: invoicePending,isLoading: isLoadingPending}=useListInvoice('Pending','Sale')
  const {data: invoiceProcessing,isLoading: isLoadingProcessing}= useListInvoice('Processing','Sale')
  const { data: deliveredInvoices, isLoading: isLoadingDelivered } = useListInvoice('Delivered','Sale');
  const {mutateAsync: statusInvoice}=useChangeInvoice();
  const {mutateAsync:vnpayPayment}=usePaymentVNPAY();
  const [invoiceId,setInvoiceId]=useState();
  const {mutateAsync:cancelInvoice}=useCancelInvoice();

  const [error, setError] = useState<string | null>(null);
  const { TabPane } = Tabs;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [cashOpen,setcashOpen]=useState(false);
  const [id,setId]=useState();
  
  if (isLoadingPending) return <CircleLoading />;
  if (isLoadingProcessing) return <CircleLoading />;
  if (isLoadingDelivered) return <CircleLoading />;
  if (isLoadingPPending) return <CircleLoading />;
  if (isLoadingPProcessing) return <CircleLoading />;
  if (isLoadingPDelivered) return <CircleLoading />;
  
  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: any
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: any): TableColumnType<any> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, borderRadius: 5 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90, borderRadius: 5 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            style={{ color: "red" }}
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined
        style={{
          fontSize: '17px',
          alignContent: 'center',
          width: '17px',
          color: filtered ? "#1677ff" : undefined
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).trim().toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "invoiceId",
      key: 'invoiceId',
      width: '5%',
      ...getColumnSearchProps("invoiceId")
    },
    
    { title: "Staff", align: "center", dataIndex: "userName", key: "userName" },
    { title: "Customer", align: "center", dataIndex: "customerName", key: "customerName" },
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
      title: "Price Product",
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
      sorter: (a, b) => b.totalWithDiscount - a.totalWithDiscount,
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
    { title: "Order Date", align: "center", dataIndex: "orderDate", key: "orderDate",render: (text: string) => dayjs(text).format("DD/MM/YYYY") },

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
          <Popconfirm
            title="Are you sure you want to delete this record?"
            onConfirm={() => cancelInvoice(record.invoiceId)}
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
      ),
    },
  ];
  const columnsDeliver: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "invoiceId",
      key: 'invoiceId',
      ...getColumnSearchProps("invoiceId"),
      width: '5%'
    },
    
    { title: "Staff", align: "center", dataIndex: "userName", key: "userName" },
    { title: "Customer", align: "center", dataIndex: "customerName", key: "customerName" },
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
      sorter: (a, b) => b.totalWithDiscount - a.totalWithDiscount,
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
    { title: "Order Date", align: "center", dataIndex: "orderDate", key: "orderDate",render: (text: string) => dayjs(text).format("DD/MM/YYYY") },
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
              onClick={()=>handlePrinInvoice(record.invoiceId)}
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
        </div>
      ),
    },
    
  ];
  const columnsbuyDeliver: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "invoiceId",
      key: 'invoiceId',
      ...getColumnSearchProps("invoiceId"),
      width: '5%'
    },
    
    { title: "Staff", align: "center", dataIndex: "userName", key: "userName" },
    { title: "Customer", align: "center", dataIndex: "customerName", key: "customerName" },
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
      sorter: (a, b) => b.totalWithDiscount - a.totalWithDiscount,
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
    { title: "Order Date", align: "center", dataIndex: "orderDate", key: "orderDate",render: (text: string) => dayjs(text).format("DD/MM/YYYY") },
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
              onClick={()=>handlePrinInvoice(record.invoiceId)}
              icon={<FileProtectOutlined />}
            ></Button>
          </Popover>
          
        </div>
      ),
    },
    
  ];
  const columnsBuy: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "invoiceId",
      key: 'invoiceId',
      ...getColumnSearchProps("invoiceId"),
      width: '5%'
    },
    
    { title: "Staff", align: "center", dataIndex: "userName", key: "userName" },
    { title: "Customer", align: "center", dataIndex: "customerName", key: "customerName" },
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
    { title: "Order Date", align: "center", dataIndex: "orderDate", key: "orderDate",render: (text: string) => dayjs(text).format("DD/MM/YYYY") },
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
          <Popconfirm
            title="Are you sure you want to delete this record?"
            onConfirm={() => cancelInvoice(record.invoiceId)}
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
      ),
    },
    
  ];
 
  const columnsProcess: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "invoiceId",
      key: 'invoiceId',
      ...getColumnSearchProps("invoiceId"),
      width: '5%'
    },
    
    { title: "Staff", align: "center", dataIndex: "userName", key: "userName" },
    { title: "Customer", align: "center", dataIndex: "customerName", key: "customerName" },
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
      sorter: (a, b) => b.totalWithDiscount - a.totalWithDiscount,
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
    { title: "Order Date", align: "center", dataIndex: "orderDate", key: "orderDate",render: (text: string) => dayjs(text).format("DD/MM/YYYY") },
    {
      title: "Action",
      dataIndex: "actions",
      align: "center",
      render: (_, record) => (
        <div className="text-gray  flex w-full items-center justify-between">
          <Popover content="Banking">
            <Button
            onClick={()=>handlePayment(record.invoiceId)}
              size='small'
              type="primary"
              style={{backgroundColor:'green'}}
            >Credit</Button>
          </Popover>
          <Popover content="Payment">
            <Button
            onClick={()=>{
              setcashOpen(true);
              form.setFieldsValue({
                totalWithDiscount:record.totalWithDiscount
              });
              setId(record.invoiceId);
            }}
              size='small'
              type="primary"
              style={{backgroundColor:'Orange'}}
            >Cash</Button>
          </Popover>
        </div>
      ),
    },
  ];
  const columnsBuyProcess: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "invoiceId",
      key: 'invoiceId',
      ...getColumnSearchProps("invoiceId"),
      width: '5%'
    },
    
    { title: "Staff", align: "center", dataIndex: "userName", key: "userName" },
    { title: "Customer", align: "center", dataIndex: "customerName", key: "customerName" },
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
      title: "Price",
      align: "center",
      dataIndex: "total",
      key: "total",
      sorter: (a, b) => b.total - a.total,
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
    { title: "Order Date", align: "center", dataIndex: "orderDate", key: "orderDate",render: (text: string) => dayjs(text).format("DD/MM/YYYY") },
    // statusInvoice(record.invoiceId)
    {
      title: "Action",
      dataIndex: "actions",
      align: "center",
      render: (_, record) => (
        <div className="text-gray  flex w-full items-center justify-center">
          <Popover content="Payment">
            <Button
            onClick={()=>handleBuyCash(record.invoiceId)}
              size='middle'
              type="primary"
              style={{backgroundColor:'green'}}
            >Complete</Button>
          </Popover>
        </div>
      ),
    },
  ];
  const onFormValuesChange = (_:any, allValues:any) => {
    calculateMoneyExchange();
  };

  const calculateMoneyExchange = () => {
    const enterAmount = form.getFieldValue("enteramount");
    const totalWithDiscount = form.getFieldValue("totalWithDiscount") || 0;
    if (enterAmount !== undefined) {
      const moneyEx = Math.max(0, enterAmount - totalWithDiscount);
      const formattedMoneyEx = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(moneyEx);
      form.setFieldsValue({ moneyex: formattedMoneyEx });
    }
  };

  // Lắng nghe sự thay đổi của ô "Enter Amount"
  
  const handlePrintWarranty=async(id:any)=>{
    if (!id) {
      message.error("id error");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://jewelrysalessystem.azurewebsites.net/api/invoices/pdf`,
        {
          params: {invoiceId: id,warrantyId: 1},
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoiceWarranty.pdf`); // You can set the file name here
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error) {
      message.error("Failed to fetch invoice report");
    } finally {
      setLoading(false);
    }
  }
  const handlePrinInvoice=async(id:any)=>{
    if (!id) {
      message.error("id error");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://jewelrysalessystem.azurewebsites.net/api/invoices/${id}/pdf`,
        {
          
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoiceWarranty.pdf`); // You can set the file name here
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error) {
      message.error("Failed to fetch invoice report");
    } finally {
      setLoading(false);
    }
  }
  const handlePayment=(id:any)=>{
      //  statusInvoice(id)
    vnpayPayment(id)
  }
  const handleCash=()=>{
    form.resetFields();
    
      form.validateFields().then(()=>{statusInvoice(id);setcashOpen(false);}).catch((info) => {
       
      }); 
  }
const handleCancel=()=>{
  form.resetFields();
  setcashOpen(false);
    

}
const handleBuyCash=(id:any)=>{
  statusInvoice(id)
}
  return (
    <>
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
              columns={columnsBuyProcess}
              
              scroll={{ x: "max-content" }}
              dataSource={invoicePProcessing?.items}
              size="large"
              bordered
            />
          </TabPane>
          <TabPane tab="Delivered" key="2-3">
            <Table
              rowKey="invoiceId"
              columns={columnsbuyDeliver}
              
              scroll={{ x: "max-content" }}
              dataSource={deliveredPInvoices?.items}
              size="large"
              bordered
            />
          </TabPane>
        </Tabs>
      </TabPane>
    </Tabs>
    <Modal
        title='Payment'
        open={cashOpen}
        onOk={handleCash}
        onCancel={handleCancel}
        okText='Pay'
      >
         <Form onValuesChange={onFormValuesChange} form={form} layout="vertical" name="userForm">
      <Form.Item
        name="enteramount"
        label="Enter Amount"
        rules={[{ required: true, message: "Please Enter Amount!" }]}
      >
        <Input onChange={calculateMoneyExchange} />
      </Form.Item>
      <Form.Item name="totalWithDiscount" label="Money to Pay">
        <Input disabled defaultValue={0} />
      </Form.Item>
      <Form.Item
        name="moneyex"
        label="Money Exchange"
        rules={[{ required: true, message: "Please Enter Exchange Money!" }]}
      >
        <Input disabled />
      </Form.Item>
    </Form>
      </Modal>
    </>
  )
}

