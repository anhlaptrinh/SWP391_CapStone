import { Modal, Button, Table, Typography, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table';


type formGemDetails={
    data:any,
    onClose:()=>void
}
export default function Gemsdetails({data,onClose}:formGemDetails) {
    const { Title,Text } = Typography;
    const GemDetail:any=[data]
    const columns: ColumnsType<any> = [
        {
          title: "Gem Name",
          dataIndex: "gemName",
        },
        {
            title: "Image",
            dataIndex: "featuredImage",
            key: "featuredImage",
            render: (_text: any, { featuredImage }) => {
              return <img alt={data.gemName} src={featuredImage} width={50} height={50} />;
            },
          },
          {
            title: "Shape",
            dataIndex: "shape",
          },
        {
          title: "Origin",
          dataIndex: "origin",
        },
        { title: "Weight", dataIndex: "carat" },
        { title: "Colour", dataIndex: "color" },
        { title: "Clarity", dataIndex: "clarity" },
        { title: "Cut", dataIndex: "cut" },
        { title: "Price", dataIndex: "price", align:'center',
            render: (text)=><Text strong style={{fontSize: '14px', color: 'green', whiteSpace: 'nowrap' }}>
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(text)}
          </Text>
        },
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
    <Title level={5} className="my-5">
        Gem Detail
      </Title>
      <Table
        rowKey="id"
        size="large"
        pagination={false}
        
        columns={columns}
        dataSource={GemDetail}
      />
    
  </Modal>
  )
}
