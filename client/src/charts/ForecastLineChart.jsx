import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Parse 3-hour forecast into daily summaries for the line chart
const parseDailyTemps = (forecastList) => {
  const dailyMap = {};

  forecastList.forEach((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    if (!dailyMap[date]) {
      dailyMap[date] = { temps: [], date };
    }
    dailyMap[date].temps.push(item.main.temp);
  });

  return Object.values(dailyMap).slice(0, 5).map((d) => ({
    label: d.date,
    avgTemp: parseFloat(
      (d.temps.reduce((a, b) => a + b, 0) / d.temps.length).toFixed(1)
    ),
    maxTemp: parseFloat(Math.max(...d.temps).toFixed(1)),
    minTemp: parseFloat(Math.min(...d.temps).toFixed(1)),
  }));
};

const ForecastLineChart = ({ forecastData }) => {
  const daily = useMemo(() => parseDailyTemps(forecastData.list), [forecastData]);

  const data = {
    labels: daily.map((d) => d.label),
    datasets: [
      {
        label: 'Max Temp (°C)',
        data: daily.map((d) => d.maxTemp),
        borderColor: '#f97316',
        backgroundColor: 'rgba(249,115,22,0.15)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#f97316',
        pointRadius: 5,
        pointHoverRadius: 8,
      },
      {
        label: 'Avg Temp (°C)',
        data: daily.map((d) => d.avgTemp),
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99,102,241,0.1)',
        fill: false,
        tension: 0.4,
        pointBackgroundColor: '#6366f1',
        pointRadius: 5,
        pointHoverRadius: 8,
        borderDash: [5, 3],
      },
      {
        label: 'Min Temp (°C)',
        data: daily.map((d) => d.minTemp),
        borderColor: '#22d3ee',
        backgroundColor: 'rgba(34,211,238,0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#22d3ee',
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#c7c4d7', font: { size: 11, family: 'Inter' }, boxWidth: 12, padding: 16 },
      },
      title: { display: false },
      tooltip: {
        backgroundColor: '#25293a',
        borderColor: '#464554',
        borderWidth: 1,
        titleColor: '#dee1f7',
        bodyColor: '#c7c4d7',
        callbacks: {
          label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y}°C`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#908fa0', font: { size: 11, family: 'Inter' } },
        grid: { color: 'rgba(70,69,84,0.4)' },
        border: { display: false },
      },
      y: {
        ticks: {
          color: '#908fa0',
          font: { size: 11, family: 'Inter' },
          callback: (v) => `${v}°C`,
        },
        grid: { color: 'rgba(70,69,84,0.4)' },
        border: { display: false },
      },
    },
  };

  return (
    <div className="chart-card">
      <div className="chart-header">
        <span className="chart-icon">📈</span>
        <span className="chart-title">5-Day Temperature Forecast</span>
      </div>
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default ForecastLineChart;
