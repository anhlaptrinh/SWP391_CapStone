import { Modal, Button, Table } from "antd";
import { useListGoldPrice } from "@/api/services/service";
import { numberWithCommas } from "@/utils/string";

export type GoldPriceProps = {
  onClose: () => void;
};
export function GoldPriceTable({ onClose }: GoldPriceProps) {
  const { data, isLoading } = useListGoldPrice();
  const columns = [
    // {
    //   title: "No",
    //   dataIndex: "@row",
    //   key: "@row",
    // },
    {
      title: "Name",
      render: (_: any, record: any) => (
        <div>{record[`@n_${record["@row"]}`]}</div>
      ),
    },
    // {
    //   title: "Kara",
    //   render: (_: any, record: any) => (
    //     <div>{record[`@k_${record["@row"]}`]}</div>
    //   ),
    // },
    {
      title: "Purchase",
      render: (_: any, record: any) => (
        <div>{numberWithCommas(record[`@pb_${record["@row"]}`])} VND</div>
      ),
    },
    {
      title: "Saleprice",
      render: (_: any, record: any) => (
        <div>{numberWithCommas(record[`@ps_${record["@row"]}`])} VND</div>
      ),
    },
  ];
  return (
    <Modal
      title={`Gold price updated at: ${data?.DataList?.Data[0]["@d_1"]}`}
      open
      onCancel={() => onClose()}
      width={1300}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
      ]}
    >
      <Table
        dataSource={data?.DataList?.Data}
        columns={columns}
        loading={isLoading}
        scroll={{ x: 700 }}
      />
    </Modal>
  );
}
