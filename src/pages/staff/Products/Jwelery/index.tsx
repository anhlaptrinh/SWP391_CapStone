import { useListJwelery } from "@/api/staff/listProduct";
import { CircleLoading } from "@/components/loading";
import { useOrderStore } from "@/store/order";
import { Typography, Row, Col, Card, Divider, Tooltip,Image, Button, Pagination } from "antd";
import { useState } from "react";
import Gemsdetails from "../Gems/gems.details";


const { Text } = Typography;
export default function Jwelery() {
  const { data, isLoading, error } = useListJwelery();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 6; // Số lượng sản phẩm trên mỗi trang
  const [showDetail,setShowDetail]=useState<any>(false);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentItems = data?.items?.slice(startIndex, endIndex);
  const addCartItem = useOrderStore((state) => state.addCartItem);
  if (isLoading) return <CircleLoading />;
  if (error) return <div>Error loading Jwelery data.</div>;
  // Tính toán chỉ mục sản phẩm trên trang hiện tại
 
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleAddToCart = (product: any) => {
    addCartItem({
      id: product.productId,
      name: product.productName,
      image: product.featuredImage,
      quantity: 1, // Default quantity
      price: product.productPrice,
    });
  };
  const handleCloseDetail=()=>{
    setShowDetail(false);
  }
  return (
    <div>
      <Row gutter={[16, 16]}>
        {currentItems?.map((product: any) => (
          <Col xs={24} sm={12} lg={8} key={product.productId}>
            <Card
              hoverable
              className="shadow-lg rounded-lg overflow-hidden h-30"
            >
          <Card className="flex  items-center overflow-hidden shadow-lg justify-center h-20">
            <Image
                src={product.featuredImage}
                alt={product.productName}
                className="w-full h-full object-cover "
                
              />
            </Card>
              <Divider />
              <Card.Meta
              className="text-center"
              title={<Tooltip>{product.productName}</Tooltip>}
              description={
                <Text strong style={{ color: 'green' }}>
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(product?.productPrice)}
                </Text>
              }
            />
              <div className="mt-3 flex justify-around">
                <Button
                  size="small"
                  type="primary"
                  onClick={() => setShowDetail(product)}
                >
                  Details
                </Button>
                <Button
                  size="small"
                  type="default"
                  onClick={() => handleAddToCart(product)}
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
        <Gemsdetails data={showDetail} onClose={()=>handleCloseDetail}/>
      )}
    </div>
  );
}
