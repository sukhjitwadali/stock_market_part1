import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js/auto';

function StockChart({ data, prediction }) {
  const chartRef = useRef();
  const chartInstance = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;
    const ctx = chartRef.current.getContext('2d');
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const labels = data.map(d => d.date).concat(prediction ? ['Predicted'] : []);
    const prices = data.map(d => d.price).concat(prediction ? [prediction] : []);
    const backgroundColors = [
      ...Array(data.length).fill('rgba(54, 162, 235, 0.5)'),
      ...(prediction ? ['rgba(255, 99, 132, 0.7)'] : [])
    ];
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Stock Price',
            data: prices,
            fill: false,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: backgroundColors,
            tension: 0.1,
            pointBackgroundColor: backgroundColors,
            pointRadius: labels.map((l, i) => i === labels.length - 1 && prediction ? 7 : 4),
            pointStyle: labels.map((l, i) => i === labels.length - 1 && prediction ? 'rectRot' : 'circle'),
          },
        ],
      },
      options: {
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: { title: { display: true, text: 'Date' } },
          y: { title: { display: true, text: 'Price' } },
        },
      },
    });
    // Cleanup
    return () => chartInstance.current && chartInstance.current.destroy();
  }, [data, prediction]);

  return (
    <div className="mb-3">
      <canvas ref={chartRef} height={80}></canvas>
      <div className="text-muted small">Blue: Historical, Red: Predicted</div>
    </div>
  );
}

StockChart.propTypes = {
  data: PropTypes.array.isRequired,
  prediction: PropTypes.number,
};

export default StockChart; 