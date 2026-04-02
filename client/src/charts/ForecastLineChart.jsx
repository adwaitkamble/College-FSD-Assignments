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
        labels: { color: '#cbd5e1', font: { size: 12 } },
      },
      title: {
        display: true,
        text: '5-Day Temperature Trend',
        color: '#f1f5f9',
        font: { size: 16, weight: 'bold' },
        padding: { bottom: 16 },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y}°C`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#94a3b8' },
        grid: { color: 'rgba(148,163,184,0.1)' },
      },
      y: {
        ticks: {
          color: '#94a3b8',
          callback: (v) => `${v}°C`,
        },
        grid: { color: 'rgba(148,163,184,0.1)' },
      },
    },
  };

  return (
    <div className="chart-card">
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default ForecastLineChart;
