import React, { useMemo } from 'react';
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Parse 3-hour forecast into daily humidity averages
const parseDailyHumidity = (forecastList) => {
  const dailyMap = {};

  forecastList.forEach((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    if (!dailyMap[date]) {
      dailyMap[date] = { humidities: [], popValues: [], date };
    }
    dailyMap[date].humidities.push(item.main.humidity);
    dailyMap[date].popValues.push((item.pop || 0) * 100);
  });

  return Object.values(dailyMap).slice(0, 5).map((d) => ({
    label: d.date,
    avgHumidity: Math.round(
      d.humidities.reduce((a, b) => a + b, 0) / d.humidities.length
    ),
    avgPop: Math.round(
      d.popValues.reduce((a, b) => a + b, 0) / d.popValues.length
    ),
  }));
};

const MetricsBarChart = ({ forecastData }) => {
  const daily = useMemo(() => parseDailyHumidity(forecastData.list), [forecastData]);

  const data = {
    labels: daily.map((d) => d.label),
    datasets: [
      {
        label: 'Avg Humidity (%)',
        data: daily.map((d) => d.avgHumidity),
        backgroundColor: 'rgba(99,102,241,0.75)',
        borderColor: '#6366f1',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
      {
        label: 'Precip. Probability (%)',
        data: daily.map((d) => d.avgPop),
        backgroundColor: 'rgba(34,211,238,0.65)',
        borderColor: '#22d3ee',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
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
        text: '5-Day Humidity & Precipitation Levels',
        color: '#f1f5f9',
        font: { size: 16, weight: 'bold' },
        padding: { bottom: 16 },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y}%`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#94a3b8' },
        grid: { color: 'rgba(148,163,184,0.1)' },
      },
      y: {
        min: 0,
        max: 100,
        ticks: { color: '#94a3b8', callback: (v) => `${v}%` },
        grid: { color: 'rgba(148,163,184,0.1)' },
      },
    },
  };

  return (
    <div className="chart-card">
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default MetricsBarChart;
