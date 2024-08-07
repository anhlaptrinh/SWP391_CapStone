import { Modal, Button, Descriptions, Tag, Typography, Table } from "antd";
import { numberWithCommas } from "@/utils/string";
import { ColumnsType } from "antd/es/table";
export type ProductDetailProps = {
  data?: any;
  onClose: () => void;
};
export function ProductDetail({ data, onClose }: ProductDetailProps) {
  const { Title } = Typography;
  const columns: ColumnsType<any> = [
    {
      title: "Gem Name",
      dataIndex: "gemName",
    },
    {
      title: "Origin",
      dataIndex: "origin",
    },
    { title: "Carat", dataIndex: "carat" },
    { title: "Color", dataIndex: "color" },
    { title: "Clarity", dataIndex: "clarity" },
    { title: "Cut", dataIndex: "cut" },
    { title: "Shape", dataIndex: "shape" },
    {
      title: "Price",
      dataIndex: "price",
      render: (text) => <div>{numberWithCommas(text || 0)} VND</div>,
    },
    // {
    //   title: "Production Cost",
    //   dataIndex: "productionCost",
    //   render: (text) => <div>{numberWithCommas(text || 0)} VND</div>,
    // },
  ];
  return (
    <Modal
      open
      onCancel={() => onClose()}
      width={800}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
      ]}
    >
      <div>
        <Descriptions
          title="Product Detail"
          bordered
          style={{ marginBottom: "2rem" }}
        >
          {/* <Descriptions.Item label="Id" span={3}>
            {data?.id}
          </Descriptions.Item> */}
          <Descriptions.Item label="Product Name" span={2}>
            <Typography.Text>{data?.productName}</Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item label="Category" span={2}>
            <Typography.Text>{data?.category}</Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item label="Production Cost" span={2}>
            <Typography.Text>
              {numberWithCommas(data.productionCost)} VND
            </Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item label="Percent Price Rate" span={2}>
            <Typography.Text>{data?.percentPriceRate}</Typography.Text>
          </Descriptions.Item>
          {/* <Descriptions.Item label="Create at">
            {moment(data?.createdAt).format("DD/MM/YYYY HH:mm:ss")}
          </Descriptions.Item> */}
          <Descriptions.Item label="Product Type" span={2}>
            <Tag color={data?.productType ? "green" : "red"}>
              {data?.productType}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Status" span={2}>
            <Tag color={data?.isActive ? "green" : "red"}>
              {data?.isActive ? "Active" : "InActive "}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Gender" span={2}>
            <Typography.Text>{data?.gender}</Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item label="Counter" span={2}>
            <Typography.Text>{data?.counter}</Typography.Text>
          </Descriptions.Item>
        </Descriptions>
        {data?.materials.length > 0 && (
          <Descriptions title="Material Detail" bordered>
            <Descriptions.Item label="Material Name" span={3}>
              {data?.materials[0]?.materialName}
            </Descriptions.Item>
            <Descriptions.Item label="Weight" span={3}>
              {data?.materials[0]?.weight}
            </Descriptions.Item>
            <Descriptions.Item label="Buy Price" span={3}>
              {/* {data?.materials[0]?.materialPrice.buyPrice} */}
              <Typography.Text>
                {numberWithCommas(data?.materials[0]?.materialPrice.buyPrice)}{" "}
                VND
              </Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item label="Sell Price" span={3}>
              <Typography.Text>
                {numberWithCommas(data?.materials[0]?.materialPrice.sellPrice)}{" "}
                VND
              </Typography.Text>
            </Descriptions.Item>
            {/* {data?.materials &&
              data?.materials.map((material: any) => (
                <Descriptions.Item label="Material Name" span={3}>
                  {material?.materialName}
                </Descriptions.Item>
              ))} */}
            {/* {data?.materials &&
              data?.materials.map((material: any) => (
                <Descriptions.Item label="Weight" span={3}>
                  {material?.weight}
                </Descriptions.Item>
              ))} */}
            {/* {data?.materials &&
              data?.materials.map((material: any) => (
                <Descriptions.Item label="Buy Price" span={3}>
                  {material?.materialPrice.buyPrice}
                  <Typography.Text>
                    {numberWithCommas(material?.materialPrice.buyPrice)} VND
                  </Typography.Text>
                </Descriptions.Item>
              ))} */}
            {/* {data?.materials &&
              data?.materials.map((material: any) => (
                <Descriptions.Item label="Sell Price" span={3}>
                  <Typography.Text>
                    {numberWithCommas(material?.materialPrice.sellPrice)} VND
                  </Typography.Text>
                </Descriptions.Item>
              ))} */}
          </Descriptions>
        )}
      </div>
      <Title level={5} className="my-5">
        Gem Detail
      </Title>
      <Table
        rowKey="id"
        size="small"
        scroll={{ x: "max-content" }}
        columns={columns}
        dataSource={data?.gems}
      />
    </Modal>
  );
}
