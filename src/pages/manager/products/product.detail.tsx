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
    { title: "Carat Weight", dataIndex: "caratWeight" },
    { title: "Colour", dataIndex: "colour" },
    { title: "Clarity", dataIndex: "clarity" },
    { title: "Cut", dataIndex: "cut" },
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
            {data?.productName}
          </Descriptions.Item>
          <Descriptions.Item label="Category" span={2}>
            <Typography.Text strong>{data?.category}</Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item label="Production Cost" span={2}>
            {numberWithCommas(data.productionCost)} VND
          </Descriptions.Item>
          <Descriptions.Item label="Percent Price Rate" span={2}>
            <Typography.Text strong>{data?.percentPriceRate}</Typography.Text>
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
            <Tag color={data?.status ? "green" : "red"}>
              {data?.status ? "true" : "false"}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Gender" span={2}>
            <Typography.Text strong>{data?.gender}</Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item label="Colour" span={2}>
            <Typography.Text strong>{data?.colour}</Typography.Text>
          </Descriptions.Item>
        </Descriptions>
        <Descriptions title="Material Detail" bordered>
          {data?.materials &&
            data?.materials.map((material: any) => (
              <Descriptions.Item label="Material Name" span={3}>
                {material?.materialName}
              </Descriptions.Item>
            ))}
        </Descriptions>
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
