import { useChangeInvoice, useListInvoice, useListPurchaseInvoice } from "@/api/staff/listInvoice";
import { CircleLoading } from "@/components/loading";
import { Table, Popover, Tag, Tabs, Button, Col, Form, Input, Row, InputRef, Space, TableColumnType } from "antd";
import { ColumnsType } from "antd/es/table";
import { useRef, useState } from "react";
import OrderPurchase from "./order.purchase";
import OrderRePurchase from "./order.repurchase";
import { SearchOutlined } from "@ant-design/icons";
import { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";

export default function InvoiceChecked() {
  const data: any = [];
  const { data: deliveredInvoices, isLoading: isLoadingDelivered } =
    useListInvoice("Delivered",'Sale');
  
  const { mutateAsync: statusInvoice } = useChangeInvoice();
  const { TabPane } = Tabs;
  const [form] = Form.useForm();
  const {data: invoicePPending,isLoading: isLoadingPPending}=useListPurchaseInvoice('Pending','Purchase')
  const {data: invoicePDraft,isLoading: isLoadingPDraft}= useListPurchaseInvoice('Processing','Purchase')
  const { data: deliveredPInvoices, isLoading: isLoadingPDelivered } = useListPurchaseInvoice('Delivered','Purchase');
  const [openPurchaseModal, setPurchaseModal] = useState(false);
  const [datarepurchase,setrePurchase]=useState([]);
  const [dataopenPurchase,setopenPurchase]=useState(false);
  const [searchText,setSearchText]=useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  if (isLoadingDelivered) return <CircleLoading />;
  if (isLoadingPPending) return <CircleLoading />;
  if (isLoadingPDraft) return <CircleLoading />;
  if (isLoadingPDelivered) return <CircleLoading />;
  const handleSearch=(
    selectedKeys:string[],
    confirm:FilterDropdownProps["confirm"],
    dataIndex:any)=>{
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
     const handleReset = (clearFilters: () => void) => {
            clearFilters();
            setSearchText("");
          };
  
    const getColumnSearchProps = (dataIndex: any ): TableColumnType<any> => ({
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
                    icon={<SearchOutlined  />}
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
                style={{fontSize: '17px',alignContent:'center',width: '17px', color: filtered ? "#1677ff" : undefined }}
              />
            ),
            onFilter: (value, record) =>
              record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
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
      key: "invoiceId",
      width: "5%",
      ...getColumnSearchProps("invoiceId"),
    },

    { title: "Staff", align: "center", dataIndex: "userName", key: "userName" },
    // {
    //   title: "Warranty",
    //   align: "center",
    //   dataIndex: "warranty",
    //   key: "warranty",
    // },
    {
      title: "Customer",
      align: "center",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Items Order",
      align: "center",
      dataIndex: "items",
      key: "items",
      render: (items) => {
        const popoverContent = (
          <Table
            dataSource={items.map((item: any, index: number) => ({
              ...item,
              key: index,
            }))}
            columns={[
              { title: "ID", dataIndex: "productId", key: "productId" },
              { title: "Name", dataIndex: "productName", key: "productName" },
              { title: 'Quantity',align:'center', dataIndex: 'quantity', key: 'quantity' },
              {
                title: "Price",
                dataIndex: "productPrice",
                key: "productPrice",
                render: (text) =>
                  `${new Intl.NumberFormat("en-US").format(text)} VND`,
              },
            ]}
            pagination={false}
            size="small"
            bordered
          />
        );
        return (
          <Popover
            content={popoverContent}
            title="Item Details"
            trigger="hover"
          >
            <a>View Items</a>
          </Popover>
        );
      },
    },
    {
      title: "Price",
      align: "center",
      dataIndex: "total",
      key: "total",
      
      render: (text) => `${new Intl.NumberFormat("en-US").format(text)}VND`,
    },
    {
      title: "Promotion",
      align: "center",
      dataIndex: "perDiscount",
      key: "perDiscount",
      render: (text) => <Tag color="red">{text}%</Tag>,
    },
    

    {
      title: "Amount",
      align: "center",
      dataIndex: "totalWithDiscount",
      sorter: (a, b) => b.total - a.total,
      key: "totalWithDiscount",
      render: (text) => `${new Intl.NumberFormat("en-US").format(text)}VND`,
    },
    {
      title: "Order Status",
      align: "center",
      dataIndex: "invoiceStatus",
      key: "invoiceStatus",
      render: (status) => {
        let color;
        switch (status) {
          case "Delivered":
            color = "green";
            break;
          case "Pending":
            color = "gold";
            break;
          case "Processing":
            color = "magenta";
            break;
          default:
            color = "blue";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },

    {
      title: "Action",
      dataIndex: "actions",
      align: "center",
      render: (_, record) => (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <Popover content=" You want repurchase this invoice?">
            <Button
              type="primary"
             size="middle"
               onClick={() => handlePurchase(record)}
            >Repurchase</Button>
          </Popover>
          
        </div>
      )
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
      dataIndex: "total",
      key: "total",
      
      render: (_,record) => `${new Intl.NumberFormat('en-US').format(record.total || 0)} VND`,
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
  const handlePurchaseModal = () => {
    setPurchaseModal(false);
    setopenPurchase(false);
  };
  const handlePurchase=(data:any)=>{
      setrePurchase(data);
      setopenPurchase(true);
  }
  const onFinishHandler = (values: any) => {
    console.log(values);
  };
  return (
    <div className="mt-3 text-sm">
      <Form form={form} onFinish={onFinishHandler}>
        <Row gutter={24} justify="space-between">
         
          <Col span={12}>
            <Button
              className="mt-3"
              size="small"
              type="dashed"
              danger
              onClick={() => setPurchaseModal(true)}
            >
              Create Purchase Order
            </Button>
          </Col>
        </Row>
      </Form>
      <Tabs defaultActiveKey="1" className="mt-3">
        <TabPane tab="Sales Invoice" key="1">
          <Table
            rowKey="invoiceId"
            columns={columns}
           
            scroll={{ x: "max-content" }}
            dataSource={deliveredInvoices.items}
            size="large"
            bordered
          />
        </TabPane>
        <TabPane tab="Purchase Orders" key="2">
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
              columns={columnsBuy}
              
              scroll={{ x: "max-content" }}
              dataSource={invoicePDraft?.items}
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
      {openPurchaseModal !== false && (
          <OrderPurchase onclose={handlePurchaseModal} />
        )}
        {dataopenPurchase!==false&&(<OrderRePurchase data={datarepurchase} onclose={handlePurchaseModal}/>)}
    </div>
  );
}
