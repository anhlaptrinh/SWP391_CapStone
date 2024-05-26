import { deleteJwelryApi, getJwelryApi } from "@/api/mock/jwellry";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Jwellery } from "../../../../types/jwelry";
import {
  Row,
  Layout,
  Card,
  Button,
  Col,
  Image,
  Space,
  Input,
  Checkbox,
  Modal,
  Typography,
  Select,
} from "antd";
import Meta from "antd/es/card/Meta";
import type { SearchProps } from "antd/es/input/Search";
import { useState } from "react";
import ModalGem from "@/layouts/products/Modal";

export default function Products() {
  
  const { Content } = Layout;
  const { Search } = Input;
  const [isSelect, setDelete] = useState(false);
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);
  const [isDetail, setDetail] = useState(false);
  const [isUpdate, setUpdate] = useState(false);
  const [isInvoice, setInvoice] = useState(false);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleCardClick = (itemId: string) => {
    setCheckedItems({
      ...checkedItems,
      [itemId]: !checkedItems[itemId], // Toggle the checked state
    });
  };
  const handleSelectChange = () => {
    setShowTable(true);
  };
  const products = [
    {
      tensanPham: "Nhẫn",
      hinhAnh:
        "https://trangsuc.doji.vn/Upload/product/nhan-cuoi/nhan-cuoi-0319195w1015va-0163.jpg",
    },
    {
      tensanPham: "Khuyên Tai",
      hinhAnh:
        "https://cdn.vuahanghieu.com/unsafe/0x0/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/news/content/2022/10/khuyen-tai-louis-vuitton-baby-louise-earrings-m00613-1-jpg-1664950887-05102022132127.jpg",
    },
    {
      tensanPham: "Vòng",
      hinhAnh:
        "https://locphuc.com.vn/Content/Images/Product/01-06-2020-update-34sp/vong-tay-vang-trang-18K-VBL0270ABWWG-00-LP06200349-g1.jpg",
    },
    {
      tensanPham: "Dây Chuyền",
      hinhAnh:
        "https://locphuc.com.vn/Content/Images/San-pham-lan-22/day-chuyen-cz-vang-14k-VFH0757N-LP0618140-g1.jpg",
    },
  ];

  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: async () => getJwelryApi(),
  });

  const queryClient = useQueryClient();
  const { mutate: handledeletePro } = useMutation({
    mutationFn: (id: any) => {
      return deleteJwelryApi(id);
    },
    onSuccess: () => {
      setDelete(true);
      console.log("xóa thành công");
      queryClient.refetchQueries({
        queryKey: ["products"],
        type: "active",
      });
    },
    onError: (error) => console.log(error),
  });
  const handleDelete = (id: any) => {
    handledeletePro(id);
  };
  const [showTable, setShowTable] = useState(false);
  return (
    <div
      className="layout-content "
      style={{ height: "100%", overflow: "hidden" }}
    >
      <Row gutter={[0, 0]}>
        <Col span={24}>
          <Row gutter={[0, 15]}>
            <Col span={24}>
              <Space direction="vertical">
                <Search
                  placeholder="input search text"
                  allowClear
                  enterButton="Search"
                  size="large"
                  onSearch={onSearch}
                />
              </Space>
            </Col>
            <Col span={24}>
              <Card>
              <Content className="flex flex-col flex-grow">
                <div className="h-[100%] mb-4 bg-gray-100 mr-2 ">
                  <Row gutter={[0, 0]} className="rowgap-vbox">
                    {products?.map((item, index: number) => (
                      <Col
                        key={index}
                        xs={24}
                        sm={24}
                        md={12}
                        lg={6}
                        xl={6}
                        className="mb-4 pl-9 pt-6"
                      >
                        <div>
                          <Card
                            bordered={false}
                            className="criclebox"
                            style={{ width: "200px",backgroundColor:"pink" }}
                            cover={<Image width={"100%"} src={item.hinhAnh} />}
                          >
                            <Meta
                              title={item.tensanPham}
                              className="pb-3 text-center"
                            />

                            <Button
                              type="primary"
                              className="mr-1 ml-2"
                              shape="round"
                              size="small"
                              onClick={() => {
                                setInvoice(true);
                                setShowTable(false);
                              }}
                            >
                              Select
                            </Button>
                            <Button
                              type="primary"
                              className="mr-1 mb-1"
                              shape="round"
                              size="small"
                              danger
                              onClick={() => handleDelete(item.tensanPham)}
                            >
                              Delete
                            </Button>
                          </Card>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              </Content>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* modal update */}
      
      <Modal
        title="Product"
        centered
        open={isInvoice}
        onOk={() => setInvoice(false)}
        onCancel={() => setInvoice(false)}
        width={1000}
      >
        <Row className="flex flex-col flex-grow ">
          <Row gutter={[0, 0]}>
            <Col span={12}>
              <Select
                defaultValue="Material"
                style={{ width: 120, marginRight: "10px" }}
                size="large"
                options={[
                  { value: "gold", label: "Gold" },
                  { value: "diamond", label: "Diamond" },
                ]}
                onChange={()=>setShowTable(false)}
              />
              <Select
                defaultValue="Gems"
                style={{ width: 120, marginRight: "10px" }}
                options={[
                  { value: "beryl", label: "Beryl" },
                  { value: "topaz", label: "Topaz" },
                  { value: "tektite", label: "Tektite" },
                ]}
                size="large"
                onChange={handleSelectChange}
              />
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
              />
            </Col>
          </Row>
          <div
            style={{ height: "500px", overflowY: "auto" }}
            className="h-[100%] container mb-4 mt-4 bg-gray-100 mr-2 "
          >
            <Row gutter={[0, 10]} className="rowgap-vbox">
              {showTable ? (
                <div
                  style={{ height: "500px", overflowY: "auto" }}
                  className="h-[100%] container mb-4 mt-4 bg-gray-100 mr-2 "
                >
                  <ModalGem/>
                </div>
              ) : (
                <Row gutter={[0, 10]} className="rowgap-vbox">
                  {data?.map((item: Jwellery, index: number) => (
                    <Col
                      key={index}
                      xs={24}
                      sm={24}
                      md={12}
                      lg={6}
                      xl={6}
                      className="mb-4 pl-5 pt-4"
                    >
                      <Card
                        bordered={false}
                        className="criclebox card"
                        style={{
                          width: "200px",
                          position: "relative",
                          cursor: "pointer",
                          backgroundColor:"pink"
                        }}
                        onClick={() => handleCardClick(item.id)}
                        cover={
                          <Image
                            width={"100%"}
                            src="https://trangsuc.doji.vn/Upload/product/nhan-cuoi/nhan-cuoi-0319195w1015va-0163.jpg"
                          />
                        }
                      >
                        <Meta
                          title={item.productName}
                          className="pb-3 text-center"
                        />
                        <Checkbox
                          checked={checkedItems[item.id] || false}
                          style={{
                            position: "absolute",
                            top: "1px",
                            right: "4px",
                            zIndex: 1,
                            transform: "scale(1.5)",
                          }}
                        />
                        <Button
                          type="primary"
                          className=" mb-1 ml-7"
                          shape="round"
                          size="large"
                          danger
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </Button>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </Row>
          </div>
        </Row>
      </Modal>
      {/* Invoice Modal        */}
    </div>
  );
}