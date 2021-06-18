import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { getBabyActivities } from '../helpers/data/activitydata';
import {
  veg, meat, fruit, fiveVeg, fourVeg, threeVeg, twoVeg, oneVeg,
  fiveFruit, fourFruit, threeFruit, twoFruit, oneFruit,
  fiveMeat, fourMeat, threeMeat, twoMeat, oneMeat,
} from '../helpers/chartHelpers';

export default class Stats extends Component {
  state = {
    activities: [],
  }

  componentDidMount() {
    const babyId = this.props.match.params.id;
    this.getActivities(babyId);
  }

   getActivities = (babyId) => {
     getBabyActivities(babyId).then((response) => {
       this.setState({ activities: response });
     });
   };

   render() {
     const {
       activities,
     } = this.state;

     return (
      <div className="stats" style={{
        backgroundColor: 'rgb(245, 252, 255)'
      }}>
        <div className='header'>
          <h1 className='title cool-font'>Balanced Diet</h1>
        </div>
          <Bar
          data={{
            labels: ['Meats', 'Vegetables', 'Fruits'],
            datasets: [
              {
                label: '# of food items',
                data: [meat(activities).length, veg(activities).length, fruit(activities).length],
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
          }} options={{
            scales: {
              yAxes: [
                {
                  ticks: { beginAtZero: true },
                },
              ],
            },
          }} />
          <div className='header'>
      <h1 className='title cool-font'>Food Review</h1>
    </div>
    <Bar
    data={{
      labels: ['Veggies', 'Fruit', 'Meat'],
      datasets: [
        {
          label: '5 stars',
          data: [fiveVeg(activities), fiveFruit(activities), fiveMeat(activities)],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
          ],
        },
        {
          label: '4 stars',
          data: [fourVeg(activities), fourFruit(activities), fourMeat(activities)],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
          ],
        },
        {
          label: '3 stars',
          data: [threeVeg(activities), threeFruit(activities), threeMeat(activities)],
          backgroundColor: [
            'rgba(255, 206, 86, 0.2)',
          ],
        },
        {
          label: '2 stars',
          data: [twoVeg(activities), twoFruit(activities), twoMeat(activities)],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
          ],
        },
        {
          label: '1 stars',
          data: [oneVeg(activities), oneFruit(activities), oneMeat(activities)],
          backgroundColor: [
            'rgba(153, 102, 255, 0.2)',
          ],
        },
      ],
    }} />
      </div>
     );
   }
}

Stats.propTypes = {
  user: PropTypes.any,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.any
    })
  }),
};
