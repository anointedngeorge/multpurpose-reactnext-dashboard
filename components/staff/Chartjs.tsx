"use client"
import React, { useRef, useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { useCustomSSR } from '@/app/custom_hooks';
import { externalurls } from '@/app/interface';

Chart.register(...registerables);

const Chartjs = ({width}:{width?:string}) => {
  const [monthList, setMonthList] = useState<any>([])
  const [amountList, setAmountList] = useState<any>([])
  const {
            ssrdata, 
            ssrerror,
            ssrstatus
        } 
            = useCustomSSR({url:`${externalurls.chartmonthlyall}`, headers:{}});
  // 
  const canvasRef = useRef<any>(null);
  const chartRef = useRef<any>(null);

  useEffect( () => {
    setMonthList(ssrdata?.month_list)
    setAmountList(ssrdata?.amount_list)
  }, [ssrdata] )

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');

      // Destroy any existing chart instance
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Create a new chart instance
      chartRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: monthList,
          datasets: [{
            label: "Sale's Summary",
            data: amountList,
            backgroundColor: 'rgba(223,57,47, 0.4)',
            borderColor: 'rgba(223,57,47, 0.4)',
            borderWidth: 10,
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
  }, [monthList, amountList]);

  return (
    <div className='w-full'>
      <canvas style={{width:`${width? width : '650px'}`}} ref={canvasRef} />
    </div>
  );
};

export default Chartjs;
