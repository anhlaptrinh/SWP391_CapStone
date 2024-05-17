import { Typography } from 'antd';
import ReactApexChart from 'react-apexcharts';

import lineChart from './configs/lineChart';

export type DashboardLineChartProps = {
  stationId: string;
};
export default function LineChart() {
  const { Title } = Typography;
  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Linechart</Title>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={[{ name: "Revenue", data: lineChart.series[0].data }]}
        type="area"
        height={350}
        width="100%"
      />
    </>
  );
}
