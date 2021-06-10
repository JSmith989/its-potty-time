import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { getBabyActivities } from '../helpers/data/activitydata';

export default function Stats(props) {
  const [activities, setActivities] = useState([]);
  const [data, setData] = useState({});
  const [vegetables, setVeggies] = useState({});
  const [fruits, setFruits] = useState({});
  const [meats, setMeats] = useState({});

  const getActivities = (babyId) => {
    getBabyActivities(babyId).then((response) => {
      setActivities(response);
    });
  };

  useEffect(() => {
    const babyId = props.match.params.id;
    if (babyId) {
      getActivities(babyId);
    }
  }, [activities]);

  const dataChart = () => {
    const meat = meats;
    const veg = vegetables;
    const fruit = fruits;
    console.log(meat.length);
    activities.forEach((activity) => {
      if (activity.mealType === 0) {
        setVeggies(activity);
      }
      if (activity.mealType === 1) {
        setFruits(activity);
      }
      if (activity.mealType === 3) {
        setMeats(activity);
      }
    });
    setData({
      labels: ['Meats', 'Vegetables', 'Fruits'],
      datasets: [
        {
          label: '# of food items',
          data: [meat.length, veg.length, fruit.length],
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
    });
  };

  useEffect(() => {
    dataChart();
  }, [data]);
  return (
  <>
    <div className='header'>
      <h1 className='title'>Balanced Diet</h1>
    </div>
    <Bar data={data} options={{
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    }} />
  </>
  );
}

Stats.propTypes = {
  user: PropTypes.any,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.any
    })
  }),
};
