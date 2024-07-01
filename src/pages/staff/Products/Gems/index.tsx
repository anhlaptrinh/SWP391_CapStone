import { Gem } from "#/jwelry";
import { CircleLoading } from "@/components/loading";
import { Row, Col, Card, Button,Image, Typography, Divider, Pagination, Tooltip } from "antd";
import { useState } from "react";
import Gemsdetails from "./gems.details";
import { useOrderStore } from "@/store/order";
import { useListGems } from "@/api/staff/listProduct";


const { Text } = Typography;

export default function Gems() {
  const { data, isLoading, error } = useListGems();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 6; // Số lượng sản phẩm trên mỗi trang
  const [showDetail,setShowDetail]=useState<any>(false);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentItems = data?.items?.slice(startIndex, endIndex);
  const addCartItem = useOrderStore((state) => state.addCartItem);
  if (isLoading) return <CircleLoading />;
  if (error) return <div>Error loading gems data.</div>;
  // Tính toán chỉ mục sản phẩm trên trang hiện tại
 
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleAddToCart = (gem: Gem) => {
    addCartItem({
      id: gem.gemId,
      name: gem.gemName,
      image: gem.featuredImage,
      quantity: 1, // Default quantity
      price: gem.price,
    });
  };
  const handleCloseDetail=()=>{
    setShowDetail(false);
  }
  return (
    <div>
      <Row gutter={[16, 16]}>
        {currentItems?.map((gem: Gem) => (
          <Col xs={24} sm={12} lg={8} key={gem.gemId}>
            <Card
              hoverable
              className="shadow-lg rounded-lg overflow-hidden h-30"
            >
          <Card className="flex  items-center overflow-hidden shadow-lg justify-center h-20">
            <Image
                src={gem.featuredImage}
                alt={gem.gemName}
                className="w-full h-full object-cover "
                
              />
            </Card>
              <Divider />
              <Card.Meta
              className="text-center"
              title={<Tooltip>{gem.gemName}</Tooltip>}
              description={
                <Text strong style={{ color: 'green' }}>
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(gem?.price)}
                </Text>
              }
            />
              <div className="mt-3 flex justify-around">
                <Button
                  size="small"
                  type="primary"
                  onClick={() => setShowDetail(gem)}
                >
                  Details
                </Button>
                <Button
                  size="small"
                  type="default"
                  onClick={() => handleAddToCart(gem)}
                >
                  Select
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          total={data?.items?.length}
          pageSize={pageSize}
          onChange={(page)=>handlePageChange(page)}
          showSizeChanger={false}
        />
      </div>
      {showDetail!==false &&(
        <Gemsdetails data={showDetail} onClose={handleCloseDetail}/>
      )}
    </div>
  );
}
