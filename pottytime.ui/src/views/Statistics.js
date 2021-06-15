import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Bar, Pie } from 'react-chartjs-2';
import { getBabyActivities } from '../helpers/data/activitydata';
import {
  veg, meat, fruit, fiveStar, fourStar, threeStar, twoStar, oneStar, noStar
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
      <div className="stats">
        <div className='header'>
          <h1 className='title cool-font'>Balanced Diet</h1>
        </div>
          <Bar data={{
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
    <Pie data={{
      labels: ['Five Stars', 'Four Stars', 'Three Stars', 'Two Stars', 'One Star', 'No Stars'],
      datasets: [
        {
          label: '# of ratings',
          data: [fiveStar(activities), fourStar(activities), threeStar(activities), twoStar(activities), oneStar(activities), noStar(activities)],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderWidth: 1,
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
