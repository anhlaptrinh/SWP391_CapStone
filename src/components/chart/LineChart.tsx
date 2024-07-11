import { Button, Typography, message as Message } from "antd";
import ReactApexChart from "react-apexcharts";

import lineChart from "./configs/lineChart";
import { useState } from "react";
import axios from "axios";

export type DashboardLineChartProps = {
  stationId: string;
};
export default function LineChart({ dataQuantityProductSaleInMonth }: any) {
  const { Title } = Typography;
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInvoiceReport = async () => {
    if (!month || !year) {
      Message.error("Please select both month and year");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://jewelrysalessystem.azurewebsites.net/api/invoices/report`,
        {
          params: { month, year },
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `InvoiceReport_${month}_${year}.xlsx`); // You can set the file name here
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error) {
      Message.error("Failed to fetch invoice report");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Linechart</Title>
        </div>
        <div className="linechart" >
          <div>
            <label>
              Month:
              <select
                style={{
                  border: " 1px solid #666",
                  padding: "4px",
                  margin: " 0 7px",
                  borderRadius: "8px",
                }}
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                <option value="">Select month</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label>
              Year:
              <select
                style={{
                  border: " 1px solid #666",
                  padding: "4px",
                  margin: " 0 7px",
                  borderRadius: "8px",
                }}
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="">Select year</option>
                {Array.from({ length: 25 }, (_, i) => (
                  <option key={2020 + i} value={2000 + i}>
                    {2000 + i}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <Button
            type="primary"
            onClick={fetchInvoiceReport}
            disabled={loading}
            className="mb-2"
          >
            Download Invoice Report
          </Button>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={[{ name: "Revenue", data: dataQuantityProductSaleInMonth }]}
        type="area"
        height={350}
        width="100%"
      />
    </>
  );
}
