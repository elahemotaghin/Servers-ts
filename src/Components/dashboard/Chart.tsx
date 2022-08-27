import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  elements:{
    line:{
        tension: 0.5
    }
  },
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'نمودار استفاده از منابع',
      font: {
        family: "IRANYekan",
        size: 18
      }
    },
    legend: {
        display: true,
        labels: {
          color: "rgb(255, 99, 132)",
          font: {
            family: "IRANYekan"
          }
        },
        tooltip: {
          bodyFont: {
            family: "IRANYekan",
            size: 12
          }
        }
    },
    tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontFamily: "IRANYekan",
        bodyFontFamily: "IRANYekan",
        bodySpacing: 4,
        xPadding: 12,
      },
  },
  scales: {
    y: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
      grid: {
        display: false,
        zeroLineColor: "transparent"
      },
      ticks:{
        font: {
            family: "IRANYekan",
            size: 12
        },
        }
    },
    xAxes: {
        grid: {
          display: false,
          zeroLineColor: "transparent"
        },
        ticks: {
          font: {
            family: "IRANYekan",
            size: 12
          },
        }
      }
  }
};

const labels = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر'];

export const data = {
  labels,
  datasets: [
    {
      label: 'cpu',
      data: [20, 50, 10, 70, 55, 90, 15],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      yAxisID: 'y',
    },
    {
      label: 'Ram',
      data: [10, 15, 100, 23, 55, 70, 45],
      borderColor: '#2F6D80',
      backgroundColor: '#7eb3c3',
      yAxisID: 'y',
    },
    {
      label: 'دیسک',
      data: [40, 0, 18, 40, 25, 60, 35],
      borderColor: '#E98973',
      backgroundColor: '#F79489',
      yAxisID: 'y',
    },
  ],
};

export function Chart() {
  return <Line options={options} data={data}/>;
}