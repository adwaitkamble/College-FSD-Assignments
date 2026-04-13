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
          label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y}%`,
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
        min: 0,
        max: 100,
        ticks: { color: '#908fa0', font: { size: 11, family: 'Inter' }, callback: (v) => `${v}%` },
        grid: { color: 'rgba(70,69,84,0.4)' },
        border: { display: false },
      },
    },
  };

  return (
    <div className="chart-card">
      <div className="chart-header">
        <span className="chart-icon">📊</span>
        <span className="chart-title">Forecast Metrics</span>
      </div>
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default MetricsBarChart;
