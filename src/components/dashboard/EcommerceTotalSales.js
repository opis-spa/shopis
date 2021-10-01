import React from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme } from '@mui/material/styles';
import { Box, Card, Typography } from '@mui/material';
// redux
import { useSelector } from '../../redux/store';
// utils
import { fNumber } from '../../utils/formatNumber';
//
import { BaseOptionChart } from '../charts';

// ----------------------------------------------------------------------

export default function EcommerceTotalSales() {
  const theme = useTheme();
  const { totalSales } = useSelector((state) => state.dashboard.analytics);
  const { data, amount } = totalSales;
  const chartOptions = merge(BaseOptionChart(), {
    colors: [theme.palette.chart.green[0]],
    chart: { animations: { enabled: true }, sparkline: { enabled: true } },
    stroke: { width: 2 },
    tooltip: {
      x: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: () => ''
        }
      },
      marker: { show: false }
    }
  });

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2" paragraph>
          Total vendidos
        </Typography>
        <Typography variant="h3" gutterBottom>
          {fNumber(amount)}
        </Typography>
      </Box>

      <ReactApexChart type="line" series={[{ data }]} options={chartOptions} width={120} height={80} />
    </Card>
  );
}
