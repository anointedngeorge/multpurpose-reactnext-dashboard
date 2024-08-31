"use client"
import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const Chartjs = () => {
  const canvasRef = useRef<any>(null);
  const chartRef = useRef<any>(null);
  // const [chartstate, setChartState] = use


  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');

      // Destroy any existing chart instance
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Create a new chart instance
      chartRef.current = new Chart(ctx, {
        type: 'bar', // Example chart type
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
            label: 'Monthly Sales',
            data: [12, 19, 3, 5, 2, 3, 7],
            backgroundColor: 'rgba(245, 172, 98, 0.4)',
            borderColor: 'rgba(245, 172, 98, 0.4)',
            borderWidth: 1,
          }],
        },
        options: {
          
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    // Cleanup function to destroy the chart instance on component unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className='w-full'>
      <canvas style={{width:'650px'}} ref={canvasRef} />
    </div>
  );
};

export default Chartjs;
