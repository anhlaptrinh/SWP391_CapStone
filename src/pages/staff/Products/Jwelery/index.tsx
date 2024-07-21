import { useListJwelery } from "@/api/staff/listProduct";
import { CircleLoading } from "@/components/loading";
import { useOrderStore } from "@/store/order";
import { Typography, Row, Col, Card, Divider, Tooltip, Image, Button, Pagination, Input, Select } from "antd";
import { useMemo, useState } from "react";
import Jwelerydetails from "./jwelery.details";
import { useListCounters } from "@/api/manager/user";
import { RedoOutlined } from "@ant-design/icons";

const { Text } = Typography;

export default function Jwelery() {
  const { data, isLoading, error } = useListJwelery();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCounter, setSelectedCounter] = useState<string | null>(null);
  const pageSize = 6; // Số lượng sản phẩm trên mỗi trang
  const [showDetail, setShowDetail] = useState<any>(false);
  const { data: dataCounters } = useListCounters();
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const addCartItem = useOrderStore((state) => state.addCartItem);

  const filteredData = useMemo(() => {
    return data?.items?.filter((item: any) => {
      const matchesSearch =  item.productId.toString().toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCounter = selectedCounter ? item.counter === selectedCounter : true;
      return matchesSearch && matchesCounter;
    });
  }, [data, searchTerm, selectedCounter]);

  const currentItems = filteredData?.slice(startIndex, endIndex);

  if (isLoading) return <CircleLoading />;
  if (error) return <div>Error loading Jwelery data.</div>;

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

  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  const prepareSelectOptions = (
    data: any[],
    idField: string,
    nameField: string
  ) => {
    if (!data) return [];
    return data.map((item) => ({
      value: item[nameField], // Sử dụng nameField để lấy giá trị
      label: item[nameField],
    }));
  };

  const handleCounterChange = (value: string) => {
    setSelectedCounter(value);
    setCurrentPage(1); // Reset về trang đầu khi thay đổi bộ lọc
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCounter(null);
    setCurrentPage(1); // Reset về trang đầu khi đặt lại bộ lọc
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Input.Search
            placeholder="Search by Product Name"
            style={{ marginBottom: "16px",  }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col span={6}>
          <Select
            showSearch
            placeholder="Select a counter"
            optionFilterProp="children"
            onChange={handleCounterChange}
            filterOption={filterOption}
            options={prepareSelectOptions(
              dataCounters,
              "counterId",
              "counterName"
            )}
            value={selectedCounter}
          />
        </Col>
        <Col span={6} style={{ textAlign: 'right' }}>
          <Button style={{backgroundColor:"#fff"}} icon={<RedoOutlined />} size="middle" onClick={handleReset}>Reset</Button>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        {currentItems?.map((product: any) => (
          <Col xs={24} sm={12} lg={8} key={product.productId}>
            <Card
              hoverable
              className="shadow-lg rounded-lg overflow-hidden h-30"
            >
              <Card className="flex items-center overflow-hidden shadow-lg justify-center h-20">
                <Image
                  src={product.featuredImage}
                  alt={product.productName}
                  className="w-full h-full object-cover"
                />
              </Card>
              <Divider />
              <Card.Meta
                className="text-center"
                title={<Tooltip title={product.productName}>{product.productName}</Tooltip>}
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
                  size="middle"
                  type="primary"
                  onClick={() => setShowDetail(product)}
                >
                  Details
                </Button>
                <Button
                  size="middle"
                  style={{ color: '#fff', backgroundColor: '#53c41a' }}
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
          total={filteredData?.length}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
      {showDetail !== false && (
        <Jwelerydetails data={showDetail} onClose={handleCloseDetail} />
      )}
    </div>
  );
}
