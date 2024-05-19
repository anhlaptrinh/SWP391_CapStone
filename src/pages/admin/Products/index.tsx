import { getJwelryApi } from '@/api/mock/jwellry';
import { useQuery } from '@tanstack/react-query';
import {Jwellery} from '../../../../types/jwelry'
import { Row, Layout, Avatar, Card, Button, Col, Table, Space, Input } from "antd";
import Meta from "antd/es/card/Meta";
import payment from '../../../assets/images/payment.svg';
import {Paypal} from '@/layouts/_common/paypal';
import type { SearchProps } from 'antd/es/input/Search';
export default function Products() {
  const { Sider, Content } = Layout;
  const { Search } = Input;
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
 

  const contentStyle: React.CSSProperties = {
    textAlign: "center",
    minHeight: 120,
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#ffff",
  };

  const siderStyle: React.CSSProperties = {
    textAlign: "center",
    lineHeight: "120px",
    color: "black",
    backgroundColor: "#fff",
    display: "fixed",
    right: 0,
    top: 0,
  };

  const layoutStyle = {
    borderRadius: 8,
    overflow: "hidden",
    width: "100%",
    height: "100%",
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

  return (
    <div className="layout-content " style={{ height: '100%',overflow:"hidden" }}>
    <Row className='mb-4'>
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
    <Layout style={layoutStyle} className='flex'>
        <Layout  >
            <Content style={contentStyle} >
                <div className='h-[100%] pb-4 bg-gray-100 mr-2' style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 64px)' }}>
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
                                        cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                    >
                                        <Meta title={item.productName} className="pb-3" />
                                        <Button type="primary">Create</Button>
                                    </Card>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Content>
        </Layout>
        <Sider width="23%" style={{ ...siderStyle, maxHeight: '90vh' }}>
        
            <img
                src={payment}
                alt="payment"
                className=" object-cover"
            />
        
        <div>
            <Table columns={columns} dataSource={product} pagination={false} />
        </div>
        <div>
            <Paypal/>
        </div>
    </Sider>
    </Layout>
    
</div>
  );
}
