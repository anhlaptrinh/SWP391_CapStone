import { Gem } from "#/jwelry";
import { useListGemProduct } from "@/api/staff/listProduct";
import { PAGE_SIZE } from "@/constants/page";
import { Tooltip, Tag, Popover, Button, Pagination } from "antd";
import Table, { ColumnsType, TableProps } from "antd/es/table";
import { useState } from "react";

export default function Gems() {
  const [currentPage, setCurrentPage] = useState(1);
  const {data,isLoading}=useListGemProduct(currentPage);
  const totalCount=data?.totalPages ||0;
  const columns: TableProps<Gem>['columns'] = [
    {
      title: "ID",
      dataIndex: "gemId",
      key: "gemId",
    },
    {
      title: "Image",
      dataIndex: "featuredImage",
      key: "featuredImage",
      render: (_text:any,{featuredImage})=>{
        return <img src={featuredImage} width={50} height={50} />
      }
    },

    {
      title: "Name",
      dataIndex: "gemName",
      key: "gemName",
    },
    {
      title: "Origin",
      dataIndex: "origin",
      key: "origin",
    },
    { title: "Cara weight", align: 'center', key: "caratWeight", dataIndex: "caratWeight" },
    { title: "Color", key: "colour", dataIndex: "colour" },
    { title: "Clarity", key: "clarity", dataIndex: "clarity" },
    { title: "Cut", key: "cut", dataIndex: "cut" },
    {
      title: "Gem Price",
      dataIndex: "gemPrice",
      key: "gems",
      render: (_text: any, { gemPrice }) => {
        const { caratWeightPrice, colourPrice, clarityPrice, cutPrice, total } =
          gemPrice;
        const content = (
          <div>
            <Tooltip title="Carat Weight Price">
              <Tag color="pink">Carat Weight Price: {caratWeightPrice}</Tag>
            </Tooltip>
            <Tooltip title="Colour Price">
              <Tag color="pink">Colour Price: {colourPrice}</Tag>
            </Tooltip>
            <Tooltip title="Clarity Price">
              <Tag color="pink">Clarity Price: {clarityPrice}</Tag>
            </Tooltip>
            <Tooltip title="Cut Price">
              <Tag color="pink">Cut Price: {cutPrice}</Tag>
            </Tooltip>
          </div>
        );

        return (
          <Popover mouseEnterDelay={0.5} content={content} title="Gem Price">
            <Button type="link">{gemPrice.total}$</Button>
          </Popover>
        );
      },
    },
    { title: "Action", key: "action", dataIndex: "action",
      render: (_text: any, {gemId}) => (
        <Button type="primary" onClick={() => handlegemSelect(gemId)}>
          Select
        </Button>
      ),
     },
  ];
  return (
    <div>
      <Table
        rowKey="invoiceId"
        className="mt-3"
        columns={columns}
        loading={isLoading}
        pagination={false}
        scroll={{ x: "max-content" }}
        dataSource={data?.items}
        bordered
      />
      <Pagination
        defaultCurrent={currentPage}
        total={totalCount}
        pageSize={PAGE_SIZE}
        onChange={(page) => {
          setCurrentPage(page);
        }}
      />
    </div>
  );
}
function handlegemSelect(invoiceId: any): void {
  throw new Error("Function not implemented.");
}

