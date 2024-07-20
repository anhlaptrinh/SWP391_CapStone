import { Button, Card, Col, Row, Tabs, Typography } from "antd";
import Gems from "../Products/Gems";
import Gold from "../Products/Gold";
import OrderDetail from "./orderDetails";
import Jwelery from "../Products/Jwelery";
import { useListGems, uselistGold, useListJwelery } from "@/api/staff/listProduct";
import { CrownOutlined,  GoldOutlined,  RubyOutlined } from "@ant-design/icons";




export default function Order() {
  const { TabPane } = Tabs;
  const userlocal=localStorage.getItem('user')||"";
  const user = JSON.parse(userlocal);
  const username=user.username;
  const {Text}=Typography;
  const {refetch:jrefresh}=useListJwelery();
  const {refetch:grefresh}=useListGems();
  const {refetch:refresh}=uselistGold();


const { Title } = Typography;
const handleRefresh=()=>{
  // window.location.reload();
  jrefresh();
  grefresh();
  refresh();
}
  return (
    <div className="h-full">
    <Row gutter={12}>
      <Col span={14}>
        <Card style={{ backgroundColor: '#f0f2f5' }} >
          <Tabs tabBarExtraContent={
            <Button danger onClick={handleRefresh}>Refresh</Button>
          } style={{fontSize:'30px'}} defaultActiveKey="gold" type="line" >
            <TabPane tab={<> <GoldOutlined   style={{ color: 'Orange', fontSize: '20px', marginRight: '8px' }} /> <Text style={{ color: 'Orange', fontSize: '18px',fontFamily:'sans-serif' }} strong>Gold</Text></>} key="gold">
              <Gold />
            </TabPane>
            <TabPane tab={ <>
                    <RubyOutlined  style={{ color: 'blueviolet', fontSize: '18px', marginRight: '8px' }} />
                    <Text style={{ color: 'blueviolet', fontSize: '18px', fontFamily:'sans-serif' }} strong>Gems</Text>
                  </>} key="gems">
              <Gems />
            </TabPane>
            <TabPane tab={<>
                    <CrownOutlined style={{ color: '#FF1493', fontSize: '20px', marginRight: '8px' }} />
                    <Text style={{ color: '#FF1493', fontSize: '18px',fontFamily:'sans-serif' }} strong>Jewelry</Text>
                  </>} key="jwelery">
              <Jwelery />
            </TabPane>
          </Tabs>
        </Card>
      </Col>
      <Col span={10}>
        <Card
          style={{ borderRadius: "10px", backgroundColor:'#F1F1F1' }}
          title={
            <Title className="text-center" level={3}>
              Order Details
            </Title>
          }
          headStyle={{ background: "#B5C18E", borderRadius: "10px 10px 0 0" }}
        >
          <div className="text-center w-full">
            <h3 className="font-mono text-center ">
              <strong>Hi {username}, we received your order</strong>
            </h3>
          </div>
          
          <OrderDetail />
          
        </Card>

      </Col>
      
    </Row>
  </div>
  );
}
