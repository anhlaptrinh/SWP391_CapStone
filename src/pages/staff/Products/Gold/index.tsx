import { GoldProduct } from "#/jwelry";
import { CircleLoading } from "@/components/loading";
import { Row, Col, Card, Button, Image, Typography, Divider, Pagination, Tooltip, Input } from "antd";
import { useState, useMemo, useEffect } from "react";
import { useOrderStore } from "@/store/order";
import { uselistGold } from "@/api/staff/listProduct";
import GoldDetail from "./gold.detail";

const { Text } = Typography;

export default function Gold() {
  const { data, isLoading, error } = uselistGold();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const pageSize = 6; // Số lượng sản phẩm trên mỗi trang
  const [showDetail, setShowDetail] = useState<any>(false);

  const filteredData = useMemo(() => {
    return data?.items?.filter((item: GoldProduct) =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentItems = filteredData?.slice(startIndex, endIndex);
  const addCartItem = useOrderStore((state) => state.addCartItem);

  if (isLoading) return <CircleLoading />;
  if (error) return <div>Error loading gold data.</div>;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddToCart = (gold: GoldProduct) => {
    addCartItem({
      id: gold.productId,
      name: gold.productName,
      image: 'https://st.depositphotos.com/1000128/1949/i/450/depositphotos_19492613-stock-photo-gold-ingots.jpg',
      quantity: 1, // Default quantity
      price: gold.materialPrice.sellPrice,
    });
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  return (
    <div>
      <Input.Search
        placeholder="Search by Name"
        style={{ marginBottom: "16px" }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Row gutter={[16, 16]}>
        {currentItems?.map((gold: GoldProduct) => (
          <Col xs={24} sm={12} lg={8} key={gold.productId}>
            <Card
              hoverable
              className="shadow-lg rounded-lg overflow-hidden h-30"
            >
              <Card className="flex  items-center overflow-hidden shadow-lg justify-center h-20">
                <Image
                  src='https://st.depositphotos.com/1000128/1949/i/450/depositphotos_19492613-stock-photo-gold-ingots.jpg'
                  alt={gold.productName}
                  className="w-full h-full object-cover "
                />
              </Card>
              <Divider />
              <Card.Meta
                className="text-center"
                title={<Tooltip title={gold.productName}>{gold.productName}</Tooltip>}
                description={
                  <Text strong style={{ color: 'green' }}>
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(gold?.materialPrice?.sellPrice)}
                  </Text>
                }
              />
              <div className="mt-3 flex justify-around">
                <Button
                  size="middle"
                  type="primary"
                  onClick={() => setShowDetail(gold)}
                >
                  Details
                </Button>
                <Button
                  size="middle"
                  type="default"
                  style={{ backgroundColor: '#53c41a', color: '#fff' }}
                  onClick={() => handleAddToCart(gold)}
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
          total={filteredData?.length}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
      {showDetail !== false && (
        <GoldDetail data={showDetail} onClose={handleCloseDetail} />
      )}
    </div>
  );
}
