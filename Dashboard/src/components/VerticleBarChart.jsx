import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register chart components once
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Chart configuration
const baseOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Holdings',
    },
  },
};

// Reusable vertical bar chart component
export function VerticalBarChart({ data, compact }) {
  const options = {
    ...baseOptions,
    scales: compact
      ? {
          x: { ticks: { maxTicksLimit: 4, font: { size: 10 } } },
          y: { ticks: { maxTicksLimit: 4, font: { size: 10 } } },
        }
      : undefined,
    plugins: {
      ...baseOptions.plugins,
      legend: { ...baseOptions.plugins.legend, labels: { boxWidth: compact ? 10 : 12 } },
      title: { ...baseOptions.plugins.title },
    },
  };
  return <Bar options={options} data={data} />;
}

export default VerticalBarChart;
