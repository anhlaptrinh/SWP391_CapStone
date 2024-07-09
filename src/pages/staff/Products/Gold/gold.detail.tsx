import { GoldProduct } from '#/jwelry'
import { numberWithCommas } from '@/utils/string'
import { Modal, Button, Descriptions, Typography, Tag, Table } from 'antd'


type GoldDetailProps={
    data: GoldProduct,
    onClose: ()=>void
}
export default function GoldDetail({data,onClose}:GoldDetailProps) {
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
              <Typography.Text strong>{data?.productName}</Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item label="Category" span={2}>
              <Typography.Text strong>{data?.productType}</Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item label="Sale Price" span={2}>
              <Typography.Text strong>
                {numberWithCommas(data.materialPrice?.sellPrice)} VND
              </Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item label="Purchase Price" span={2}>
              <Typography.Text strong>{data?.materialPrice?.buyPrice}</Typography.Text>

            </Descriptions.Item>
            {/* <Descriptions.Item label="Create at">
              {moment(data?.createdAt).format("DD/MM/YYYY HH:mm:ss")}
            </Descriptions.Item> */}
            <Descriptions.Item label="Product Type" span={2}>
              <Tag color={data?.productType ? "green" : "red"}>
                {data?.productType}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Quantity" span={2}>
              <Typography.Text strong>{data?.quantity}</Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item label="Status" span={2}>
              <Tag color={data?.isActive ? "green" : "red"}>
                {data?.isActive ? "true" : "false"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Counter" span={2}>
              <Typography.Text strong>{data?.counter}</Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item label="Unit" span={2}>
              <Typography.Text strong>{data?.unit?"Thread":"Gram"}</Typography.Text>

            </Descriptions.Item>
           
          </Descriptions>
          
        </div>
        
      </Modal>
  )
}
