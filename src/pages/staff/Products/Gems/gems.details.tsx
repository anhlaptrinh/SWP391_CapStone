import { numberWithCommas } from '@/utils/string';
import { Modal, Button, Table, Typography, Tag, Descriptions } from 'antd'
import { ColumnsType } from 'antd/es/table';


type formGemDetails={
    data:any,
    onClose:()=>void
}
export default function Gemsdetails({data,onClose}:formGemDetails) {
    
    
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
          <Descriptions.Item label="Product Price" span={2}>
            <Typography.Text strong>
              {numberWithCommas(data.productPrice)} VND
            </Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item label="Origin" span={2}>
            <Typography.Text strong>{data?.origin}</Typography.Text>
          </Descriptions.Item>
          
          <Descriptions.Item label="Status" span={2}>
            <Tag color={data?.isActive ? "green" : "red"}>
              {data?.isActive? "active" : "inactive"}

            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Quantity" span={2}>
            <Tag color={data?.quantity<=3 ? "red" : "green"}>
              {data?.quantity }
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Product Type" span={2}>
            <Typography.Text strong>{data?.productType}</Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item label="Image" span={2}>
          <img src={data?.featuredImage} alt="Product Image" style={{ maxWidth: '60px' }} />
          </Descriptions.Item>
          
        </Descriptions>
        
        
      </div>
      <Descriptions
        title="Product Specifications"
        bordered
        style={{ marginBottom: "2rem" }}
      >
      <Descriptions.Item label="Shape" span={2}>
            <Typography.Text strong>{data?.shape}</Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item label="Carat Weight" span={2}>
            <Typography.Text strong>{data?.carat}g</Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item label="Clarity" span={1}>
            <Typography.Text strong>
              {numberWithCommas(data.clarity)} 
            </Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item label="Cut" span={1}>
            <Typography.Text strong>{data?.cut}</Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item label="Color" span={1}>
            <Typography.Text strong>{data?.color}</Typography.Text>
          </Descriptions.Item>
      </Descriptions>
      
    </Modal>
  )
}
