import React from 'react';
import { Bar } from 'react-chartjs-2';

const Statisctics = () => {
  const data = {
    labels: ['Meats', 'Vegetables', 'Fruits'],
    datasets: [
      {
        label: '# of food items',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
  <>
    <div className='header'>
      <h1 className='title'>Balanced Diet</h1>
    </div>
    <Bar data={data} options={options} />
  </>
  );
};

export default Statisctics;
