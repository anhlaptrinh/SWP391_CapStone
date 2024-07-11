import { Typography, Select, Row, Col } from 'antd';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

import eChart from './configs/eChart';
import axios from 'axios';

interface Item {
  Title: string;
  user: string;
}
export type DashboardEChartProps = {
  stationId: string;
};
export default function EChart({ dataMonthlyRevenueOfYear }: any) {
  const { Title, Paragraph } = Typography;
    const [month, setMonth] = useState<string>("");
    const [year, setYear] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

  return (
    <>
      <div className="linechart mb-6">
        <div>
          <Title level={5}>Echart</Title>
        </div>

      </div>

      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={eChart.options}
          series={[{ name: "chart", data: dataMonthlyRevenueOfYear }]}
          type="bar"
          height={350}
        />
      </div>
    </>
  );
}
