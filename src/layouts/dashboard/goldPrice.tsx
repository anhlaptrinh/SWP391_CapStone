import { Modal, Button } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

interface GoldPrice {
  time: string;
  price: number;
}
export type GoldPriceProps = {
  onClose: () => void;
};
export function GoldPriceTable({ onClose }: GoldPriceProps) {
  const [prices, setPrices] = useState<GoldPrice[]>([]);

  //   useEffect(() => {
  //     const fetchPrices = async () => {
  //       try {
  //         const response = await axios.get(
  //           "https://ty-gia-gia-vang.p.rapidapi.com/gold-prices/pnj"
  //         );
  //         console.log("🚀 ~ fetchPrices ~ response:", response);
  //         const data = response.data;
  //         const price = {
  //           time: new Date().toLocaleTimeString(),
  //           price: data.rates.XAU,
  //         };
  //         setPrices((prevPrices) => [...prevPrices, price]);
  //       } catch (error) {
  //         console.error("Error fetching gold prices:", error);
  //       }
  //     };

  //     fetchPrices();

  //     const interval = setInterval(fetchPrices, 60000);
  //     return () => clearInterval(interval);
  //   }, []);

  return (
    <Modal
      open
      onCancel={() => onClose()}
      width={700}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
      ]}
    >
      <iframe
        src="https://www.tradingview-widget.com/embed-widget/single-quote/?locale=en#%7B%22symbol%22%3A%22FOREXCOM%3AXAUUSD%22%2C%22colorTheme%22%3A%22light%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A126%2C%22isTransparent%22%3Afalse%2C%22utm_source%22%3A%22www.goldapi.io%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22single-quote%22%2C%22page-uri%22%3A%22www.goldapi.io%2Fdashboard%22%7D"
        title="single quote TradingView widget"
        lang="en"
        style={{
          userSelect: "none",
          boxSizing: "border-box",
          display: "block",
          height: "100%",
          width: "100%",
        }}
      />
      <iframe
        style={{ width: "100%", height: 400 }}
        src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_8a92b&symbol=OANDA%3AXAUUSD&interval=3&symboledit=1&saveimage=1&toolbarbg=f1f3f6&details=1&hotlist=1&studies=%5B%5D&theme=light&style=1&timezone=Asia%2FHo_Chi_Minh&withdateranges=1&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=vi_VN&referral_id=1713&utm_source=giavang.org&utm_medium=widget&utm_campaign=chart&utm_term=OANDA%3AXAUUSD#%7B%22page-uri%22%3A%22giavang.org%2Fthe-gioi%2F%22%7D"
      />

      {/* <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((price, index) => (
            <tr key={index}>
              <td>{price.time}</td>
              <td>{price.price}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </Modal>
  );
}
