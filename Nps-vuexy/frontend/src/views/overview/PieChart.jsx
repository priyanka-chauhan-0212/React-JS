import React from 'react';
import { Pie } from 'react-chartjs-2';

export const PieChart = ({ data }) => {


  const dataPie = {
    datasets: [
      {
        label: '# of Votes',
        data: [data && data.promoters, data && data.passive, data && data.detractors],
        backgroundColor: ['#bce897', '#faca00', '#e95432'],
        borderColor: ['#bce897', '#faca00', '#e95432'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (data) {
            return data.raw + '%';
          },
        },
      },
    },
  };

  return <Pie data={dataPie} options={options} />;
};

export default PieChart;
