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
        <Button
          type="primary"
          onClick={() =>
            window.open("http://localhost:5173/#/goldPrice", "_blank")
          }
        >
          Show Gold price
        </Button>,
      ]}
    >
      <div className="flex gap-3">
        <Table
          dataSource={data?.DataList?.Data}
          columns={columns}
          loading={isLoading}
          scroll={{ x: 700 }}
        />
        <div className="w-full">
          <iframe
            className="w-full"
            src="https://www.tradingview-widget.com/embed-widget/single-quote/?locale=en#%7B%22symbol%22%3A%22FOREXCOM%3AXAUUSD%22%2C%22colorTheme%22%3A%22light%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A126%2C%22isTransparent%22%3Afalse%2C%22utm_source%22%3A%22www.goldapi.io%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22single-quote%22%2C%22page-uri%22%3A%22www.goldapi.io%2Fdashboard%22%7D"
          />
          <iframe
            className="w-full h-[500px]"
            src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_8a92b&symbol=OANDA%3AXAUUSD&interval=3&symboledit=1&saveimage=1&toolbarbg=f1f3f6&details=1&hotlist=1&studies=%5B%5D&theme=light&style=1&timezone=Asia%2FHo_Chi_Minh&withdateranges=1&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=vi_VN&referral_id=1713&utm_source=giavang.org&utm_medium=widget&utm_campaign=chart&utm_term=OANDA%3AXAUUSD#%7B%22page-uri%22%3A%22giavang.org%2Fthe-gioi%2F%22%7D"
          />
        </div>
      </div>
    </Modal>
  );
}