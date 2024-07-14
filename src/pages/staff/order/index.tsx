import { Card, Col, Input, Row, Tabs, Tag, Typography } from "antd";
import Gems from "../Products/Gems";
import Gold from "../Products/Gold";
import OrderDetail from "./orderDetails";
import Jwelery from "../Products/Jwelery";




export default function Order() {
  const { TabPane } = Tabs;
  const userlocal=localStorage.getItem('user')||"";
  const user = JSON.parse(userlocal);
  const username=user.username;
  


const { Title } = Typography;
  return (
    <div className="h-full">
    <Row gutter={12}>
      <Col span={14}>
        <Card style={{ backgroundColor: '#f0f2f5' }} >
          <Input.Search
            placeholder="Search"
            style={{ marginBottom: "16px" }}
          />
          <Tabs defaultActiveKey="gold">
            <TabPane tab="Gold" key="gold">
              <Gold />
            </TabPane>
            <TabPane tab="Gems" key="gems">
              <Gems />
            </TabPane>
            <TabPane tab="Jwelery" key="jwelery">
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
